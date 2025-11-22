import { useContext } from "react";
import { CountingSelectOptionContext } from "./CountingSelectOptionContext";

const useCountingSelectOptionContext = () => {
  const context = useContext(CountingSelectOptionContext);

  if (!context)
    throw new Error('useCountingSelectOptionContext must be used in CountingSelectOptionProvider!');

  return context;
};

export default useCountingSelectOptionContext;