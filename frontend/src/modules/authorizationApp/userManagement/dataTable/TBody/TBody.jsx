import { BsCheck } from "react-icons/bs";
import { RxDotsVertical } from "react-icons/rx";
import { TestData } from "../../TestData";
import useDataTableContext from "../contexts/useDataTableContext";
import useMenuAction from "../hooks/useMenuAction";
import { useNavigate } from "react-router-dom";

const TBody = () => {
  const navigate = useNavigate();

  const { selectedUserIdList, handleSelectUser } = useDataTableContext();

  const {
    openId,
    toggle,
    registerRef,
  } = useMenuAction();

  const getStatusColor = (key) => key === "Active" ? "text-green-600" : "text-yellow-600";

  return (
    <tbody>
      {TestData.map(user => (
        <tr
          key={user.id}
          className="border-b hover:bg-orange-50 transition-colors duration-200 h-15"
        >
          <td className="px-4 w-[5%]">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedUserIdList.has(user.id)}
                onChange={() => handleSelectUser(user.id)}
                className="absolute opacity-0 w-5 h-5 cursor-pointer"
              />
              <span
                className={`w-5 h-5 inline-flex items-center justify-center rounded border border-gray-400 
                  ${selectedUserIdList.has(user.id)
                    ? "bg-[#1b9eaf] text-white"
                    : ""
                  } `}
              >
                {selectedUserIdList.has(user.id) && <BsCheck />}
              </span>
            </label>
          </td>
          <td className="w-[10%]">{user.id}</td>
          <td className="w-[20%]">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="rounded-full w-10 h-10 object-fill border"
              />
              {user.fullName}
            </div>
          </td>
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
                    onClick={() => navigate(`/auth-user/user-management/user?id=${user.id}`)}
                    className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg'
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button type="button"
                    onClick={() => navigate(`/auth-user/user-management/user?id=${user.id}`)}
                    className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;