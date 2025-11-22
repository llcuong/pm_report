import { format } from "date-fns";
import { useEffect, useRef, useState, useTransition } from "react";
import { REFRESH_INTERVAL } from "../PinholeConstantData";
import { useTranslation } from "react-i18next";
import { getPinholeReportDataAPI } from "../pinholeServices";

const useDateAndAql = ({ selectedFactory, selectedBranch }) => {
  const [selectedAql, setSelectedAql] = useState(undefined);
  const [aqlData, setAqlData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [viewData, setViewData] = useState({ title: null, rows: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [isPendingUI, startTransition] = useTransition();

  const [isAPIError, setIsAPIError] = useState(false);

  const reqSeq = useRef(0);

  const { t } = useTranslation();

  const getPinholeReportData = async () => {
    const abortController = new AbortController();
    const seq = ++reqSeq.current;
    setIsFetching(true);

    const dataOptionParams = {
      aql: selectedAql?.value || "",
      factory: selectedFactory?.value || "",
      branch: selectedBranch?.value || "",
      date: format(selectedDate, "yyyy-MM-dd"),
      signal: abortController.signal,
    };

    try {
      const resOfData = await getPinholeReportDataAPI(dataOptionParams);

      // Check current client request
      if (seq !== reqSeq.current) return;

      // Get returned data
      const title = resOfData?.title || t('outlet.pinholeReport.header.pinholeTitle');
      const rows = Array.isArray(resOfData?.pinhole_data) ? resOfData.pinhole_data : [];

      const nextAqlList = Array.isArray(resOfData?.aql_list)
        ? resOfData?.aql_list.map(v => ({ value: String(v), label: String(v) }))
        : [];

      setAqlData(nextAqlList);

      if (!selectedAql || !nextAqlList.some(o => o.value === selectedAql.value)) {
        setSelectedAql(nextAqlList[0]);
      };

      startTransition(() => setViewData({ title, rows }));
    } catch (error) {
      console.error("Fetch error:", error);
      setIsAPIError(true);
      if (seq === reqSeq.current) {
        startTransition(() =>
          setViewData(prev => ({ ...prev, title: t('error.internalServerError') }))
        );
      };
    } finally {
      if (seq === reqSeq.current) setIsFetching(false);
    };
  };

  // Get data based on selected data options
  useEffect(() => {
    getPinholeReportData();
  }, [selectedBranch, selectedDate, selectedAql]);

  // Get data after REFRESH_INTERVAL time in milisecond
  useEffect(() => {
    const timer = setInterval(getPinholeReportData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [selectedBranch, selectedDate, selectedAql]);

  return {
    // Data for select options
    aqlData, selectedAql, setSelectedAql,
    selectedDate, setSelectedDate,

    // Data returned from API
    viewData,

    // Status of waiting data returned from API
    isPendingUI,
    isFetching,
    isAPIError,
  };
};

export default useDateAndAql;