import SignInIcon from "@assets/icons/sign-in-icon";

export default function SidebarFooter({ isExpanded }) {
  return (
    <div className="h-12 w-full flex flex-col items-center justify-center">
      <div className={['h-0.5 bg-gray-400 rounded transition-all ease-linear mb-1', isExpanded ? 'w-52' : 'w-10'].join(' ')} />
      <div className="flex items-center w-full h-full px-2 rounded-lg">
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
      </div>
    </div>
  );
}
