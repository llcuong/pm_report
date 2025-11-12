import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ACTIVE_APP_ID = "__active_app_id__";

const AppIdWrapper = ({ value, children }) => {
  useEffect(() => {
    sessionStorage.setItem(ACTIVE_APP_ID, value);
  }, [value]);

  return children;
};

export default AppIdWrapper;