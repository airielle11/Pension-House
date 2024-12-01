import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable.jsx';
import Dashboard from '../layout/Dashboard';

const Color = Loadable(lazy(() => import('../pages/component-overview/color.jsx')));
const Typography = Loadable(lazy(() => import('../pages/component-overview/typography.jsx')));
const Shadow = Loadable(lazy(() => import('../pages/component-overview/shadows.jsx')));
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/index.jsx')));
//const Tables = Loadable(lazy(() => import('../pages/extra-pages/Tables.jsx'))) 


// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
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
    // {
    //   path: 'tables',
    //   element: <Tables />
    // }, 
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }

  ]
};

export default MainRoutes;