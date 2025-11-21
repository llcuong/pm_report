import { createContext } from "react";
import usePinholeSelectOptionFetcher from "../hooks/usePinholeSelectOptionFetcher";

// Returned data and data status with API stored in context
/**
 * @typedef {Object} FactoryData
 * @property {string | null} value
 * @property {string | null} label
 * @property {string | null} description
 */

/**
 * @typedef {Object} BranchData
 * @property {string | null} value
 * @property {string | null} label
 */

/**
 * @typedef {Object} AqlData
 * @property {string | null} value
 * @property {string | null} label
 */

/**
 * @typedef {Object} PinholeDataContextValue
 * @property {FactoryData | undefined} selectedFactory
 * @property {(value: FactoryData | null) => void} setSelectedFactory
 * @property {BranchData | undefined} selectedBranch
 * @property {(value: BranchData | undefined) => void} setSelectedBranch
 * @property {AqlData | undefined} selectedAql
 * @property {(value: AqlData | undefined) => void} setSelectedAql
 * @property {Date} selectedDate
 * @property {(value: Date) => void} setSelectedDate
 * 
 * @property {{ title: string | null, rows: Object[] | null} | null} viewData
 * @property {boolean} isFetching
 * @property {boolean} isPendingUI
 * @property {boolean} isAPIError
 */

/**
 * @type {React.Context<PinholeDataContextValue | null>}
 */

export const PinholeDataContext = createContext(null);

export const PinholeDataProvider = ({ children }) => {

  const {
    aqlData, selectedAql, setSelectedAql,
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    selectedDate, setSelectedDate,
    viewData,
    isFetching, isPendingUI, isAPIError,
  } = usePinholeSelectOptionFetcher();

  const stateValueList = {
    aqlData, selectedAql, setSelectedAql,
    selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    selectedDate, setSelectedDate,
    viewData,
    isFetching, isPendingUI, isAPIError,
  };

  return (
    <PinholeDataContext.Provider value={stateValueList}>
      {children}
    </PinholeDataContext.Provider>
  )
};