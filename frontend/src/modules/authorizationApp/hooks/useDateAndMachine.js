import { REFRESH_INTERVAL } from "@modules/pinhole/PinholeConstantData";
import { format } from "date-fns";
import { useEffect, useRef, useState, useTransition } from "react";
import { getIPQCDataAPI } from "../ipqc/ipqc.service";

const useDateAndMachine = ({ selectedFactory, selectedBranch }) => {
  const [selectedMachine, setSelectedMachine] = useState(undefined);
  const [machineData, setMachineData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [viewData, setViewData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isPendingUI, startTransition] = useTransition();

  const [isAPIError, setIsAPIError] = useState(false);

  const reqSeq = useRef(0);

  const getIPQCReportData = async () => {
    const abortController = new AbortController();
    const seq = ++reqSeq.current;
    setIsFetching(true);

    const dataOptionParams = {
      machine: selectedMachine?.value || "",
      factory: selectedFactory?.value || "",
      branch: selectedBranch?.value || "",
      date: format(selectedDate, "yyyy-MM-dd"),
      signal: abortController.signal,
    };

    try {
      const resOfData = await getIPQCDataAPI(dataOptionParams);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
    };
  };

  // Get data based on selected data options
  useEffect(() => {
    getIPQCReportData();
  }, [selectedBranch, selectedDate, selectedMachine]);

  // Get data after REFRESH_INTERVAL time in milisecond
  useEffect(() => {
    const timer = setInterval(getIPQCReportData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [selectedBranch, selectedDate, selectedMachine]);

  return {
    // Data for select options
    machineData, selectedMachine, setSelectedMachine,
    selectedDate, setSelectedDate,

    // Data returned from API
    viewData,

    // Status of waiting data returned from API
    isPendingUI,
    isFetching,
    isAPIError,
  };
};

export default useDateAndMachine;