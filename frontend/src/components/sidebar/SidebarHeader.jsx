import { IoMenuOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function SidebarHeader({ isExpanded }) {
  const { t } = useTranslation();

  return (
    <div className="h-12 w-full flex flex-col items-center justify-center">
      {
        isExpanded ? (
          <>
            <span className="p-2 text-xl font-medium">{t('sidebar.menu')}</span>
          </>
        ) : (
          <div className="p-2">
            <span className="text-3xl"><IoMenuOutline /></span>
          </div>
        )
      }
      <div className={['h-0.5 bg-gray-600 rounded transition-all ease-linear', isExpanded ? 'w-52' : 'w-10'].join(' ')} />
    </div>
  );
};
