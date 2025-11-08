import ResizeIcon from "@assets/icons/resize-icon";
import { useContext } from "react";
import { ZoomInButtonContext } from "../contexts/ZoomInButtonContext";
import useZoomInButtonContext from "../contexts/useZoomInButtonContext";
import { PM_GROUP_MAIN_COLOR } from "@constants/Color";

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
                  cursor-pointer transition-colors duration-200 hover:border-[${PM_GROUP_MAIN_COLOR}]`}
      aria-pressed={isZoomIn}
    >
      <ResizeIcon />
    </button>
  );
};

export default PinholeResizeButton;