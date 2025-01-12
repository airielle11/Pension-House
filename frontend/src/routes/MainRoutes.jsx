import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // Ensure this is the correct import
import Loadable from '../components/Loadable.jsx';
import Dashboard from '../layout/Dashboard';

// import Requisition from '../pages/extra-pages/sample-page.jsx';
import AddRoomAndType from '../pages/add-rooms/add-rooms.jsx';
import Requisitions from '../pages/requisition/Requisitions.jsx';
// import BasicTable from '../pages/extra-pages/tables.jsx';
import DeskDashboard from '../pages/deskmanager/deskdashboard.jsx';
import HeadHouseDashboard from '../pages/headhousekeeper/headhousedashboard.jsx';
import RegularHousekeepeer from '../pages/regularhousekeeper/rhdashboard.jsx';
import PropertyCustodian from '../pages/propertycustodian/pcdashboard.jsx';
import MaintenanceDashboard from '../pages/maintenancemanager/mmdashboard.jsx';
import SupervisorDashboard from '../pages/supervisor/superdashboard.jsx';
import ReportComponent from '../pages/reports/Report.jsx';
import MinimalLayout from '../layout/MinimalLayout'; 

import Error404 from '../pages/404.jsx';


// const ProductRequisitionTable = Loadable(
//   lazy(() => import('../pages/extra-pages/ProductRequisitionTable.jsx'))
// );



// const Color = Loadable(lazy(() => import('../pages/component-overview/color.jsx')));
// const Typography = Loadable(lazy(() => import('../pages/component-overview/typography.jsx')));
// const Shadow = Loadable(lazy(() => import('../pages/component-overview/shadows.jsx')));
 

// const Tables = Loadable(lazy(() => import('../pages/extra-pages/tables.jsx'))) 


// render - sample page
// const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page.jsx')));

// const Tables = Loadable(lazy(() => import('../pages/extra-pages/Tables.jsx'))) 
const UserProfile = Loadable(lazy(() => import('../pages/users/UserProfile.jsx')))


// render - sample page
// const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page.jsx')));
// const PurchaseOrderList = Loadable(lazy(() => import('../pages/purchasing/PurchaseOrder.jsx')));
// const Employees = Loadable(lazy(() => import('../pages/users/ManageEmployees.jsx')));

// const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login.jsx'))); 
// Lazily load the components
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/index.jsx')));
// const InventoryDashboard = Loadable(lazy(() => import('../pages/inventory/InventoryDashboard.jsx')));
// const TopDashboard = Loadable(lazy(() => import('../pages/top/TopDashboard.jsx')));
// const DeskDashboard = Loadable(lazy(() => import('../pages/desk/DeskDashboard.jsx')));
// const HousekeepingDashboard = Loadable(lazy(() => import('../pages/housekeeping/HousekeepingDashboard.jsx')));
// const MaintenanceDashboard = Loadable(lazy(() => import('../pages/maintenance/MaintenanceDashboard.jsx')));
const AdminDashboard = Loadable(lazy(() => import('../pages/admin/AdminDashboard/index.jsx')));
const PurchaseOrder = Loadable(lazy(() => import('../pages/purchasing/PurchaseOrder.jsx')));
const MarkPO = Loadable(lazy(() => import('../pages/delivery/MarkPOComplete.jsx')));

// const SamplePage2 = Loadable(lazy(() => import('../pages/extra-pages/sample-pagetwo.jsx')));
// const ViewAcknowledgementReceipt = Loadable(lazy(() => import('../pages/extra-pages/ViewAcknowledgementReceipt.jsx')));


// Corrected imports for inventory pages
// const StocksInventoryPage = Loadable(lazy(() => import('../pages/InventoryPages/stocks-inventory-page.jsx')));
// const AddNewItemForm = Loadable(lazy(() => import('../pages/InventoryPages/AddNewItemForm.jsx')));
// const DefectiveItemsTable = Loadable(lazy(() => import('../pages/InventoryPages/DefectiveItemsTable.jsx')));
// const AddDefectiveItem = Loadable(lazy(() => import('../pages/InventoryPages/AddDefectiveItem.jsx')));


// New import for AR page
// const DownloadAcknowledgementReceipt = Loadable(
//   lazy(() => import('../pages/ARpages/DownloadAcknowledgementReceipt.jsx'))
// );



// Main Routes Configuration
const MainRoutes = { 
  path: '/',  
  element: <Dashboard/>,  
  errorElement: <Error404 />, // Error fallback
  children: [
    // Redirect root to login
    {
      path: '/',
      element: <Navigate to="/login" />
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
      path: 'sample-pagetwo',
      element: <SamplePage2 />
    }, 
    {
      path: 'view-acknowledgement-receipt',
      element: <ViewAcknowledgementReceipt />
    },
    {
      path: 'arpages/download-acknowledgement-receipt', // Route for DownloadAcknowledgementReceipt
      element: <DownloadAcknowledgementReceipt />
    },
    // {

    //   path: 'tables',
    //   element: <BasicTable/>
    // }
    // ,  
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
    },
    {
      path: 'profile',
      element: <UserProfile />
    }, 
    // {
    //   path: 'add_employee'
    //   element: < />
    // }
    // {
    //   path: 'shadow',
    //   element: <Shadow />
    // },
    // { 
    //   path: 'typography',
    //   element: <Typography />
    // },

    {
      path: '/add-new-item', // Route for Add New Item page
      element: <AddNewItemForm />, 
    },


    {
      path: 'property_custodian',
      children: [
        // {
        //   path: 'dashboard',
        //   element: <InventoryDashboard />
        // },
        {
          path: 'purchase_orders',
          element: <PurchaseOrder />
        },
        {
          path: 'delivery',
          children: [
            {
              path: 'mark_po',
              element: <MarkPO />
            },
          ]
        },
      ]
    },  
    // {
    //   path: 'desk',
    //   children: [
    //     {
    //       path: 'dashboard',
    //       element: <DeskDashboard />
    //     }
    //   ]
    // },
    // {
    //   path: 'housekeeping',
    //   children: [
    //     {
    //       path: 'dashboard',
    //       element: <HousekeepingDashboard />
    //     }
    //   ]
    // },
    // {
    //   path: 'maintenance',
    //   children: [
    //     {
    //       path: 'dashboard',
    //       element: <MaintenanceDashboard />
    //     }
    //   ]
    // },
    {
      path: 'top',
      children: [
        // {
        //   path: 'dashboard',
        //   element: <TopDashboard />
        // },
        {
          path: 'purchase_orders',
          element: <PurchaseOrder />
        },
      ]
    },
    { 
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />
        },
        {
          path: 'purchase_orders',
          element: <PurchaseOrder />
        },
      ]
    }
  ]
};

export default MainRoutes;
