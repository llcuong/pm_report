import { ACTIVE_APP_ID } from "@components/AppIdWrapper";
import { useEffect, useState } from "react";

const useSelectedApp = () => {
  const [activeAppId, setActiveAppId] = useState(null);

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

  return {
    activeAppId, handleOnClickApp,
  };
};

export default useSelectedApp;