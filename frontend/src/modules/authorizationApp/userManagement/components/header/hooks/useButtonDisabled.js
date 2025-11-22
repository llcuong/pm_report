import useUserManagementContext from "@modules/authorizationApp/userManagement/contexts/useUserManagementContext";

const useButtonDisabled = () => {
  const { selectedList } = useUserManagementContext();

  // Button Activate
  const isActivateDisabled =
    selectedList.length === 0 ||
    selectedList.some(user => user.accountStatus === 'active');

  // Button Deactivate
  const isDeactivateDisabled =
    selectedList.length === 0 ||
    selectedList.some(user => user.accountStatus !== 'active');

  // Button Delete
  const isDeleteDisabled = selectedList.length === 0;

  return {
    isActivateDisabled,
    isDeactivateDisabled,
    isDeleteDisabled,
  }
};

export default useButtonDisabled;