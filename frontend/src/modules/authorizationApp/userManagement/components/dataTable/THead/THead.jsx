import { BsCheck } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
import { TestData } from "../../../TestData";
import useMenuAction from "../useMenuAction";
import { THeadAttributeConstants } from "./THeadConstants";
import useDataTable from "../useDataTable";
import useUserManagementContext from "@modules/authorizationApp/userManagement/contexts/useUserManagementContext";

const THead = () => {
  const {
    userList,
    sortedList, setSortedList,
    pagedList, handleSetPagedList,
    selectedList, setSelectedList
  } = useUserManagementContext();

  const {
    handleSelectAllUser,
    onSort,
  } = useDataTable({
    userList,
    sortedList, setSortedList,
    pagedList, handleSetPagedList,
    selectedList, setSelectedList,
  });

  const {
    openId,
    toggle,
    registerRef,
    close,
  } = useMenuAction();

  return (
    <thead>
      <tr className="text-left bg-orange-200 text-[#1b9eaf] h-12">
        <th className="px-4 w-[5%]">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sortedList.length > 0 && selectedList.length === sortedList.length}
              onChange={handleSelectAllUser}
              className="absolute opacity-0 w-5 h-5 cursor-pointer"
            />
            <span
              className={`w-5 h-5 inline-flex items-center justify-center rounded border border-gray-400 
                ${sortedList.length > 0 && selectedList.length === sortedList.length ? "bg-[#1b9eaf] text-white" : ""}
              `}
            >
              {sortedList.length > 0 && selectedList.length === sortedList.length && <BsCheck />}
            </span>
          </label>
        </th>

        {THeadAttributeConstants.map(attr => (
          <th key={attr.id} className={`relative w-${attr.width}`}>
            <div className={`${attr.requiredSort ? "flex items-center gap-2" : ""}`} ref={registerRef(attr.id)}>
              {attr.label}
              {attr.requiredSort && (
                <button
                  type="button"
                  onClick={() => toggle(attr.id)}
                  className="cursor-pointer"
                >
                  <TbArrowsSort />
                </button>
              )}
              {attr.requiredSort && openId === attr.id && (
                <div className="absolute left-0 top-10 bg-white shadow-lg rounded-lg border w-34 z-50">
                  {attr.menu.map(menu => (
                    <button
                      key={menu.menuId}
                      type="button"
                      onClick={() => {
                        onSort(attr.attribute, menu.value);
                        close();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer
                                 font-normal ${menu.color || 'text-black'} flex gap-2 items-center`}
                    >
                      {menu.icon}
                      {menu.label}
                    </button>
                  ))}
                </div>
              )}

            </div>
          </th>
        ))}

        <th className="w-[10%]"></th>
      </tr>
    </thead>
  );
};

export default THead;