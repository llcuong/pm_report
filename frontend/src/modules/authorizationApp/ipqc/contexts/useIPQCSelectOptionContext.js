import { useContext } from "react";
import { IPQCSelectOptionContext } from "./IPQCSelectOptionContext";

const useIPQCSelectOptionContext = () => {
  const context = useContext(IPQCSelectOptionContext);

  if (!context)
    throw new Error('useIPQCSelectOptionContext must be used in IPQCSelectOptionProvider!');

  return context;
};

export default useIPQCSelectOptionContext;