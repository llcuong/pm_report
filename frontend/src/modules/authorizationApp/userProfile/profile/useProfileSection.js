import { useState } from "react";

const useProfileSection = () => {
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    id: "18914",
    role: 'Admin',
    isActive: true,

    name: "Ha Vu",
    email: "onedvu315itech@gmail.com",
    phone: "0123456789",

    factory: 'Kim Bao Son Giang Dien',
    ward: 'Giang Dien',
    province: 'Dong Nai',
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Check credentials by regular expression
  const isLettersOnly = (str) => /^[A-Za-zÀ-ỹ\s]+$/.test(str);
  const isDigitsOnly = (str) => /^\d+$/.test(str);
  const isLettersDigits = (str) => /^[A-Za-z0-9À-ỹ\s]+$/.test(str);
  const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

  // Validate profile data
  const checkProfileCredentials = () => {
    // Name contains letters only
    if (!isLettersOnly(profile.name)) {
      setError("Name must contain only letters!");
      return false;
    }

    // Email matches ...@...
    if (!isValidEmail(profile.email)) {
      setError("Invalid email format!");
      return false;
    }

    // Phone contains digits only
    if (!isDigitsOnly(profile.phone)) {
      setError("Phone number must contain only digits!");
      return false;
    }

    // Factory contains letters and digits only
    if (!isLettersDigits(profile.factory)) {
      setError("Factory must contain only letters and digits!");
      return false;
    }

    // Ward contains letters and digits only
    if (!isLettersDigits(profile.ward)) {
      setError("Ward must contain only letters and digits!");
      return false;
    }

    // Province contains letters and digits only
    if (!isLettersDigits(profile.province)) {
      setError("Province must contain only letters and digits!");
      return false;
    }

    setError("");
    return true;
  };

  // Handle submit profile
  const handleUpdateNewProfile = (e) => {
    e.preventDefault();
    setIsShowPopUp(true);

    if (!checkProfileCredentials()) return;

    console.log("UPDATED PROFILE:", profile);
  };

  const togglePopUp = () => setIsShowPopUp(!isShowPopUp);

  return {
    error,
    isShowPopUp, togglePopUp,
    profile, handleProfileChange, handleUpdateNewProfile,
  };
};

export default useProfileSection;