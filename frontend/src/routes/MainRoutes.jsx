import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable.jsx';
import Dashboard from '../layout/Dashboard';
// import Requisition from '../pages/extra-pages/sample-page.jsx';
import AddRoomAndType from '../pages/add-rooms/add-rooms.jsx';
import Requisitions from '../pages/requisition/Requisitions.jsx';
import BasicTable from '../pages/extra-pages/tables.jsx';
import DeskDashboard from '../pages/deskmanager/deskdashboard.jsx';
import HeadHouseDashboard from '../pages/headhousekeeper/headhousedashboard.jsx';
import RegularHousekeepeer from '../pages/regularhousekeeper/rhdashboard.jsx';
import PropertyCustodian from '../pages/propertycustodian/pcdashboard.jsx';
import MaintenanceDashboard from '../pages/maintenancemanager/mmdashboard.jsx';
import SupervisorDashboard from '../pages/supervisor/superdashboard.jsx';


const Color = Loadable(lazy(() => import('../pages/component-overview/color.jsx')));
// const Typography = Loadable(lazy(() => import('../pages/component-overview/typography.jsx')));
// const Shadow = Loadable(lazy(() => import('../pages/component-overview/shadows.jsx')));
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/index.jsx')));

// const Tables = Loadable(lazy(() => import('../pages/extra-pages/tables.jsx'))) 


// render - sample page
// const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',  
  element: <Dashboard/>,
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
      path: 'tables',
      element: <BasicTable/>
    }
    ,  
    {
      path: 'Requisitions',
      element: <Requisitions/>
    }, 
    {
      path: 'add-rooms',
      element: <AddRoomAndType />
    },
    {
      path: 'deskdashboard',
      element: <DeskDashboard />
    },
    {
      path: 'headhousedashboard',
      element: <HeadHouseDashboard />
    },
    {
      path: 'propertycustodian',
      element: <PropertyCustodian/>
    },
    {
      path: 'supervisor',
      element: <SupervisorDashboard />
    },
    {
      path: 'regularhousekeeper',
      element: <RegularHousekeepeer />
    },
    {
      path: 'maintenancemanager',
      element: <MaintenanceDashboard />
    }
    // {
    //   path: 'typography',
    //   element: <Typography />
    // }

  ]
};

export default MainRoutes;