import { useContext } from "react";
import { SelectedAppIdContext } from "./SelectedAppIdContext";

const useSelectedAppIdContext = () => {
  const context = useContext(SelectedAppIdContext);
  if (!context) {
    throw new Error('useSelectedAppIdContext must be used within an SelectedAppIdContextProvider!');
  };

  return context;
};

export default useSelectedAppIdContext;