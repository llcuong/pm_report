import useConfirmChanges from "@hooks/useConfirmChanges";
import { ACTIONS } from "../actionTypes";

const useBodyActions = ({ action, closePopup }) => {
  const { confirmPassword, setConfirmPassword } = useConfirmChanges();

  const handleDelete = () => {
  };

  const handleSetStatus = () => {
  };

  const confirmAction = () => {
    const mapping = {
      [ACTIONS.DELETE]: () => handleDelete(),
      [ACTIONS.ACTIVATE]: () => handleSetStatus(),
      [ACTIONS.DEACTIVATE]: () => handleSetStatus(),
    };

    mapping[action]?.();
    setConfirmPassword('');
    closePopup();
  };

  return {
    confirmPassword,
    setConfirmPassword,
    confirmAction,
  };
};

export default useBodyActions;