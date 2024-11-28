import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable.jsx';
import MinimalLayout from '../layout/MinimalLayout'; 

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login.jsx'))); 

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    } 
  ]
};

export default LoginRoutes;
