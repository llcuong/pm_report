import React, { createContext } from "react";
import useCheckbox from "../hooks/useCheckbox";
import useSorting from "../hooks/useSorting";

// Data for transmiting
/**
 * @typedef {Object} DataTableContextValue
 * @property {Set<string> | null} selectedUserIdList
 * @property {(id: string | null) => void} handleSelectUser
 * @property {() => void} handleSelectAllUser
 * 
 * @property {(attribute: string, value: string) => void} onSort
 */

/**
 * @type {React.Context<DataTableContextValue | null>} 
 */

export const DataTableContext = createContext(null);

const DataTableProvider = ({ children }) => {
  // Handle checkbox
  const {
    selectedUserIdList,
    handleSelectUser,
    handleSelectAllUser,
  } = useCheckbox();

  // Handle sorting
  const {
    onSort,
  } = useSorting();

  const stateValueList = {
    selectedUserIdList,
    handleSelectUser, handleSelectAllUser,

    onSort,
  };

  return (
    <DataTableContext.Provider value={stateValueList}>
      {children}
    </DataTableContext.Provider>
  );
};

export default DataTableProvider;