import MenuIcon from "@assets/icons/menu-icon";

export default function SidebarHeader({ isExpanded }) {
  return (
    <div className="h-12 w-full flex flex-col items-center justify-center">
      {
        isExpanded ? (
          <>
            <span className="p-2 text-xl font-medium">Menu</span>
          </>
        ) : (
          <div className="p-2">
            <MenuIcon />
          </div>
        )
      }
      <div className={['h-0.5 bg-gray-400 rounded transition-all ease-linear', isExpanded ? 'w-52' : 'w-10'].join(' ')} />
    </div>
  );
};
