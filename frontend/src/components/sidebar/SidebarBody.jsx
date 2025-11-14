import { useState, useEffect } from "react";
import SidebarBodyApp from "./SidebarBodyApp";
import { ACTIVE_APP_ID } from "@components/AppIdWrapper";
import { authAppList, commonAppList } from "@constants/AppList";

const SidebarBody = ({ isExpanded }) => {
  const [activeAppId, setActiveAppId] = useState(null);

  // Hard code to check security
  const defaultUserName = 'admin172185521517500';
  let userName = localStorage.getItem('user_name') || '';
  let isAdmin = localStorage.getItem('is_admin') || '';

  let storedAppId = Number(sessionStorage.getItem(ACTIVE_APP_ID));

  useEffect(() => {
    if (storedAppId) {
      setActiveAppId(storedAppId);
    } else {
      // Set default app
      sessionStorage.setItem(ACTIVE_APP_ID, 1);
      setActiveAppId(1);
    };
  }, [storedAppId]);

  const handleOnClickApp = (appId) => {
    sessionStorage.setItem(ACTIVE_APP_ID, appId);
    setActiveAppId(appId);
  };

  return (
    <div className="w-full flex-1 min-h-0 overflow-hidden px-1.5 py-1 space-y-1">
      <div className="h-[50%] flex flex-col gap-1">
        <SidebarBodyApp appList={commonAppList} activeAppId={activeAppId} isExpanded={isExpanded} handleOnClickApp={handleOnClickApp} />
      </div>
      <div className={['h-0.5 bg-gray-300 rounded transition-all ease-linear', isExpanded ? 'w-52' : 'w-10'].join(' ')} />
      <div className="h-[50%] flex flex-col gap-1">
        {
          (userName !== defaultUserName || isAdmin !== 'true') ? (
            <></>
          ) : (
            <SidebarBodyApp appList={authAppList} activeAppId={activeAppId} isExpanded={isExpanded} handleOnClickApp={handleOnClickApp} />
          )
        }
      </div>
    </div>
  );
};

export default SidebarBody;