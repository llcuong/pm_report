import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  MainRoutes,
  AuthRoutes,
  AdminRoutes,
], { basename: '/' });

export default router;