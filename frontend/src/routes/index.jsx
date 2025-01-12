import { createBrowserRouter } from 'react-router-dom';

// Project imports
import MainRoutes from './MainRoutes.jsx';
import LoginRoutes from './LoginRoutes.jsx';
import ErrorPage from '../pages/404.jsx'; // Create a simple error page

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    MainRoutes,
    LoginRoutes,
    {
      path: '*', // Catch-all route for unmatched paths
      element: <ErrorPage />,
    },
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
