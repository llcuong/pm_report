import { useState } from "react";
import { ACTIONS } from "../actionTypes";
import { useTranslation } from "react-i18next";

const usePopUp = () => {
  const [action, setAction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const open = act => {
    setAction(act);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const titles = {
    [ACTIONS.DELETE]: t('outlet.authUser.userManagement.popup.title.delete'),
    [ACTIONS.ACTIVATE]: t('outlet.authUser.userManagement.popup.title.activate'),
    [ACTIONS.DEACTIVATE]: t('outlet.authUser.userManagement.popup.title.deactivate'),
  };

  const descriptions = {
    [ACTIONS.DELETE]: t('outlet.authUser.userManagement.popup.description.delete'),
    [ACTIONS.ACTIVATE]: t('outlet.authUser.userManagement.popup.description.activate'),
    [ACTIONS.DEACTIVATE]: t('outlet.authUser.userManagement.popup.description.deactivate'),
  };

  const buttons = {
    [ACTIONS.DELETE]: { label: t('popup.buttons.delete'), color: "#ef4444" },
    [ACTIONS.ACTIVATE]: { label: t('popup.buttons.activate'), color: "#16a34a" },
    [ACTIONS.DEACTIVATE]: { label: t('popup.buttons.deactivate'), color: "#ca8a04" },
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