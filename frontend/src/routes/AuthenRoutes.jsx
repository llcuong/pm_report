import Loadable from "@components/Loadable";
import { lazy } from "react";

const MainAuthSignIn = Loadable(lazy(() => import('@modules/authentication/MainAuthSignIn')));

const AuthenRoutes = {
  path: '/sign-in',
  element: <MainAuthSignIn />,
};

export default AuthenRoutes;