import Loadable from "@components/Loadable";
import ProtectedRoute from "@components/ProtectedRoute";
import { lazy } from "react";

const MainAdminPage = Loadable(lazy(() => import('@modules/admin/MainAdminPage')));

const AdminRoutes = {
  path: '/admin',
  element: <ProtectedRoute />,
  children: [
    {
      index: true,
      element: <MainAdminPage />
    },
  ],
};

export default AdminRoutes;