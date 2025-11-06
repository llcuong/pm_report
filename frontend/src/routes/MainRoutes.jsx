import Loadable from "@components/Loadable";
import MainLayout from "@layouts/MainLayout";
import { lazy } from "react";

const MainReport = Loadable(lazy(() => import('@modules/report/MainPinholeReport')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'pinhole-report',
      element: <MainReport />
    },
  ],
};

export default MainRoutes;