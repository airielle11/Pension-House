import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable.jsx';
import Dashboard from '../layout/Dashboard';


const ProductRequisitionTable = Loadable(
  lazy(() => import('../pages/extra-pages/ProductRequisitionTable.jsx'))
);


const Color = Loadable(lazy(() => import('../pages/component-overview/color.jsx')));
const Typography = Loadable(lazy(() => import('../pages/component-overview/typography.jsx')));
const Shadow = Loadable(lazy(() => import('../pages/component-overview/shadows.jsx')));
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/index.jsx')));
const Tables = Loadable(lazy(() => import('../pages/extra-pages/Tables.jsx'))) 



// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/sample-page.jsx')));
const SamplePage2 = Loadable(lazy(() => import('../pages/extra-pages/sample-pagetwo.jsx')));
const ViewAcknowledgementReceipt = Loadable(lazy(() => import('../pages/extra-pages/ViewAcknowledgementReceipt.jsx')));


// Corrected imports for inventory pages
const StocksInventoryPage = Loadable(lazy(() => import('../pages/InventoryPages/stocks-inventory-page.jsx')));
const AddNewItemForm = Loadable(lazy(() => import('../pages/InventoryPages/AddNewItemForm.jsx')));
const DefectiveItemsTable = Loadable(lazy(() => import('../pages/InventoryPages/DefectiveItemsTable.jsx')));
const AddDefectiveItem = Loadable(lazy(() => import('../pages/InventoryPages/AddDefectiveItem.jsx')));


// New import for AR page
const DownloadAcknowledgementReceipt = Loadable(
  lazy(() => import('../pages/ARpages/DownloadAcknowledgementReceipt.jsx'))
);



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
    {
      path: 'tables',
      element: <Tables />
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
      path: '/add-new-item', // Route for Add New Item page
      element: <AddNewItemForm />, 
    },


    {
      path: 'stocksinventorypage',
      element: <StocksInventoryPage />
    },

    {
      path: 'defective-items', // Route for Defective Items page
      element: <DefectiveItemsTable />, 
    },
    {
      path: 'add-defective-item', // Route for Add Defective Item page
      element: <AddDefectiveItem />
    }
    
    /*,
    {
      path: 'requisitions', // Route for Product Requisition Table
      element: <ProductRequisitionTable />
    }*/
    /*,

    {
      path: 'stocks-list',  // Add the path for the StocksListTable
      element: <StocksListTable />  // Render StocksListTable component here
    }*/

  ]
};

export default MainRoutes;