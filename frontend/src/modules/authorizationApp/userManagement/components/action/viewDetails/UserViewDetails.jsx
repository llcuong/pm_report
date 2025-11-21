import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine, RiLockPasswordLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { CgRemoveR } from "react-icons/cg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import PopUpCustom from "@components/PopUpCustom";

import useUserForm from "./hooks/useUserForm";
import usePopUp from "./hooks/usePopUp";
import useUserActions from "./hooks/useUserActions";

import { ACTIONS } from "./actionTypes";
import { useTranslation } from "react-i18next";

const UserViewDetails = () => {
  // Handle form behavior
  const { form, handleChange, isEditMode, setIsEditMode, resetForm } = useUserForm();

  // Handle popup behavior
  const { action, isOpen, open, close, title, description, button } = usePopUp();

  // Handle clicked action
  const { confirmAction, confirmPassword, setConfirmPassword } = useUserActions({ form, action, closePopup: close });

  const { t } = useTranslation();

  return (
    <div className="w-1/2 mt-5 h-220 mx-auto bg-white shadow-md p-6 rounded-xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.viewDetails')}</h2>
        <div className="flex gap-4">
          {isEditMode ? (
            <>
              <button
                type="button"
                onClick={() => open(ACTIONS.UPDATE)}
                className="py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-800 transition-colors duration-200 cursor-pointer"
              >
                {t('outlet.authUser.userManagement.view.update')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                }}
                className="py-2 px-4 rounded-lg text-white bg-gray-400 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
              >
                {t('outlet.authUser.userManagement.view.cancel')}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="flex gap-2 items-center py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-800 transition-colors duration-200 cursor-pointer"
            >
              <FiEdit />
              {t('outlet.authUser.userManagement.view.edit')}
            </button>
          )}
          <button
            type="button"
            onClick={() => open(ACTIONS.DELETE)}
            className="flex gap-2 items-center py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-800 transition-colors duration-200 cursor-pointer"
          >
            <RiDeleteBinLine />
            {t('outlet.authUser.userManagement.header.delete')}
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-end mb-6">
        <button
          type="button"
          onClick={() => open(ACTIONS.RESET_PASSWORD)}
          className="py-2 px-4 border rounded-lg flex gap-2 items-center text-indigo-800 hover:bg-indigo-800 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <RiLockPasswordLine />
          {t('outlet.authUser.userManagement.view.setDefaultPassword')}
        </button>
        <button
          type="button"
          onClick={() =>
            open(form.accountStatus === "active" ? ACTIONS.DEACTIVATE : ACTIONS.ACTIVATE)
          }
          className={`py-2 px-4 border rounded-lg flex gap-2 items-center transition-colors duration-200 cursor-pointer
            ${form.accountStatus === "active"
              ? "text-yellow-600 hover:bg-yellow-600 hover:text-white"
              : "text-green-600 hover:bg-green-600 hover:text-white"
            }`}
        >
          {form.accountStatus === "active" ? <CgRemoveR /> : <SiTicktick />}
          {t(`outlet.authUser.userManagement.header.${form.accountStatus === "active" ? "deactivate" : "activate"}`)}
        </button>
      </div>

      <div className="h-0.5 bg-gray-400 mb-6" />

      <h3 className="text-xl font-semibold text-[#1b9eaf] mb-6">{t('outlet.authUser.userManagement.add.personalInformation')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.userId')}</label>
            <input
              disabled
              value={form.id}
              onChange={handleChange}
              name="id"
              className="w-full p-2 border bg-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.fullName')}</label>
            <input
              disabled={!isEditMode}
              value={form.fullName}
              name="fullName"
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.email')}</label>
            <input
              disabled={!isEditMode}
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            />
          </div>
          <div>
            <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.phoneNumber')}</label>
            <input
              disabled={!isEditMode}
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            />
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gray-400 mb-6" />

      <h3 className="text-xl font-semibold text-[#1b9eaf] mb-6">{t('outlet.authUser.userManagement.add.accountInformation')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.role')}</label>
            <select
              disabled={!isEditMode}
              name="role"
              value={form.role}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            >
              <option value="supervisor">{t('outlet.authUser.userManagement.body.supervisor')}</option>
              <option value="admin">{t('outlet.authUser.userManagement.body.admin')}</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.factory')}</label>
            <select
              disabled={!isEditMode}
              name="department"
              value={form.factory}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            >
              <option disabled value="">
                {t('outlet.authUser.userManagement.add.selectFactory')}
              </option>
              <option value="gd">Giang Dien</option>
              <option value="lt">Long Thanh</option>
              <option value="lk">Long Khanh</option>
              <option value="all">{t('outlet.authUser.userManagement.add.all')}</option>
            </select>
          </div>
        </div>
        <div>
          <label className="font-medium text-[#1b9eaf]">{t('outlet.authUser.userManagement.body.status')}</label>
          <input
            disabled
            value={form.accountStatus}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg bg-gray-300 ${form.accountStatus === "active"
              ? "text-green-600 border-black"
              : "text-yellow-600 border-black"
              }`}
          />
        </div>
      </div>

      {isOpen && (
        <PopUpCustom isOpen={isOpen} onClose={close}
          title={title}
          description={description}
          inputs={[
            {
              label: t('signIn.password'),
              type: "password",
              value: confirmPassword,
              onChange: e => setConfirmPassword(e.target.value),
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
              onClick: () => {
                confirmAction();
                setConfirmPassword('');
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default UserViewDetails;