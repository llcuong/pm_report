import AppIdWrapper from "@components/AppIdWrapper";
import Loadable from "@components/Loadable";
import ProtectedRoute from "@components/ProtectedRoute";
import { lazy } from "react";

const MainIPQCData = Loadable(lazy(() => import('@modules/authorizationApp/ipqc/MainIPQCData')));
const MainCountingData = Loadable(lazy(() => import('@modules/authorizationApp/counting/MainCountingData')));

const MainAuthorUser = Loadable(lazy(() => import('@modules/authorizationApp/welcomeAuthorUser/MainAuthorUser')));
const MainUserProfile = Loadable(lazy(() => import('@modules/authorizationApp/userProfile/MainUserProfile')));

// User Management
const MainUserManangement = Loadable(lazy(() => import('@modules/authorizationApp/userManagement/MainUserManagement')));
const UserViewDetails = Loadable(lazy(() => import('@modules/authorizationApp/userManagement/components/action/viewDetails/UserViewDetails')));
const UserAddNew = Loadable(lazy(() => import('@modules/authorizationApp/userManagement/components/action/addNew/UserAddNew')));

const AdminRoutes = {
  path: '/auth-user',
  element: <ProtectedRoute />,
  children: [
    {
      index: true,
      element: (
        <AppIdWrapper value={10}>
          <MainAuthorUser />
        </AppIdWrapper>
      )
    },
    {
      path: 'ipqc-data',
      element: (
        <AppIdWrapper value={11}>
          <MainIPQCData />
        </AppIdWrapper>
      )
    },
    {
      path: 'counting-data',
      element: (
        <AppIdWrapper value={12}>
          <MainCountingData />
        </AppIdWrapper>
      )
    },
    {
      path: 'user-management',
      children: [
        {
          index: true,
          element: (
            <AppIdWrapper value={13}>
              <MainUserManangement />
            </AppIdWrapper>
          )
        },
        {
          path: 'add-new-user',
          element: (
            <AppIdWrapper value={13}>
              <UserAddNew />
            </AppIdWrapper>
          )
        },
        {
          path: 'user',
          element: (
            <AppIdWrapper value={13}>
              <UserViewDetails />
            </AppIdWrapper>
          )
        },
      ]
    },
    {
      path: 'user-profile',
      element: (
        <AppIdWrapper value={21}>
          <MainUserProfile />
        </AppIdWrapper>
      )
    },
  ],
};

export default AdminRoutes;