import useDateAndMachine from "@modules/authorizationApp/hooks/useDateAndMachine";
import useFactoryAndBranch from "@modules/authorizationApp/hooks/useFactoryAndBranch";
import { createContext } from "react";
import useReportMode from "../../useReportMode";

// Returned data and data status with API stored in context
/**
 * @typedef {Object} Mode
 * @property {number | null} id
 * @property {string | null} label
 * @property {string | null} value
 */

/**
 * @typedef {Object} Factory
 * @property {string | null} value
 * @property {string | null} label
 * @property {string | null} description
 */

/**
 * @typedef {Object} Branch
 * @property {string | null} value
 * @property {string | null} label
 */

/**
 * @typedef {Object} Machine
 * @property {string | null} id
 * @property {string | null} machine
 */

/**
 * @typedef {Object} CountingSelectOptionContextValue
 * @property {Mode | undefined} mode
 * @property {(value: Mode | null) => void} setMode
 * @property {Factory | undefined} selectedFactory
 * @property {(value: Factory | null) => void} setSelectedFactory
 * @property {Branch[]} branchData
 * @property {Branch | undefined} selectedBranch
 * @property {(value: Branch | undefined) => void} setSelectedBranch
 * @property {Machine[]} machineData
 * @property {Machine | undefined} selectedMachine
 * @property {(value: Machine | undefined) => void} setSelectedMachine
 * @property {Date} selectedDate
 * @property {(value: Date) => void} setSelectedDate
 */

/**
 * @type {React.Context<CountingSelectOptionContextValue | null>}
 */

export const CountingSelectOptionContext = createContext(null);

export const CountingSelectOptionProvider = ({ children }) => {
  const {
    mode, setMode,
  } = useReportMode();

  const {
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
  } = useFactoryAndBranch();

  const {
    machineData, selectedMachine, setSelectedMachine,
    selectedDate, setSelectedDate,

    viewData,

    isPendingUI,
    isFetching,
    isAPIError,
  } = useDateAndMachine({ selectedFactory, selectedBranch });

  const stateValueList = {
    mode, setMode,
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    machineData, selectedMachine, setSelectedMachine,
    selectedDate, setSelectedDate,

    viewData,

    isPendingUI,
    isFetching,
    isAPIError,
  };

  return (
    <CountingSelectOptionContext.Provider value={stateValueList}>
      {children}
    </CountingSelectOptionContext.Provider>
  );
};