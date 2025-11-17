import { useContext } from "react";
import { DataTableContext } from "./DataTableContext";

const useDataTableContext = () => {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error('useDataTableContext must be used in DataTableProvider!');
  };

  return context;
};

export default useDataTableContext;