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
    [ACTIONS.ACTIVATE]: "Activate user",
    [ACTIONS.DEACTIVATE]: "Deactivate user",
    [ACTIONS.DELETE]: "Delete user account",
  };

  const descriptions = {
    [ACTIONS.ACTIVATE]: "This will activate the account. Please enter password to confirm changes.",
    [ACTIONS.DEACTIVATE]: "This will deactivate the account. Please enter password to confirm changes.",
    [ACTIONS.DELETE]: "This will permanently delete the user. Please enter password to confirm changes.",
  };

  const buttons = {
    [ACTIONS.ACTIVATE]: { label: "Activate", color: "text-green-600" },
    [ACTIONS.DEACTIVATE]: { label: "Deactivate", color: "text-yellow-600" },
    [ACTIONS.DELETE]: { label: "Delete", color: "text-red-500" },
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