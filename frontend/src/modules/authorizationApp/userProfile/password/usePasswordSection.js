import { useState } from "react";

const usePasswordSection = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "currentPassword",
    newPass: "",
    confirm: "",
  });

  const [error, setError] = useState('');

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const togglePopUp = () => setIsShowPopUp(!isShowPopUp);

  // Validate password
  const checkPasswordCredentials = () => {
    if (!passwords.newPass || !passwords.current) {
      setError("Password fields cannot be empty!");
      return false;
    };

    if (passwords.current === passwords.newPass) {
      setError("New password cannot be the same as current password!");
      return false;
    };

    if (passwords.newPass !== passwords.confirm) {
      setError("Confirm password does not match!");
      return false;
    };

    setError("");
    return true;
  };

  // Handle submit password
  const handleUpdateNewPassword = (e) => {
    e.preventDefault();

    // BUG FIX: must CALL the function
    if (!checkPasswordCredentials()) return;

    // API call...
    console.log("UPDATED PASSWORD:", passwords);
  };

  return {
    error,
    isShowPopUp, togglePopUp,
    passwords, isShowPassword, handleShowPassword, handleUpdateNewPassword,
  };
};

export default usePasswordSection;