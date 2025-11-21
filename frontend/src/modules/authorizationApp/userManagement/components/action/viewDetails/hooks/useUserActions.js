import { useSearchParams } from "react-router-dom";
import { ACTIONS } from "../actionTypes";
import useConfirmChanges from "@hooks/useConfirmChanges";

const useUserActions = ({ form, action, closePopup }) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');

  const { confirmPassword, setConfirmPassword } = useConfirmChanges();

  const handleUpdate = () => {
    console.log(form);
  };

  const handleDelete = () => {
  };

  const handleResetPassword = () => {
  };

  const handleSetStatus = () => {
  };

  const confirmAction = () => {
    const mapping = {
      [ACTIONS.UPDATE]: () => handleUpdate(),
      [ACTIONS.DELETE]: () => handleDelete(),
      [ACTIONS.RESET_PASSWORD]: () => handleResetPassword(),
      [ACTIONS.ACTIVATE]: () => handleSetStatus(),
      [ACTIONS.DEACTIVATE]: () => handleSetStatus(),
    };

    mapping[action]?.();
    closePopup();
  };

  return {
    confirmPassword,
    setConfirmPassword,
    confirmAction,
  };
};

export default useUserActions;