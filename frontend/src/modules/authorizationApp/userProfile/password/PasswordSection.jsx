import PopUpCustom from "@components/PopUpCustom";
import usePasswordSection from "./usePasswordSection";

const PasswordSection = () => {
  const {
    error,
    isShowPopUp, togglePopUp,
    passwords, isShowPassword,
    handlePasswordChange,
    handleShowPassword, handleUpdateNewPassword,
  } = usePasswordSection();

  return (
    <>
      <form onSubmit={handleUpdateNewPassword}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1b9eaf] mb-4">Password Section</h2>
          <button type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer border border-[#1b9eaf]
          hover:bg-[#aececf] hover:text-black transition duration-200">
            Change new password
          </button>
        </div>
        <div className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1b9eaf] mb-1">Current Password</label>
            <input
              name="current"
              type={`${isShowPassword ? 'text' : 'password'}`}
              value={passwords.current}
              onChange={(e) => handlePasswordChange(e)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              autoComplete="currentPassword"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b9eaf] mb-1">New Password</label>
            <input
              name="newPass"
              type="password"
              value={passwords.newPass}
              onChange={(e) => handlePasswordChange(e)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              autoComplete="currentPassword"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b9eaf] mb-1">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange(e)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              autoComplete="currentPassword"
            />
          </div>
        </div>
      </form>

      {
        isShowPopUp && (
          <div>
            <PopUpCustom isOpen={isShowPopUp}
              title='Change Password'
              description='This will change your password. Are you sure to secure your password ?'
              onClose={togglePopUp}
              buttons={[
                {
                  label: "Cancel",
                  bg: "#ff3a3a",
                  textColor: "#fff",
                  onClick: togglePopUp,
                },
                {
                  label: "Save",
                  bg: "#16a34a",
                  textColor: "#fff",
                  onClick: (e) => handleUpdateNewPassword(e),
                },
              ]}
            />
          </div>
        )
      }
    </>
  );
};

export default PasswordSection;