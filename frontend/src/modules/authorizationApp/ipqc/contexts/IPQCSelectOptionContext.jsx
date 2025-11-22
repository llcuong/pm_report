import React, { createContext } from "react";
import useDateAndMachine from "../useDateAndMachine";
import useFactoryAndBranch from "@modules/pinhole/hooks/useFactoryAndBranch";

// Returned data and data status with API stored in context
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
 * @property {string | null} value
 * @property {string | null} label
 */

/**
 * @typedef {Object} IPQCSelectOptionContextValue
 * @property {Factory | undefined} selectedFactory
 * @property {(value: Factory | null) => void} setSelectedFactory
 * @property {Branch[]} branchData
 * @property {Branch | undefined} selectedBranch
 * @property {(value: Branch | undefined) => void} setSelectedBranch
 * @property {Machine | undefined} selectedMachine
 * @property {(value: Machine | undefined) => void} setSelectedMachine
 * @property {Date} selectedDate
 * @property {(value: Date) => void} setSelectedDate
 */

/**
 * @type {React.Context<IPQCSelectOptionContextValue | null>}
 */

export const IPQCSelectOptionContext = createContext(null);

export const IPQCSelectOptionProvider = ({ children }) => {
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
    <IPQCSelectOptionContext.Provider value={stateValueList}>
      {children}
    </IPQCSelectOptionContext.Provider>
  );
};