import React, { createContext, startTransition, useEffect, useMemo, useRef, useState } from "react";
import { BRANCH_BY_FACTORY_DATA, FACTORY_DATA, REFRESH_INTERVAL } from "../PinholeConstantData";
import { getPinholeReportDataAPI } from "../pinholeServices";
import { format } from "date-fns";
import useFactoryBranch from "../hooks/useFactoryBranch";
import usePinholeSelectOptionFetcher from "../hooks/usePinholeSelectOptionFetcher";

// Report select options stored in context
/**
 * @typedef {Object} PinholeSelectOptionContextValue
 * @property {string | null} selectedFactory
 * @property {(value: string | null) => void} setSelectedFactory
 * @property {string | null} selectedBranch
 * @property {(value: string | null) => void} setSelectedBranch
 * @property {string | number | null} selectedAql
 * @property {(value: string | number | null) => void} setSelectedAql
 * @property {Date} selectedDate
 * @property {(value: Date) => void} setSelectedDate
 */

/**
 * @type {React.Context<PinholeSelectOptionContextValue | null>}
 */

export const PinholeSelectOptionContext = createContext(null);

export const PinholeSelectOptionProvider = ({ children }) => {
  const {
    factoryData, selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
  } = useFactoryBranch();

  const {
    aqlData, selectedAql, setSelectedAql,
    selectedDate, setSelectedDate,
    viewData,
    isFetching, isPendingUI, isAPIError,
  } = usePinholeSelectOptionFetcher({ selectedFactory, selectedBranch });

  // State's values for sharing
  const stateValueList = {
    // Data for select options
    aqlData, selectedAql, setSelectedAql,
    factoryData, selectedFactory, setSelectedFactory,
    branchData, selectedBranch, setSelectedBranch,
    selectedDate, setSelectedDate,

    // Data returned from API
    viewData,

    // Status of waiting data returned from API
    isPendingUI,
    isFetching,
    isAPIError,
  };

  return <PinholeSelectOptionContext.Provider value={stateValueList}>
    {children}
  </PinholeSelectOptionContext.Provider>
};