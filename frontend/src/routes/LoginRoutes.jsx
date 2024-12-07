import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable.jsx';
import MinimalLayout from '../layout/MinimalLayout'; 

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login.jsx'))); 
const ForgotPassword = Loadable(lazy(() => import('../pages/authentication/ForgotPassword.jsx')))
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword.jsx')))


// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = { 
  path: '/',
  element: <MinimalLayout />,
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
    }
  ]
};

export default LoginRoutes;
 