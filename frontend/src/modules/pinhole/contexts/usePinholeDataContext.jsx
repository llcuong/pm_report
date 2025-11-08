import { useContext } from "react";
import { PinholeDataContext } from "./PinholeDataContext";

const usePinholeDataContext = () => {
  const context = useContext(PinholeDataContext);
  if (!context) {
    throw new Error('usePinholeDataContext must be used within an PinholeDataProvider!');
  };

  return context;
};

export default usePinholeDataContext;