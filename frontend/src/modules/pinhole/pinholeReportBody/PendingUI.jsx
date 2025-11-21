import { useContext } from "react";
import usePinholeDataContext from "../contexts/usePinholeDataContext";

const PendingUI = () => {
  const {
    isFetching, isPendingUI,
  } = usePinholeDataContext();

  return (
    <>
      {(isFetching || isPendingUI) && (
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/30" />
      )}
    </>
  )
};

export default PendingUI;