import { useState } from "react";
import { ACTIONS } from "../actionTypes";

const usePopUp = () => {
  const [action, setAction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const open = act => {
    setAction(act);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const titles = {
    [ACTIONS.UPDATE]: "Update user information",
    [ACTIONS.DELETE]: "Delete user account",
    [ACTIONS.RESET_PASSWORD]: "Reset default password",
    [ACTIONS.ACTIVATE]: "Activate user",
    [ACTIONS.DEACTIVATE]: "Deactivate user",
  };

  const descriptions = {
    [ACTIONS.UPDATE]: "This will update user information. Please enter password to confirm changes.",
    [ACTIONS.DELETE]: "This will permanently delete the user. Please enter password to confirm changes.",
    [ACTIONS.RESET_PASSWORD]: "This will reset the password. Please enter password to confirm changes.",
    [ACTIONS.ACTIVATE]: "This will activate the account. Please enter password to confirm changes.",
    [ACTIONS.DEACTIVATE]: "This will deactivate the account. Please enter password to confirm changes.",
  };

  const buttons = {
    [ACTIONS.UPDATE]: { label: "Update", color: "text-green-500" },
    [ACTIONS.DELETE]: { label: "Delete", color: "text-red-500" },
    [ACTIONS.RESET_PASSWORD]: { label: "Reset Password", color: "text-indigo-800" },
    [ACTIONS.ACTIVATE]: { label: "Activate", color: "text-green-600" },
    [ACTIONS.DEACTIVATE]: { label: "Deactivate", color: "text-yellow-600" },
  };

  return {
    action,
    isOpen,
    open,
    close,

    title: titles[action],
    description: descriptions[action],
    button: buttons[action]
  };
};

export default usePopUp;