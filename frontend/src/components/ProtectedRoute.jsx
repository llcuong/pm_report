import getCookie from "@utils/getCookie";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let session = '';
  useEffect(() => {
    session = getCookie('sessionid');
  }, []);

  if (!session) {
    console.log(session)
    return <Navigate to='/sign-in' replace />
  } else {
    return <Outlet />
  };
};

export default ProtectedRoute;