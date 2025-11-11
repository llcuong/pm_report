import Loadable from "@components/Loadable";
import ProtectedRoute from "@components/ProtectedRoute";
import MainLayout from "@layouts/MainLayout";
import { lazy } from "react";

const MainAdminPage = Loadable(lazy(() => import('@modules/admin/MainAdminPage')));

const AdminRoutes = {
  path: '/admin',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <MainAdminPage />
    },
  ],
};

export default AdminRoutes;