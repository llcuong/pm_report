import { createContext } from "react";
import usePinholeSelectOptionFetcher from "../hooks/usePinholeSelectOptionFetcher";

// Returned data and data status with API stored in context
/**
 * @typedef {Object} PinholeDataContextValue
 * @property {string | null} selectedFactory
 * @property {(value: string | null) => void} setSelectedFactory
 * @property {string | null} selectedBranch
 * @property {(value: string | null) => void} setSelectedBranch
 * @property {string | number | null} selectedAql
 * @property {(value: string | number | null) => void} setSelectedAql
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
    factoryData, selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    selectedDate, setSelectedDate,
    viewData,
    isFetching, isPendingUI, isAPIError,
  } = usePinholeSelectOptionFetcher();

  const stateValueList = {
    aqlData, selectedAql, setSelectedAql,
    factoryData, selectedFactory, setSelectedFactory,
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