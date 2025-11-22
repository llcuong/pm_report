import { useState } from "react";

const useReportMode = () => {
  const [mode, setMode] = useState(null);

  return {
    mode, setMode
  };
};

export default useReportMode;