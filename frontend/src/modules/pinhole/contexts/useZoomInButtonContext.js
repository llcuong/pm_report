import { useContext } from "react";
import { ZoomInButtonContext } from "./ZoomInButtonContext";

const useZoomInButtonContext = () => {
  const context = useContext(ZoomInButtonContext);
  if (!context) {
    throw new Error('useZoomInButtonContext must be used in ZoomInButtonProvider!');
  };

  return context;
};

export default useZoomInButtonContext;