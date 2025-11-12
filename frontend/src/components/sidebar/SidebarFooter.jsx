import SignInIcon from "@assets/icons/sign-in-icon";
import SignOutIcon from "@assets/icons/sign-out-icon";
import { ACTIVE_APP_ID } from "@components/AppIdWrapper";
import { useNavigate } from "react-router-dom";

export default function SidebarFooter({ isExpanded }) {
  const navigate = useNavigate();

  const defaultUserName = 'admin172185521517500';
  let userName = localStorage.getItem('user_name') || '';
  let isAdmin = localStorage.getItem('is_admin') || '';

  const signOut = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('is_admin');
    sessionStorage.setItem(ACTIVE_APP_ID, 1);
    navigate('/');
  };

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
                  Sign In
                </span>
              )}
            </a>
          ) : (
            <button
              className="flex items-center w-full h-full rounded-lg text-center cursor-pointer
                     transition-colors duration-200 hover:bg-[#87c3c3] hover:text-white"
              onClick={signOut}
            >
              <div className="flex justify-center items-center w-10 h-10 text-xl">
                <SignOutIcon />
              </div>

              {isExpanded && (
                <span className="ml-2 font-medium truncate">
                  Sign Out
                </span>
              )}
            </button>
          )
        }
      </div>
    </div>
  );

}
