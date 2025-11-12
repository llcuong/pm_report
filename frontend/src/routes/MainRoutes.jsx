import AppIdWrapper from "@components/AppIdWrapper";
import Loadable from "@components/Loadable";
import DashboardLayout from "@layouts/MainLayout";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const MainPinholeReport = Loadable(lazy(() => import('@modules/pinhole/MainPinholeReport')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      // Set default route
      index: true,
      element: <Navigate to='pinhole-report' replace />
    },
    {
      path: 'pinhole-report',
      element: (
        <AppIdWrapper value={1}>
          <MainPinholeReport />
        </AppIdWrapper>
      )
    },
  ],
};

export default MainRoutes;