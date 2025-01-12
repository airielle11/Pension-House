// assets
import { DashboardOutlined, 
  ChromeOutlined, 
  QuestionOutlined, 
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DatabaseOutlined, 
  HomeOutlined,
  TransactionOutlined,
  TeamOutlined,
  PieChartOutlined,
  ProductOutlined} from '@ant-design/icons';

// icons
const icons = { 
  DashboardOutlined,
  ChromeOutlined,
  QuestionOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  TransactionOutlined,
  TeamOutlined, ProductOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  PieChartOutlined
}; 
 
// ==============================|| MENU ITEMS ||============================== //

const menu = {
  id: 'group-menu',
  title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard(Admin)',
      type: 'item',
      url: 'dashboard/default',
      icon: icons.ProductOutlined,
      breadcrumbs: false
    },
    
    {
      id: 'purchase_order',
      title: 'Purchase Order',
      type: 'item',
      url: 'purchase_order',
      icon: icons.TransactionOutlined,
      breadcrumbs: false
    },
    /*
    {
      id: 'deskdashboard',
      title: 'Dashboard (Desk)',
      type: 'item',
      url: '/deskdashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'headhousedashboard',
      title: 'Dashboard(Head Housekeeper)',
      type: 'item',
      url: '/headhousedashboard',
      icon: icons.DashboardOutlined,
    },
    {
      id: 'regularhousekeeper',
      title: 'Dashboard(Regular Housekeeper)',
      type: 'item',
      url: '/regularhousekeeper',
      icon: icons.DashboardOutlined
    },
    {
      id: 'propertymanagement',
      title: 'Dashboard(Property Management)',
      type: 'item',
      url: '/propertycustodian', // for browser rani sa babaw
      icon: icons.DashboardOutlined
    },
    {
      id: 'maintenancemanager',
      title: 'Dashboard(Maintenance Management)',
      type: 'item',
      url: '/maintenancemanager', // for browser rani sa babaw
      icon: icons.DashboardOutlined
    },
    {
      id: 'supervisor',
      title: 'Dashboard(Supervisor)',
      type: 'item',
      url: '/supervisor', // for browser rani sa babaw
      icon: icons.DashboardOutlined
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/requisitions', // for browser rani sa babaw
      icon: icons.ChromeOutlined
    },
    // {
    //   id: 'sample-page',
    //   title: 'Generate Requisition Form',
    //   type: 'item',
    //   url: '/sample-page',
    //   icon: icons.ChromeOutlined
    // },

    

    },*/
    {
      id: 'add-rooms',
      title: 'Add Rooms',
      type: 'item',
      url: '/add-rooms',
      icon: icons.ChromeOutlined

    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/requisitions', // Updated to match the AR page route
      //url: '/requisitions',
      icon: icons.FileTextOutlined
    },
    {
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/report',
      icon: icons.PieChartOutlined // Updated icon for reports
    }
    ,

    /*
    {
      id: 'purchase-orders',
      title: 'Purchase Orders',
      type: 'item',
      url: '/sample-pagetwo',
      icon: icons.ShoppingCartOutlined
    },*/

    {
      id: 'stocks-inventory',
      title: 'Stocks and Inventory',
      type: 'item',
      url: '/stocksinventorypage',
      icon: icons.DatabaseOutlined
    }
    
    /*,

    {
      id: 'stocks-list',  // Add new menu item for the StocksListTable
      title: 'Stocks List',
      type: 'item',
      url: '/stocks-list',  // Define the route for the StocksListTable page
      icon: icons.DatabaseOutlined // You can choose a different icon if preferred
    }*/

,
     {
      id: 'employees',
      title: 'Employees',
      type: 'item',
      url: 'admin/employees',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    }
  ]
};

export default menu;
