import { FaPlus } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { SiTicktick } from "react-icons/si";
import { CgRemoveR } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";

import PopUpCustom from "@components/PopUpCustom";
import usePopUp from "./hooks/usePopUp";
import useHeaderActions from "./hooks/useHeaderActions";
import { ACTIONS } from "./actionTypes";
import useButtonDisabled from "./hooks/useButtonDisabled";

import { useNavigate } from "react-router-dom";

const UserManagementHeader = () => {
  const navigate = useNavigate();

  // Handle button behavior
  const { isActivateDisabled, isDeactivateDisabled, isDeleteDisabled } = useButtonDisabled();

  // Handle popup behavior
  const { action, isOpen, open, close, title, description, button } = usePopUp();

  // Handle clicked action
  const { confirmAction, confirmPassword, setConfirmPassword, onSearch, onSubmit } = useHeaderActions({ action, closePopup: close });

  return (
    <>
      <div className="relative w-full flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold text-[#1b9eaf]">Authorized User</h2>
        <div className="relative flex gap-4 mt-3 sm:mt-0">
          <div className="relative">
            <form onSubmit={onSubmit}>
              <button type="submit">
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
            onClick={() => navigate('/auth-user/user-management/add-new-user')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium cursor-pointer flex items-center gap-2 h-10 px-4 rounded-lg transition"
          >
            <FaPlus className="text-sm" />
            <span>Add new user</span>
          </button>
        </div>
      </div>

      <div className="relative flex gap-4 justify-start items-center">
        <button type="button" name="activate" disabled={isActivateDisabled}
          onClick={() => open(ACTIONS.ACTIVATE)}
          className={`text-gray-500 border border-gray-400 font-medium flex items-center gap-2 h-10 px-4 rounded-lg transition-colors duration-200
                      ${isActivateDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-500 hover:bg-gray-300 hover:text-gray-500'
              : 'cursor-pointer text-green-600 hover:bg-green-600 hover:text-white'}`}
        >
          <SiTicktick className="text-sm" />
          <span>Activate</span>
        </button>
        <button type="button" name="deactivate" disabled={isDeactivateDisabled}
          onClick={() => open(ACTIONS.DEACTIVATE)}
          className={`text-gray-500 border border-gray-400 font-medium flex items-center gap-2 h-10 px-4 rounded-lg transition-colors duration-200
                      ${isDeactivateDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-500 hover:bg-gray-300 hover:text-gray-500'
              : 'cursor-pointer text-yellow-600 hover:bg-yellow-600 hover:text-white'}`}>
          <CgRemoveR className="text-sm" />
          <span>Deactivate</span>
        </button>
        <button type="button" name="delete" disabled={isDeleteDisabled}
          onClick={() => open(ACTIONS.DELETE)}
          className={`text-gray-500 border border-gray-400 font-medium flex items-center gap-2 h-10 px-4 rounded-lg transition-colors duration-200
                      ${isDeleteDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-500 hover:bg-gray-300 hover:text-gray-500'
              : 'cursor-pointer text-red-600 hover:bg-red-600 hover:text-white'}`}>
          <RiDeleteBinLine className="text-sm" />
          <span>Delete permanently</span>
        </button>
      </div>

      {isOpen && (
        <PopUpCustom isOpen={isOpen}
          title={title}
          description={description}
          onClose={close}
          inputs={[
            {
              label: 'Password',
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              type: 'password',
            },
          ]}
          buttons={[
            {
              label: "Cancel",
              bg: "#ff3a3a",
              textColor: "#fff",
              onClick: () => {
                setConfirmPassword('');
                close();
              },
            },
            {
              label: button.label,
              bg: "#16a34a",
              textColor: button.color,
              onClick: confirmAction,
            },
          ]}
        />
      )}
    </>
  );
};

export default UserManagementHeader;