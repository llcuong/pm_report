import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";

const router = createBrowserRouter([
  MainRoutes,
], { basename: '/' });

export default router;