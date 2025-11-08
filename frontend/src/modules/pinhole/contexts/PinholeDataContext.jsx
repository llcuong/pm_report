import { createContext } from "react";
import usePinholeSelectOptionFetcher from "../hooks/usePinholeSelectOptionFetcher";

// Returned data and data status with API stored in context
/**
 * @typedef {Object} PinholeDataContextValue
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
    viewData,
    isFetching, isPendingUI, isAPIError,
  } = usePinholeSelectOptionFetcher({ selectedFactory: null, selectedBranch: null });

  const stateValueList = { viewData, isFetching, isPendingUI, isAPIError };

  return (
    <PinholeDataContext.Provider value={stateValueList}>
      {children}
    </PinholeDataContext.Provider>
  )
};