import { startTransition, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { getPinholeReportDataAPI } from "../pinholeServices";
import { BRANCH_BY_FACTORY_DATA, FACTORY_DATA, REFRESH_INTERVAL } from "../PinholeConstantData";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const usePinholeSelectOptionFetcher = () => {
  const { t } = useTranslation();
  /****************************************************
   *              Factory & Branch Data
   ****************************************************/
  const [searchParamFactory] = useSearchParams();

  const [selectedFactory, setSelectedFactory] = useState(() =>
    FACTORY_DATA.find(factory => factory.value === searchParamFactory.get('factory')) || FACTORY_DATA[0]
  );

  // Change relative branches based on selected factory
  const branchData = useMemo(() => {
    let key = (selectedFactory?.value || "").toLowerCase();
    return BRANCH_BY_FACTORY_DATA.find(branch => branch.id === key).branch || []
  }, [selectedFactory]);

  const [selectedBranch, setSelectedBranch] = useState(branchData[0]);

  // Set up selected branch data again
  useEffect(() => {
    setSelectedBranch(branchData[0]);
  }, [branchData]);
  /****************************************************
   *        Aql & Date & View Data & Status
   ****************************************************/
  const [selectedAql, setSelectedAql] = useState(undefined);
  const [aqlData, setAqlData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [viewData, setViewData] = useState({ title: null, rows: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [isPendingUI, startTransition] = useTransition();

  const [isAPIError, setIsAPIError] = useState(false);

  const reqSeq = useRef(0);

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
    // 
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,

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

export default usePinholeSelectOptionFetcher;