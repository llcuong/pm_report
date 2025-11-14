import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthenRoutes from "./AuthenRoutes";
import AuthorRoutes from "./AuthorRoutes";

const router = createBrowserRouter([
  MainRoutes,
  AuthenRoutes,
  AuthorRoutes,
], { basename: '/' });

export default router;