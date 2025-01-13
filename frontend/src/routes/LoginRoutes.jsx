import { lazy } from 'react';

// Project import
import Loadable from '../components/Loadable.jsx';
import MinimalLayout from '../layout/MinimalLayout';

// Render - login-related pages
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login.jsx')));
const ForgotPassword = Loadable(lazy(() => import('../pages/authentication/ForgotPassword.jsx')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword.jsx')));

// ==============================|| LOGIN ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />, // Minimal layout for unauthenticated pages
  children: [
    {
      path: 'login',
      element: <AuthLogin />,
    },
    {
      path: 'forgot_password',
      element: <ForgotPassword />,
    },
    {
      path: 'reset_password',
      element: <ResetPassword />,
    },
  ],
};

export default LoginRoutes;
