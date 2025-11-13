import SignInIcon from "@assets/icons/sign-in-icon";
import SignOutIcon from "@assets/icons/sign-out-icon";
import { ACTIVE_APP_ID } from "@components/AppIdWrapper";
import useSignOut from "@hooks/useSignOut";
import { useTranslation } from "react-i18next";

export default function SidebarFooter({ isExpanded, onSignOutSuccess }) {
  const { t } = useTranslation();

  const {
    defaultUserName, userName, isAdmin,
    handleSignOut,
  } = useSignOut({ onSignOutSuccess });

  return (
    <div className="h-12 w-full flex flex-col items-center justify-center">
      <div className={['h-0.5 bg-gray-600 rounded transition-all ease-linear mb-1', isExpanded ? 'w-52' : 'w-10'].join(' ')} />
      <div className="flex items-center w-full h-full px-2 rounded-lg">
        {
          (userName !== defaultUserName || isAdmin !== 'true') ? (
            <a
              href='/sign-in'
              className="flex items-center w-full h-full rounded-lg text-center 
                     transition-colors duration-200 hover:bg-[#87c3c3] hover:text-white"
            >
              <div className="flex justify-center items-center w-10 h-10 text-xl">
                <SignInIcon />
              </div>

              {isExpanded && (
                <span className="ml-2 font-medium truncate">
                  {t('sidebar.signIn')}
                </span>
              )}
            </a>
          ) : (
            <button
              className="flex items-center w-full h-full rounded-lg text-center cursor-pointer
                     transition-colors duration-200 hover:bg-[#87c3c3] hover:text-white"
              onClick={handleSignOut}
            >
              <div className="flex justify-center items-center w-10 h-10 text-xl">
                <SignOutIcon />
              </div>

              {isExpanded && (
                <span className="ml-2 font-medium truncate">
                  {t('sidebar.signOut')}
                </span>
              )}
            </button>
          )
        }
      </div>
    </div>
  );

}
