import AppIdWrapper from "@components/AppIdWrapper";
import Loadable from "@components/Loadable";
import ProtectedRoute from "@components/ProtectedRoute";
import { lazy } from "react";

const MainIPQCData = Loadable(lazy(() => import('@modules/authorizationApp/ipqc/MainIPQCData')));
const MainCountingData = Loadable(lazy(() => import('@modules/authorizationApp/counting/MainCountingData')));
const MainUserManangement = Loadable(lazy(() => import('@modules/authorizationApp/userManagement/MainUserManagement')));
const MainAuthorUser = Loadable(lazy(() => import('@modules/authorizationApp/welcomeAuthorUser/MainAuthorUser')));
const MainUserProfile = Loadable(lazy(() => import('@modules/authorizationApp/userProfile/MainUserProfile')));

const AdminRoutes = {
  path: '/auth-user',
  element: <ProtectedRoute />,
  children: [
    {
      index: true,
      element: (
        <AppIdWrapper value={5}>
          <MainAuthorUser />
        </AppIdWrapper>
      )
    },
    {
      path: 'user-profile',
      element: (
        <AppIdWrapper value={6}>
          <MainUserProfile />
        </AppIdWrapper>
      )
    },
    {
      path: 'ipqc-data',
      element: (
        <AppIdWrapper value={7}>
          <MainIPQCData />
        </AppIdWrapper>
      )
    },
    {
      path: 'counting-data',
      element: (
        <AppIdWrapper value={8}>
          <MainCountingData />
        </AppIdWrapper>
      )
    },
    {
      path: 'user-management',
      element: (
        <AppIdWrapper value={9}>
          <MainUserManangement />
        </AppIdWrapper>
      )
    },
  ],
};

export default AdminRoutes;