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
    [ACTIONS.UPDATE]: t('outlet.authUser.userManagement.popup.title.update'),
    [ACTIONS.DELETE]: t('outlet.authUser.userManagement.popup.title.delete'),
    [ACTIONS.RESET_PASSWORD]: t('outlet.authUser.userManagement.popup.title.resetDefaultPassword'),
    [ACTIONS.ACTIVATE]: t('outlet.authUser.userManagement.popup.title.activate'),
    [ACTIONS.DEACTIVATE]: t('outlet.authUser.userManagement.popup.title.deactivate'),
  };

  const descriptions = {
    [ACTIONS.UPDATE]: t('outlet.authUser.userManagement.popup.description.update'),
    [ACTIONS.DELETE]: t('outlet.authUser.userManagement.popup.description.delete'),
    [ACTIONS.RESET_PASSWORD]: t('outlet.authUser.userManagement.popup.description.resetDefaultPassword'),
    [ACTIONS.ACTIVATE]: t('outlet.authUser.userManagement.popup.description.activate'),
    [ACTIONS.DEACTIVATE]: t('outlet.authUser.userManagement.popup.description.deactivate'),
  };

  const buttons = {
    [ACTIONS.UPDATE]: { label: t('popup.buttons.update'), color: "#16a34a" },
    [ACTIONS.DELETE]: { label: t('popup.buttons.delete'), color: "#ef4444" },
    [ACTIONS.RESET_PASSWORD]: { label: t('popup.buttons.resetDefaultPassword'), color: "#3730a3" },
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