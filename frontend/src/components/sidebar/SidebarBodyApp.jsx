import { useTranslation } from "react-i18next";

// Declare data type of props
/**
 * @typedef {Object} App
 * @property {string|number} id
 * @property {string} name
 * @property {string} link
 * @property {React.ReactNode} icon
 */

/**
 * Sidebar body component
 * 
 * @param {Object} props
 * @param {App[]} props.appList
 * @param {string|number} props.activeAppId
 * @param {boolean} props.isExpanded
 * @param {(id: string|number) => void} props.handleOnClickApp
 */

const SidebarBodyApp = ({ appList, activeAppId, isActive, isExpanded, handleOnClickApp }) => {
  const { t } = useTranslation();

  return (
    <>
      {appList.map(app => {
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
                  ? `bg-[#024A54] text-white`
                  : "hover:bg-[#87c3c3] hover:text-white",
              ].join(" ")}
            >
              <div className="flex justify-center items-center w-10 h-10 text-xl">
                {app.icon}
              </div>

              {isExpanded && (
                <span className="ml-2 font-medium truncate">{t(`sidebar.${app.name}`)}</span>
              )}
            </a>
          </div>
        );
      })}
    </>
  );
};

export default SidebarBodyApp;