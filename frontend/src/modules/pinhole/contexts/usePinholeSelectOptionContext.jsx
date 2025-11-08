import { useContext } from "react";
import { PinholeSelectOptionContext } from "./PinholeSelectOptionContext";

const usePinholeSelectOptionContext = () => {
  const context = useContext(PinholeSelectOptionContext);
  if (!context) {
    throw new Error('usePinholeSelectOptionContext must be used within an PinholeSelectOptionProvider!');
  };

  return context;
};

export default usePinholeSelectOptionContext;