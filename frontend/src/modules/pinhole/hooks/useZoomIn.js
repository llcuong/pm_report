import { useEffect, useState } from "react";

const useZoomIn = () => {
  const [isZoomIn, setIsZoomIn] = useState(false);

  // Lock scroll when zoomed in
  useEffect(() => {
    document.body.style.overflow = isZoomIn ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomIn]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') setIsZoomIn(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return { isZoomIn, setIsZoomIn };
};

export default useZoomIn;