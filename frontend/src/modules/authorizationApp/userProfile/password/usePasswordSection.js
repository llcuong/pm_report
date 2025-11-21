import { useState } from "react";

const usePasswordSection = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle submit password
  const handleUpdateNewPassword = (e) => {
    e.preventDefault();
    if (!checkPasswordCredentials()) return;
    setIsShowPopUp(true);

    // API call...
    console.log("UPDATED PASSWORD:", passwords);
  };

  return {
    error,
    isShowPopUp, togglePopUp,
    passwords, isShowPassword,
    handlePasswordChange,
    handleShowPassword, handleUpdateNewPassword,
  };
};

export default usePasswordSection;