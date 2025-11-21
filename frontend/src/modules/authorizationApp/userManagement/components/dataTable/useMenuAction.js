import { useEffect, useRef, useState } from "react";

const useMenuAction = () => {
  const [openId, setOpenId] = useState(null);
  const refs = useRef({});

  const registerRef = (id) => (el) => {
    refs.current[id] = el;
  };

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!openId) return;

      const currentRef = refs.current[openId];
      if (currentRef && !currentRef.contains(e.target)) {
        setOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openId]);

  return {
    openId,
    toggle,
    registerRef,
  };
};

export default useMenuAction;