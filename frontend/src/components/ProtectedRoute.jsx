import DashboardLayout from "@layouts/MainLayout";
import getCookie from "@utils/getCookie";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Hard code to check security
  const defaultUserName = 'admin172185521517500';
  let userName = localStorage.getItem('user_name') || '';
  let isAdmin = localStorage.getItem('is_admin') || '';

  if (userName === defaultUserName || isAdmin === 'true') {
    return <DashboardLayout />
  } else {
    return <Navigate to='/sign-in' replace />
  };
};

export default ProtectedRoute;