import { FaPlus } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { SiTicktick } from "react-icons/si";
import { CgRemoveR } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";

const UserManagementHeader = ({ onSearch, onSubmit, onAdd, onActivate, onDeactivate, onDelete }) => {
  return (
    <>
      <div className="relative w-full flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold text-[#1b9eaf]">Authorized User</h2>
        <div className="relative flex gap-4 mt-3 sm:mt-0">
          <div className="relative">
            <form onSubmit={onSubmit}>
              <button type="submit" name="search">
                <GoSearch className="absolute top-5 -translate-y-1/2 left-3 text-gray-500 cursor-pointer" />
              </button>
              <input
                type="text"
                name="search"
                placeholder="Search user by id or name..."
                onChange={(e) => onSearch(e.target.value)}
                className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 h-10 w-80 focus:ring-1 focus:ring-[#1b9eaf] focus:outline-none"
              />
            </form>

          </div>

          <button type="button" name="add"
            onClick={onAdd}
            className="bg-green-500 hover:bg-green-600 text-white font-medium cursor-pointer flex items-center gap-2 h-10 px-4 rounded-lg transition"
          >
            <FaPlus className="text-sm" />
            <span>Add new user</span>
          </button>
        </div>
      </div>

      <div className="relative flex gap-4 justify-start items-center">
        <button type="button" name="activate"
          onClick={onActivate}
          className="text-green-600 border border-gray-400 font-medium cursor-pointer flex items-center gap-2 h-10 px-4 rounded-lg 
                     transition-colors duration-200 hover:bg-green-600 hover:text-white">
          <SiTicktick className="text-sm" />
          <span>Activate</span>
        </button>
        <button type="button" name="deactivate"
          onClick={onDeactivate}
          className="text-yellow-600 border border-gray-400 font-medium cursor-pointer flex items-center gap-2 h-10 px-4 rounded-lg 
                     transition-colors duration-200 hover:bg-yellow-600 hover:text-white">
          <CgRemoveR className="text-sm" />
          <span>Deactivate</span>
        </button>
        <button type="button" name="delete"
          onClick={onDelete}
          className="text-red-600 border border-gray-400 font-medium cursor-pointer flex items-center gap-2 h-10 px-4 rounded-lg 
                     transition-colors duration-200 hover:bg-red-600 hover:text-white">
          <RiDeleteBinLine className="text-sm" />
          <span>Delete permanently</span>
        </button>
      </div>
    </>
  );
};

export default UserManagementHeader;