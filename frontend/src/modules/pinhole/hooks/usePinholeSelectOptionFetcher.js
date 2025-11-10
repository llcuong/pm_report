import { startTransition, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { getPinholeReportDataAPI } from "../pinholeServices";
import { BRANCH_BY_FACTORY_DATA, FACTORY_DATA, REFRESH_INTERVAL } from "../PinholeConstantData";
import { format } from "date-fns";

const usePinholeSelectOptionFetcher = () => {
  const factoryData = FACTORY_DATA;
  const [selectedFactory, setSelectedFactory] = useState(factoryData[0]);

  const [selectedBranch, setSelectedBranch] = useState(() =>
    // Set default factory and relative branch
    (BRANCH_BY_FACTORY_DATA[FACTORY_DATA[0].value] || [])[0]
  );

  // Change relative branches based on selected factory
  const branchData = useMemo(() => {
    let key = (selectedFactory?.value || "").toLowerCase();
    return BRANCH_BY_FACTORY_DATA[key] || [];
  }, [selectedFactory]);

  useEffect(() => {
    if (branchData.length > 0) {
      setSelectedBranch(branchData[0]);
    } else {
      setSelectedBranch(undefined);
    }
  }, [branchData]);

  // 
  // 
  // 
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
      const res = await getPinholeReportDataAPI(dataOptionParams);

      // Check current client request
      if (seq !== reqSeq.current) return;

      // Get returned data
      const title = res.title || "Pinhole Inspection Data";
      const rows = Array.isArray(res.pinhole_data) ? res.pinhole_data : [];

      const nextAqlList = Array.isArray(res.aql_list)
        ? res.aql_list.map(v => ({ value: String(v), label: String(v) }))
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
          setViewData(prev => ({ ...prev, title: "Internal Server Error!" }))
        );
      };
    } finally {
      if (seq === reqSeq.current) setIsFetching(false);
    };
  };

  useEffect(() => {
    // Fetch data immediately
    getPinholeReportData();

    // Fetch data repeatedly
    const timer = setInterval(getPinholeReportData, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [selectedFactory, selectedBranch, selectedDate, selectedAql]);

  return {
    // 
    factoryData, selectedFactory, setSelectedFactory,
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