import { ACTIVE_APP_ID } from "@components/AppIdWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSignOut = ({ onSignOutSuccess }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const defaultUserName = 'admin172185521517500';
  let userName = localStorage.getItem('user_name') || '';
  let isAdmin = localStorage.getItem('is_admin') || '';

  const handleSignOut = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('is_admin');
    sessionStorage.setItem(ACTIVE_APP_ID, 1);
    toast.success(t('toastify.success.signOutSuccessfully'));
    onSignOutSuccess?.();
    navigate('/');
  };

  return {
    defaultUserName, userName, isAdmin,
    handleSignOut,
  }
};

export default useSignOut;