import Loadable from "@components/Loadable";
import MainLayout from "@layouts/MainLayout";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const MainPinholeReport = Loadable(lazy(() => import('@modules/pinhole/MainPinholeReport')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      // Set default route
      index: true,
      element: <Navigate to='pinhole-report' replace />
    },
    {
      path: 'pinhole-report',
      element: <MainPinholeReport />
    },
  ],
};

export default MainRoutes;