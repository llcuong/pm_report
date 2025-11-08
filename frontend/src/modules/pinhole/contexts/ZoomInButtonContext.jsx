import { createContext } from "react";
import useZoomIn from "../hooks/useZoomIn";

// Status of Zoom In Button stored in context
/**
 * @typedef {Object} ZoomInButtonContextValue
 * @property {boolean} isZoomIn
 * @property {(value: boolean) => void} setIsZoomIn
 */

/**
 * @type {React.Context<ZoomInButtonContextValue | null>}
 */

export const ZoomInButtonContext = createContext(null);

export const ZoomInButtonProvider = ({ children }) => {
  const { isZoomIn, setIsZoomIn } = useZoomIn();

  // State's values for sharing
  const stateValueList = {
    isZoomIn, setIsZoomIn,
  };

  return (
    <ZoomInButtonContext.Provider value={stateValueList}>
      {children}
    </ZoomInButtonContext.Provider>
  );
};