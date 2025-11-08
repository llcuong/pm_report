import PinholeIcon from "@assets/icons/pinhole-icon";
import { PM_GROUP_MAIN_COLOR } from "@constants/Color";
import { useState, useEffect } from "react";

const ACTIVE_APP_ID = "__active_app_id__";

const appList = [
  {
    id: 1,
    name: "Pinhole Report",
    icon: <PinholeIcon />,
    link: "pinhole-report",
  },
];

const SidebarBody = ({ isExpanded }) => {
  const [activeAppId, setActiveAppId] = useState(null);

  useEffect(() => {
    let storedAppId = Number(localStorage.getItem(ACTIVE_APP_ID));
    if (storedAppId) {
      setActiveAppId(storedAppId);
    } else {
      // Set default app
      localStorage.setItem(ACTIVE_APP_ID, 1);
      setActiveAppId(1);
    };
  }, []);

  const handleOnClickApp = (appId) => {
    localStorage.setItem(ACTIVE_APP_ID, appId);
    setActiveAppId(appId);
  };

  return (
    <div className="w-full flex-1 min-h-0 overflow-hidden px-1.5 py-1 space-y-1">
      {appList.map((app) => {
        let isActive = activeAppId === app.id;

        return (
          <div
            key={app.id}
            onClick={() => handleOnClickApp(app.id)}
            className="flex items-center w-full h-12 rounded-lg cursor-pointer"
          >
            <a
              href={`/${app.link}`}
              className={[
                "flex items-center w-full h-full pl-1 rounded-lg transition-colors duration-200",
                isActive
                  ? `bg-[${PM_GROUP_MAIN_COLOR}] text-white`
                  : "hover:bg-[#87c3c3] hover:text-white",
              ].join(" ")}
            >
              <div className="flex justify-center items-center w-10 h-10 text-xl">
                {app.icon}
              </div>

              {isExpanded && (
                <span className="ml-2 font-medium truncate">{app.name}</span>
              )}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarBody;