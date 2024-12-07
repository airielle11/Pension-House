import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable.jsx';
import Dashboard from '../layout/Dashboard';
import Error404 from '../pages/404.jsx';
import { Navigate } from 'react-router'; 

const Color = Loadable(lazy(() => import('../pages/component-overview/color.jsx')));
const Typography = Loadable(lazy(() => import('../pages/component-overview/typography.jsx')));
const Shadow = Loadable(lazy(() => import('../pages/component-overview/shadows.jsx')));
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/index.jsx')));
const Tables = Loadable(lazy(() => import('../pages/extra-pages/Tables.jsx'))) 
const UserProfile = Loadable(lazy(() => import('../pages/UserProfile/UserProfile.jsx')))

// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page.jsx')));
const PurchaseOrderList = Loadable(lazy(() => import('../pages/purchasing/PurchaseOrder.jsx')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  errorElement: <Error404 />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    }, 
    {
      path: 'color',
      element: <Color />
    },
    { 
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },  
    {
      path: 'tables',
      element: <Tables />
    }, 
    {
      path: 'profile',
      element: <UserProfile />
    }, 
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'purchase_order',
      element: <PurchaseOrderList />
    }

  ]
};

export default MainRoutes;