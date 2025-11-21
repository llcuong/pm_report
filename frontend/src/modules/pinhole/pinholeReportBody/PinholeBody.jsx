import { useMemo } from "react";
import PinholeTable from "./PinholeTable";
import useZoomInButtonContext from "../contexts/useZoomInButtonContext";

const PinholeBody = () => {
  const {
    isZoomIn,
  } = useZoomInButtonContext();

  const containerClassname = useMemo(() => {
    let base = "rounded-lg border border-gray-200 flex flex-col";
    if (isZoomIn) {
      return `fixed inset-0 z-50 pl-15 ${base} rounded-none bg-gray-50`;
    } else {
      return `h-[calc(100vh-12rem)] ${base}`;
    };
  }, [isZoomIn]);

  return (
    <div className={containerClassname}>
      <PinholeTable />
    </div>
  );
};

export default PinholeBody;