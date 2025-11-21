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
import { useTranslation } from "react-i18next";

const UserManagementHeader = () => {
  const navigate = useNavigate();

  // Handle button behavior
  const { isActivateDisabled, isDeactivateDisabled, isDeleteDisabled } = useButtonDisabled();

  // Handle popup behavior
  const { action, isOpen, open, close, title, description, button } = usePopUp();

  // Handle clicked action
  const { confirmAction, confirmPassword, setConfirmPassword, onSearch, onSubmit } = useHeaderActions({ action, closePopup: close });

  const { t } = useTranslation();

  return (
    <>
      <div className="relative w-full flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold text-[#1b9eaf]">{t('outlet.authUser.userManagement.header.authorizedUser')}</h2>
        <div className="relative flex gap-4 mt-3 sm:mt-0">
          <div className="relative">
            <form onSubmit={onSubmit}>
              <button type="submit">
                <GoSearch className="absolute top-5 -translate-y-1/2 left-3 text-gray-500 cursor-pointer" />
              </button>
              <input
                type="text"
                name="search"
                placeholder={t('outlet.authUser.userManagement.header.searchPlaceholder')}
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
            <span>{t('outlet.authUser.userManagement.header.addNewUser')}</span>
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
          <span>{t('outlet.authUser.userManagement.header.activate')}</span>
        </button>
        <button type="button" name="deactivate" disabled={isDeactivateDisabled}
          onClick={() => open(ACTIONS.DEACTIVATE)}
          className={`text-gray-500 border border-gray-400 font-medium flex items-center gap-2 h-10 px-4 rounded-lg transition-colors duration-200
                      ${isDeactivateDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-500 hover:bg-gray-300 hover:text-gray-500'
              : 'cursor-pointer text-yellow-600 hover:bg-yellow-600 hover:text-white'}`}>
          <CgRemoveR className="text-sm" />
          <span>{t('outlet.authUser.userManagement.header.deactivate')}</span>
        </button>
        <button type="button" name="delete" disabled={isDeleteDisabled}
          onClick={() => open(ACTIONS.DELETE)}
          className={`text-gray-500 border border-gray-400 font-medium flex items-center gap-2 h-10 px-4 rounded-lg transition-colors duration-200
                      ${isDeleteDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-500 hover:bg-gray-300 hover:text-gray-500'
              : 'cursor-pointer text-red-600 hover:bg-red-600 hover:text-white'}`}>
          <RiDeleteBinLine className="text-sm" />
          <span>{t('outlet.authUser.userManagement.header.delete')}</span>
        </button>
      </div>

      {isOpen && (
        <PopUpCustom isOpen={isOpen}
          title={title}
          description={description}
          onClose={close}
          inputs={[
            {
              label: t('signIn.password'),
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              type: 'password',
            },
          ]}
          buttons={[
            {
              label: t('outlet.authUser.userManagement.view.cancel'),
              bg: "#4b5563",
              textColor: "#fff",
              onClick: () => {
                setConfirmPassword('');
                close();
              },
            },
            {
              label: button.label,
              bg: button.color,
              textColor: "#fff",
              onClick: confirmAction,
            },
          ]}
        />
      )}
    </>
  );
};

export default UserManagementHeader;