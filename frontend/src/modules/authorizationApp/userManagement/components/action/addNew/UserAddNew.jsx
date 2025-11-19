import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import useUserAddNew from "./useUserAddNew";

const UserAddNew = () => {
  const {
    form,
    handleChange,
    showPassword,
    togglePassword,
    handleSubmit
  } = useUserAddNew();

  const requiredLabel = (text) => (
    <label className="font-medium">
      <span className="text-[#1b9eaf]">{text}</span> <span className="text-red-500">*</span>
    </label>
  );

  return (
    <div className="w-1/3 mt-5 h-220 mx-auto bg-white shadow-md p-6 rounded-xl flex flex-col">
      <div className="mb-6 flex gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1b9eaf]">Add New User</h2>
        <button type="button" name="add"
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium 
                     transition-colors duration-200 cursor-pointer hover:bg-green-800"
        >
          Add User
        </button>
      </div>

      <div className="h-0.5 bg-gray-400 mb-6" />

      <div>
        <h3 className="text-xl font-semibold text-[#1b9eaf] mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="flex flex-col gap-4">
            <div>
              {requiredLabel("Full Name")}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium text-[#1b9eaf]">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-medium text-[#1b9eaf]">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gray-400 mb-6" />

      <div>
        <h3 className="text-xl font-semibold text-[#1b9eaf] mb-6">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              {requiredLabel("Role")}
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
              >
                <option value="superuser">Superuser</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              {requiredLabel("Department")}
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
              >
                <option disabled value="">Select department</option>
                <option value="gd">Giang Dien</option>
                <option value="lt">Long Thanh</option>
                <option value="lk">Long Khanh</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              {requiredLabel("Account Status")}
              <select
                name="accountStatus"
                value={form.accountStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
              >
                <option value="active" className="text-green-600">Active</option>
                <option value="inactive" className="text-yellow-600">Inactive</option>
              </select>
            </div>
            <div className="relative">
              {requiredLabel("Default Password")}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                placeholder="Default Password"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg pr-10"
              />
              <button
                type="button"
                name="show password"
                className="absolute right-3 top-8 text-gray-500"
                onClick={togglePassword}
              >
                {showPassword ? <MdVisibility size={24} /> : <MdVisibilityOff size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddNew;