import useSelectedApp from "@hooks/useSelectedApp";
import React, { createContext } from "react";

// Returned data and data status
/**
 * @typedef {Object} SelectedAppIdContextValue
 * @property {Number | null} activeAppId
 * @property {(appId: Number | null) => void} handleOnClickApp
 */

/**
 * @type {React.Context<SelectedAppIdContextValue | null>}
 */

export const SelectedAppIdContext = createContext(null);

export const SelectedAppIdProvider = ({ children }) => {
  const { activeAppId, handleOnClickApp } = useSelectedApp();

  const stateValueList = {
    activeAppId, handleOnClickApp,
  };

  return (
    <SelectedAppIdContext.Provider value={stateValueList}>
      {children}
    </SelectedAppIdContext.Provider>
  );
};