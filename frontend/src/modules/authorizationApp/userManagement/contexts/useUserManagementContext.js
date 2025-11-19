import { useContext } from "react";
import { UserManagementContext } from "./UserManagementContext";

const useUserManagementContext = () => {
  const context = useContext(UserManagementContext);

  if (!context)
    throw new Error('useUserManagementContext must be used in UserManagementProvider!');

  return context;
};

export default useUserManagementContext;