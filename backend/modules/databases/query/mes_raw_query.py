def __get_pinhole_data__query(branch, date, hour):
    raw_query = f"""
                -- color code: NG = 2 ; PASS & value = 0 -> 11 ; PASS & value > 0 -> 12 ; Mismatch WO -> 0
                                
                DECLARE 
                    @plant     varchar(10) = '{branch}',
                    @date      date        = '{date}',
                    @hour      varchar(10) = '{hour}';
                                                            
                                                                            
                DECLARE @hour_int int = TRY_CONVERT(int, @hour);
                DECLARE @hour_idx int = CASE 
                    WHEN @hour_int BETWEEN 6 AND 23 THEN @hour_int - 5 
                    WHEN @hour_int BETWEEN 0 AND 5  THEN @hour_int + 19
                    ELSE 24
                END;
                                                
                DECLARE @wo_check_enabled bit = CASE WHEN @hour_int BETWEEN 0 AND 23 THEN 1 ELSE 0 END;
                                                
                ;WITH machines AS (
                    SELECT DISTINCT 
                        MES_MACHINE AS MachineName,
                        Line,
                        '#' + RIGHT(MES_MACHINE, 2) + Line AS Code
                    FROM [PMG_DEVICE].[dbo].[COUNTING_DATA_MACHINE]
                    WHERE MES_MACHINE LIKE CASE 
                        WHEN @plant = 'PVC'  THEN '%PVC%'
                        WHEN @plant = 'PVC1' THEN '%PVC1%'
                        WHEN @plant = 'PVC2' THEN '%PVC2%'
                        WHEN @plant = 'NBR'  THEN '%NBR%'
                        WHEN @plant = 'NBR1' THEN '%NBR1%'
                        WHEN @plant = 'NBR2' THEN '%NBR2%'
                        WHEN @plant = 'NBR3' THEN '%NBR3%'
                        ELSE '%'
                    END
                ),
                runcards AS (
                    SELECT
                        rc.Id             AS RunCardId,
                        rc.MachineName,
                        rc.LineName,
                        rc.WorkOrderId,
                        CAST(rc.Period AS INT) AS Period,
                        rc.InspectionDate
                    FROM [PMGMES].[dbo].[PMG_MES_RunCard] rc
                    JOIN [PMGMES].[dbo].[PMG_MES_WorkOrder] wo
                        ON wo.Id = rc.WorkOrderId
                    WHERE wo.StartDate IS NOT NULL
                        AND (
                            (rc.InspectionDate = @date AND CAST(rc.Period AS INT) BETWEEN 6 AND 23)
                            OR (rc.InspectionDate = DATEADD(DAY, 1, @date) AND CAST(rc.Period AS INT) BETWEEN 0 AND 5)
                        )
                ),
                ipqc_latest AS (
                    SELECT 
                        r.RunCardId,
                        i.OptionName,
                                                
                        NULLIF(JSON_VALUE(i.JsonData, '$.PinholeGloveQty'), '')                                AS PinholeQtyRaw,
                                                
                        TRY_CONVERT(decimal(18,6), NULLIF(JSON_VALUE(i.JsonData, '$.PinholeGloveQty'), ''))    AS PinholeQtyNum,
                        TRY_CONVERT(int, TRY_CONVERT(decimal(18,6), NULLIF(JSON_VALUE(i.JsonData, '$.PinholeGloveQty'), ''))) AS PinholeQtyInt,
                                                
                        TRY_CONVERT(decimal(18,6), NULLIF(CAST(i.Lower_InspectionValue AS nvarchar(50)), ''))        AS AQLVal,
                        pl.PlaceList,                        
                        i.InspectionStatus,
                        ROW_NUMBER() OVER (
                            PARTITION BY r.RunCardId, i.OptionName 
                            ORDER BY i.CreationTime DESC, i.Id DESC
                        ) AS rn
                    FROM runcards r
                    LEFT JOIN [PMGMES].[dbo].[PMG_MES_IPQCInspectingRecord] i
                        ON r.RunCardId = i.RunCardId
                        AND i.OptionName = 'Pinhole'
                    OUTER APPLY (
                        SELECT 
                            STRING_AGG(CAST(s.cnt AS varchar(10)) + 'x' + s.place, ',') 
                                WITHIN GROUP (ORDER BY s.place) AS PlaceList
                        FROM (
                            SELECT 
                                LTRIM(RTRIM(p.value)) AS place,
                                COUNT(*) AS cnt
                            FROM OPENJSON(i.JsonData, '$.Detail') AS d
                            CROSS APPLY OPENJSON(d.value, '$.PinholePlace') AS p
                            GROUP BY LTRIM(RTRIM(p.value))
                        ) AS s
                    ) AS pl
                ),
                data_agg AS (
                    SELECT
                        r.MachineName,
                        r.LineName,
                        r.Period,
                                
                        MAX(CASE WHEN il.PinholeQtyRaw IS NOT NULL THEN il.PinholeQtyRaw END) AS ValText,
                        MAX(CASE WHEN il.PinholeQtyRaw IS NOT NULL THEN 1 ELSE 0 END)         AS HasRaw,
                        MAX(COALESCE(il.PinholeQtyNum, 0)) AS ValNum,
                        MAX(COALESCE(il.PinholeQtyInt, 0)) AS ValInt,
                        MAX(
                            CASE 
                                WHEN il.PinholeQtyNum IS NOT NULL 
                                    THEN CONVERT(nvarchar(32), TRY_CONVERT(int, il.PinholeQtyNum))
                                WHEN il.PinholeQtyRaw IS NOT NULL 
                                    THEN il.PinholeQtyRaw
                                ELSE NULL
                            END
                        ) AS ValPretty,
                        MAX(il.PlaceList) AS PlaceList,
                
                        MAX(COALESCE(il.AQLVal, 0)) AS AQL, 
                        MAX(r.WorkOrderId)          AS WO,
                        MAX(TRY_CAST(wo2.AQL AS decimal(18,6))) AS WO_AQL, 
                                
                        MAX(CASE WHEN il.InspectionStatus = 'NG'   THEN 1 ELSE 0 END) AS HasNG,
                        MAX(CASE WHEN il.InspectionStatus = 'PASS' THEN 1 ELSE 0 END) AS HasPASS
                    FROM runcards r
                    LEFT JOIN ipqc_latest il
                        ON il.RunCardId = r.RunCardId
                        AND il.rn = 1
                    LEFT JOIN [PMGMES].[dbo].[PMG_MES_WorkOrder] wo2 
                        ON wo2.Id = r.WorkOrderId
                    GROUP BY r.MachineName, r.LineName, r.Period
                ),
                ref_wo AS (
                    SELECT 
                        MachineName,
                        LineName,
                        MAX(WorkOrderId) AS RefWO
                    FROM runcards
                    WHERE Period = @hour_int
                    GROUP BY MachineName, LineName
                )
                SELECT 
                    m.MachineName,
                    m.Line,
                    m.Code,
                                                
                    CASE WHEN  1 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  6 THEN a.ValPretty END), N'x') ELSE N' ' END AS [06],
                    CASE WHEN  2 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  7 THEN a.ValPretty END), N'x') ELSE N' ' END AS [07],
                    CASE WHEN  3 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  8 THEN a.ValPretty END), N'x') ELSE N' ' END AS [08],
                    CASE WHEN  4 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  9 THEN a.ValPretty END), N'x') ELSE N' ' END AS [09],
                    CASE WHEN  5 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 10 THEN a.ValPretty END), N'x') ELSE N' ' END AS [10],
                    CASE WHEN  6 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 11 THEN a.ValPretty END), N'x') ELSE N' ' END AS [11],
                    CASE WHEN  7 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 12 THEN a.ValPretty END), N'x') ELSE N' ' END AS [12],
                    CASE WHEN  8 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 13 THEN a.ValPretty END), N'x') ELSE N' ' END AS [13],
                    CASE WHEN  9 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 14 THEN a.ValPretty END), N'x') ELSE N' ' END AS [14],
                    CASE WHEN 10 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 15 THEN a.ValPretty END), N'x') ELSE N' ' END AS [15],
                    CASE WHEN 11 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 16 THEN a.ValPretty END), N'x') ELSE N' ' END AS [16],
                    CASE WHEN 12 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 17 THEN a.ValPretty END), N'x') ELSE N' ' END AS [17],
                    CASE WHEN 13 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 18 THEN a.ValPretty END), N'x') ELSE N' ' END AS [18],
                    CASE WHEN 14 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 19 THEN a.ValPretty END), N'x') ELSE N' ' END AS [19],
                    CASE WHEN 15 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 20 THEN a.ValPretty END), N'x') ELSE N' ' END AS [20],
                    CASE WHEN 16 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 21 THEN a.ValPretty END), N'x') ELSE N' ' END AS [21],
                    CASE WHEN 17 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 22 THEN a.ValPretty END), N'x') ELSE N' ' END AS [22],
                    CASE WHEN 18 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period = 23 THEN a.ValPretty END), N'x') ELSE N' ' END AS [23],
                    CASE WHEN 19 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  0 THEN a.ValPretty END), N'x') ELSE N' ' END AS [00],
                    CASE WHEN 20 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  1 THEN a.ValPretty END), N'x') ELSE N' ' END AS [01],
                    CASE WHEN 21 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  2 THEN a.ValPretty END), N'x') ELSE N' ' END AS [02],
                    CASE WHEN 22 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  3 THEN a.ValPretty END), N'x') ELSE N' ' END AS [03],
                    CASE WHEN 23 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  4 THEN a.ValPretty END), N'x') ELSE N' ' END AS [04],
                    CASE WHEN 24 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  5 THEN a.ValPretty END), N'x') ELSE N' ' END AS [05],
                                                
                    CASE WHEN  1 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  6 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  6 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  6 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [06_color],
                    CASE WHEN  2 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  7 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  7 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  7 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [07_color],
                    CASE WHEN  3 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  8 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  8 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  8 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [08_color],
                    CASE WHEN  4 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  9 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  9 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  9 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [09_color],
                    CASE WHEN  5 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 10 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 10 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 10 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [10_color],
                    CASE WHEN  6 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 11 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 11 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 11 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [11_color],
                    CASE WHEN  7 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 12 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 12 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 12 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [12_color],
                    CASE WHEN  8 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 13 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 13 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 13 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [13_color],
                    CASE WHEN  9 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 14 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 14 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 14 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [14_color],
                    CASE WHEN 10 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 15 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 15 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 15 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [15_color],
                    CASE WHEN 11 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 16 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 16 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 16 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [16_color],
                    CASE WHEN 12 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 17 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 17 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 17 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [17_color],
                    CASE WHEN 13 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 18 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 18 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 18 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [18_color],
                    CASE WHEN 14 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 19 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 19 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 19 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [19_color],
                    CASE WHEN 15 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 20 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 20 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 20 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [20_color],
                    CASE WHEN 16 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 21 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 21 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 21 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [21_color],
                    CASE WHEN 17 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 22 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 22 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 22 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [22_color],
                    CASE WHEN 18 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period = 23 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period = 23 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period = 23 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [23_color],
                    CASE WHEN 19 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  0 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  0 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  0 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [00_color],
                    CASE WHEN 20 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  1 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  1 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  1 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [01_color],
                    CASE WHEN 21 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  2 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  2 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  2 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [02_color],
                    CASE WHEN 22 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  3 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  3 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  3 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [03_color],
                    CASE WHEN 23 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  4 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  4 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  4 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [04_color],
                    CASE WHEN 24 <= @hour_idx THEN 
                        CASE WHEN (@wo_check_enabled = 0) OR (ISNULL(MAX(CASE WHEN a.Period =  5 THEN a.WO END), 0) = ISNULL(rw.RefWO, 0))
                                THEN CASE WHEN MAX(CASE WHEN a.Period =  5 THEN a.HasNG END) = 1 THEN '2'
                                        ELSE CASE WHEN ISNULL(MAX(CASE WHEN a.Period =  5 THEN a.ValNum END), 0) = 0 THEN '11' ELSE '12' END
                                    END
                                ELSE '0'
                        END ELSE N' ' END AS [05_color],
                                                    
                                                    
                        CASE 
                            WHEN @wo_check_enabled = 1 THEN 
                                ISNULL(CONVERT(nvarchar(50), MAX(a_cur.WO)), N' ')
                            ELSE N' '
                        END AS [WorkOrder],
                                                    
                        CASE 
                            WHEN @wo_check_enabled = 1 THEN 
                                ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(wo.AQL) AS decimal(18,1))), N' ')
                            ELSE N' '
                        END AS [AQL],
                                
                        CASE WHEN  1 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  6 THEN a.WO END)), N'x') ELSE N' ' END AS [06_wo],
                        CASE WHEN  2 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  7 THEN a.WO END)), N'x') ELSE N' ' END AS [07_wo],
                        CASE WHEN  3 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  8 THEN a.WO END)), N'x') ELSE N' ' END AS [08_wo],
                        CASE WHEN  4 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  9 THEN a.WO END)), N'x') ELSE N' ' END AS [09_wo],
                        CASE WHEN  5 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 10 THEN a.WO END)), N'x') ELSE N' ' END AS [10_wo],
                        CASE WHEN  6 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 11 THEN a.WO END)), N'x') ELSE N' ' END AS [11_wo],
                        CASE WHEN  7 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 12 THEN a.WO END)), N'x') ELSE N' ' END AS [12_wo],
                        CASE WHEN  8 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 13 THEN a.WO END)), N'x') ELSE N' ' END AS [13_wo],
                        CASE WHEN  9 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 14 THEN a.WO END)), N'x') ELSE N' ' END AS [14_wo],
                        CASE WHEN 10 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 15 THEN a.WO END)), N'x') ELSE N' ' END AS [15_wo],
                        CASE WHEN 11 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 16 THEN a.WO END)), N'x') ELSE N' ' END AS [16_wo],
                        CASE WHEN 12 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 17 THEN a.WO END)), N'x') ELSE N' ' END AS [17_wo],
                        CASE WHEN 13 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 18 THEN a.WO END)), N'x') ELSE N' ' END AS [18_wo],
                        CASE WHEN 14 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 19 THEN a.WO END)), N'x') ELSE N' ' END AS [19_wo],
                        CASE WHEN 15 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 20 THEN a.WO END)), N'x') ELSE N' ' END AS [20_wo],
                        CASE WHEN 16 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 21 THEN a.WO END)), N'x') ELSE N' ' END AS [21_wo],
                        CASE WHEN 17 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 22 THEN a.WO END)), N'x') ELSE N' ' END AS [22_wo],
                        CASE WHEN 18 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period = 23 THEN a.WO END)), N'x') ELSE N' ' END AS [23_wo],
                        CASE WHEN 19 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  0 THEN a.WO END)), N'x') ELSE N' ' END AS [00_wo],
                        CASE WHEN 20 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  1 THEN a.WO END)), N'x') ELSE N' ' END AS [01_wo],
                        CASE WHEN 21 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  2 THEN a.WO END)), N'x') ELSE N' ' END AS [02_wo],
                        CASE WHEN 22 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  3 THEN a.WO END)), N'x') ELSE N' ' END AS [03_wo],
                        CASE WHEN 23 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  4 THEN a.WO END)), N'x') ELSE N' ' END AS [04_wo],
                        CASE WHEN 24 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(50), MAX(CASE WHEN a.Period =  5 THEN a.WO END)), N'x') ELSE N' ' END AS [05_wo],
                                
                        CASE WHEN  1 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  6 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [06_aql],
                        CASE WHEN  2 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  7 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [07_aql],
                        CASE WHEN  3 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  8 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [08_aql],
                        CASE WHEN  4 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  9 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [09_aql],
                        CASE WHEN  5 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 10 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [10_aql],
                        CASE WHEN  6 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 11 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [11_aql],
                        CASE WHEN  7 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 12 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [12_aql],
                        CASE WHEN  8 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 13 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [13_aql],
                        CASE WHEN  9 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 14 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [14_aql],
                        CASE WHEN 10 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 15 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [15_aql],
                        CASE WHEN 11 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 16 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [16_aql],
                        CASE WHEN 12 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 17 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [17_aql],
                        CASE WHEN 13 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 18 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [18_aql],
                        CASE WHEN 14 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 19 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [19_aql],
                        CASE WHEN 15 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 20 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [20_aql],
                        CASE WHEN 16 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 21 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [21_aql],
                        CASE WHEN 17 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 22 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [22_aql],
                        CASE WHEN 18 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period = 23 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [23_aql],
                        CASE WHEN 19 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  0 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [00_aql],
                        CASE WHEN 20 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  1 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [01_aql],
                        CASE WHEN 21 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  2 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [02_aql],
                        CASE WHEN 22 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  3 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [03_aql],
                        CASE WHEN 23 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  4 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [04_aql],
                        CASE WHEN 24 <= @hour_idx THEN ISNULL(CONVERT(nvarchar(20), TRY_CAST(MAX(CASE WHEN a.Period =  5 THEN a.WO_AQL END) AS decimal(18,1))), N'x') ELSE N' ' END AS [05_aql],
                
                
                        CASE WHEN  1 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  6 THEN a.PlaceList END), N'') ELSE N' ' END AS [06_place],
                        CASE WHEN  2 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  7 THEN a.PlaceList END), N'') ELSE N' ' END AS [07_place],
                        CASE WHEN  3 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  8 THEN a.PlaceList END), N'') ELSE N' ' END AS [08_place],
                        CASE WHEN  4 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  9 THEN a.PlaceList END), N'') ELSE N' ' END AS [09_place],
                        CASE WHEN  5 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  10 THEN a.PlaceList END), N'') ELSE N' ' END AS [10_place],
                        CASE WHEN  6 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  11 THEN a.PlaceList END), N'') ELSE N' ' END AS [11_place],
                        CASE WHEN  7 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  12 THEN a.PlaceList END), N'') ELSE N' ' END AS [12_place],
                        CASE WHEN  8 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  13 THEN a.PlaceList END), N'') ELSE N' ' END AS [13_place],
                        CASE WHEN  9 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  14 THEN a.PlaceList END), N'') ELSE N' ' END AS [14_place],
                        CASE WHEN  10 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  15 THEN a.PlaceList END), N'') ELSE N' ' END AS [15_place],
                        CASE WHEN  11 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  16 THEN a.PlaceList END), N'') ELSE N' ' END AS [16_place],
                        CASE WHEN  12 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  17 THEN a.PlaceList END), N'') ELSE N' ' END AS [17_place],
                        CASE WHEN  13 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  18 THEN a.PlaceList END), N'') ELSE N' ' END AS [18_place],
                        CASE WHEN  14 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  19 THEN a.PlaceList END), N'') ELSE N' ' END AS [19_place],
                        CASE WHEN  15 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  20 THEN a.PlaceList END), N'') ELSE N' ' END AS [20_place],
                        CASE WHEN  16 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  21 THEN a.PlaceList END), N'') ELSE N' ' END AS [21_place],
                        CASE WHEN  17 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  22 THEN a.PlaceList END), N'') ELSE N' ' END AS [22_place],
                        CASE WHEN  18 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  23 THEN a.PlaceList END), N'') ELSE N' ' END AS [23_place],
                        CASE WHEN  19 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  00 THEN a.PlaceList END), N'') ELSE N' ' END AS [00_place],
                        CASE WHEN  20 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  01 THEN a.PlaceList END), N'') ELSE N' ' END AS [01_place],
                        CASE WHEN  21 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  02 THEN a.PlaceList END), N'') ELSE N' ' END AS [02_place],
                        CASE WHEN  22 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  03 THEN a.PlaceList END), N'') ELSE N' ' END AS [03_place],
                        CASE WHEN  23 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  04 THEN a.PlaceList END), N'') ELSE N' ' END AS [04_place],
                        CASE WHEN  24 <= @hour_idx THEN ISNULL(MAX(CASE WHEN a.Period =  05 THEN a.PlaceList END), N'') ELSE N' ' END AS [05_place]
                
                
                FROM machines m
                LEFT JOIN data_agg a
                        ON a.MachineName = m.MachineName
                        AND a.LineName    = m.Line
                LEFT JOIN ref_wo rw
                        ON rw.MachineName = m.MachineName
                        AND rw.LineName    = m.Line
                                                
                                                
                LEFT JOIN data_agg a_cur
                        ON a_cur.MachineName = m.MachineName
                        AND a_cur.LineName    = m.Line
                        AND a_cur.Period      = @hour_int
                        AND @wo_check_enabled = 1
                                                
                                                
                LEFT JOIN [PMGMES].[dbo].[PMG_MES_WorkOrder] wo
                        ON wo.Id = a_cur.WO
                        AND @wo_check_enabled = 1
                                                
                GROUP BY m.MachineName, m.Line, m.Code, rw.RefWO
                ORDER BY m.MachineName, m.Line;

                """
    return raw_query