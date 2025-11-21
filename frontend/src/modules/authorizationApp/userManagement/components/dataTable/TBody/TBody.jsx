import { BsCheck } from "react-icons/bs";
import { RxDotsVertical } from "react-icons/rx";

import { useNavigate } from "react-router-dom";

import { TestData } from "@modules/authorizationApp/userManagement/TestData";
import useMenuAction from "../useMenuAction";
import useUserManagementContext from "@modules/authorizationApp/userManagement/contexts/useUserManagementContext";
import useDataTable from "../useDataTable";
import PopUpCustom from "@components/PopUpCustom";
import { ACTIONS } from "./actionTypes";
import useBodyActions from "./hooks/useBodyActions";
import usePopUp from "./hooks/usePopUp";

const TBody = () => {
  const navigate = useNavigate();

  // Get user list
  const { userList, sortedList, setSortedList, pagedList, selectedList, setSelectedList } = useUserManagementContext();

  // Handle select single
  const { handleSelectUser } = useDataTable({ userList, sortedList, setSortedList, selectedList, setSelectedList });

  // Handle dropdown actions
  const { openId, toggle, registerRef } = useMenuAction();

  // Handle popup behavior
  const { action, isOpen, open, close, title, description, button } = usePopUp();

  // Handle clicked action
  const { confirmAction, confirmPassword, setConfirmPassword } = useBodyActions({ action, closePopup: close });

  const getStatusColor = (key) => key === "Active" ? "text-green-600" : "text-yellow-600";

  return (
    <tbody>
      {pagedList && pagedList.length > 0 ? pagedList.map(user => (
        <tr key={user.id}
          className="border-b hover:bg-orange-50 transition-colors duration-200 h-15">
          <td className="px-4 w-[5%]">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedList.some(selectedUser => selectedUser.id === user.id)}
                onChange={() => handleSelectUser(user.id)}
                className="absolute opacity-0 w-5 h-5 cursor-pointer"
              />
              <span
                className={`w-5 h-5 inline-flex items-center justify-center rounded border border-gray-400 
                  ${selectedList.some(selectedUser => selectedUser.id === user.id)
                    ? "bg-[#1b9eaf] text-white"
                    : ""
                  } `}
              >
                {selectedList.some(selectedUser => selectedUser.id === user.id) && <BsCheck />}
              </span>
            </label>
          </td>
          <td className="w-[10%]">{user.id}</td>
          <td className="w-[20%]">{user.fullName}</td>
          <td className="w-[10%]">{user.role}</td>
          <td className="w-[20%]">{user.email}</td>
          <td className="w-[20%]">{user.department}</td>
          <td className={`w-[5%] ${getStatusColor(user.accountStatus)}`}>
            {user.accountStatus}
          </td>
          <td className="relative w-[10%]">
            <div className="inline-block relative" ref={registerRef(user.id)}>
              <button
                type="button"
                onClick={() => toggle(user.id)}
                className="rounded-full cursor-pointer p-2 hover:bg-orange-100"
              >
                <RxDotsVertical />
              </button>

              {openId === user.id && (
                <div className="absolute left-8 top-2 bg-white shadow-lg rounded-lg border w-28 z-10">
                  <button type="button"
                    onClick={() => navigate(`/auth-user/user-management/user?id=${user.id}`)}
                    className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg'
                  >
                    View details
                  </button>
                  <button type="button"
                    onClick={() => {
                      setSelectedList(pagedList.filter(item => item.id === user.id));
                      user.accountStatus === 'Active' ? open(ACTIONS.DEACTIVATE) : open(ACTIONS.ACTIVATE);
                    }}
                    className={`block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg
                                ${user.accountStatus === 'Active' ? 'text-yellow-600' : 'text-green-600'}`}
                  >
                    {user.accountStatus === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button type="button"
                    onClick={() => {
                      setSelectedList(pagedList.filter(item => item.id === user.id));
                      open(ACTIONS.DELETE)
                    }}
                    className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600'
                  >
                    Delete
                  </button>

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
                          label: 'Cancel',
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
                </div>
              )}
            </div>
          </td>
        </tr>
      )) : (
        <tr>
          <td colSpan={8} className="text-center py-4 text-gray-500">
            No data
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TBody;