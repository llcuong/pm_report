import { useCallback, useEffect, useState } from "react";
import SidebarOpenButton from "./sidebar/SidebarOpenButton";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarBody from "./sidebar/SidebarBody";
import SidebarFooter from "./sidebar/SidebarFooter";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSignOutSuccess, setIsSignOutSuccess] = useState(false);

  const toggleSidebar = useCallback(() => setIsExpanded(v => !v), []);

  // Toggle Sidebar Effect
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault()
        toggleSidebar()
      };
    };
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [toggleSidebar]);

  return (
    <>
      <aside
        className={[
          "bg-(--bg-primary) border border-gray-200 shadow-lg z-82 relative flex flex-col py-2",
          "transition-[width,transform] duration-300 ease-out",
          isExpanded ? "w-60 items-start pl-0" : "w-16 items-center pl-0"
        ].join(" ")}
      >
        <SidebarOpenButton onToggle={toggleSidebar} isExpanded={isExpanded} />
        <SidebarHeader isExpanded={isExpanded} />
        <SidebarBody isExpanded={isExpanded} />
        <SidebarFooter onSignOutSuccess={() => setIsSignOutSuccess(true)} isExpanded={isExpanded} />
      </aside>

      <div
        className={[
          "fixed inset-0 bg-black/50 z-81 transition-opacity duration-300",
          isExpanded ? "opacity-100" : "opacity-0 invisible pointer-events-none"
        ].join(" ")}
      />
    </>
  );
};

export default Sidebar;