import ResizeIcon from "@assets/icons/resize-icon";
import { useContext } from "react";
import { ZoomInButtonContext } from "../contexts/ZoomInButtonContext";
import useZoomInButtonContext from "../contexts/useZoomInButtonContext";

const PinholeResizeButton = () => {
  const {
    isZoomIn, setIsZoomIn
  } = useZoomInButtonContext();

  return (
    <button
      type="button"
      title='Zoom In'
      onClick={() => setIsZoomIn(true)}
      className={`w-12 h-12 justify-items-center border-2 bg-white border-gray-200 rounded-lg 
                  cursor-pointer transition-colors duration-200 hover:border-[#1b9eaf]`}
      aria-pressed={isZoomIn}
    >
      <ResizeIcon />
    </button>
  );
};

export default PinholeResizeButton;