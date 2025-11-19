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

const UserViewDetails = () => {
  // Handle form behavior
  const { form, handleChange, isEditMode, setIsEditMode, resetForm } = useUserForm();

  // Handle popup behavior
  const { action, isOpen, open, close, title, description, button } = usePopUp();

  // Handle clicked action
  const { confirmAction, confirmPassword, setConfirmPassword } = useUserActions({ form, action, closePopup: close });

  return (
    <div className="w-1/2 mt-5 h-220 mx-auto bg-white shadow-md p-6 rounded-xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1b9eaf]">View Details</h2>
        <div className="flex gap-4">
          {isEditMode ? (
            <>
              <button
                type="button"
                onClick={() => open(ACTIONS.UPDATE)}
                className="py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-800"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                }}
                className="py-2 px-4 rounded-lg text-white bg-gray-400 hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="flex gap-2 items-center py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-800"
            >
              <FiEdit />
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={() => open(ACTIONS.DELETE)}
            className="flex gap-2 items-center py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-800"
          >
            <RiDeleteBinLine />
            Delete
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-end mb-6">
        <button
          type="button"
          onClick={() => open(ACTIONS.RESET_PASSWORD)}
          className="py-2 px-4 border rounded-lg flex gap-2 items-center text-indigo-800 hover:bg-indigo-800 hover:text-white"
        >
          <RiLockPasswordLine />
          Set default password
        </button>
        <button
          type="button"
          onClick={() =>
            open(form.accountStatus === "Active" ? ACTIONS.DEACTIVATE : ACTIONS.ACTIVATE)
          }
          className={`py-2 px-4 border rounded-lg flex gap-2 items-center 
            ${form.accountStatus === "Active"
              ? "text-yellow-600 hover:bg-yellow-600 hover:text-white"
              : "text-green-600 hover:bg-green-600 hover:text-white"
            }`}
        >
          {form.accountStatus === "Active" ? <CgRemoveR /> : <SiTicktick />}
          {form.accountStatus === "Active" ? "Deactivate" : "Activate"}
        </button>
      </div>

      <div className="h-0.5 bg-gray-400 mb-6" />

      <h3 className="text-xl font-semibold text-[#1b9eaf] mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium text-[#1b9eaf]">User ID</label>
            <input
              disabled
              value={form.id}
              onChange={handleChange}
              name="id"
              className="w-full p-2 border bg-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-[#1b9eaf]">Full Name</label>
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
            <label className="font-medium text-[#1b9eaf]">Email</label>
            <input
              disabled={!isEditMode}
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            />
          </div>
          <div>
            <label className="font-medium text-[#1b9eaf]">Phone Number</label>
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

      <h3 className="text-xl font-semibold text-[#1b9eaf] mb-6">Account Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium text-[#1b9eaf]">Role</label>
            <select
              disabled={!isEditMode}
              name="role"
              value={form.role}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            >
              <option value="superuser">Superuser</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-[#1b9eaf]">Department</label>
            <select
              disabled={!isEditMode}
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${!isEditMode && "bg-gray-300"}`}
            >
              <option disabled value="">
                Select department
              </option>
              <option value="gd">Giang Dien</option>
              <option value="lt">Long Thanh</option>
              <option value="lk">Long Khanh</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <div>
          <label className="font-medium text-[#1b9eaf]">Account Status</label>
          <input
            disabled
            value={form.accountStatus}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg bg-gray-300 ${form.accountStatus === "Active"
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
              label: "Password",
              type: "password",
              value: confirmPassword,
              onChange: e => setConfirmPassword(e.target.value),
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