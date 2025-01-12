// assets
import {
  DashboardOutlined,
  ChromeOutlined,
  QuestionOutlined,
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
<<<<<<< Updated upstream
  ShoppingCartOutlined,
  FileTextOutlined,
  DatabaseOutlined, 
  HomeOutlined,
  TransactionOutlined,
  TeamOutlined,
  ProductOutlined} from '@ant-design/icons';
=======
  HomeOutlined,
  TransactionOutlined,
  TeamOutlined,
  ProductOutlined,
} from '@ant-design/icons';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  TeamOutlined, ProductOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DatabaseOutlined
}; 
 
// ==============================|| MENU ITEMS ||============================== //
=======
  TeamOutlined,
  ProductOutlined,
};
>>>>>>> Stashed changes

// Role-based menu configuration
const roleBasedMenu = {
  "General Manager": [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   type: 'item',
    //   url: 'admin/dashboard',
    //   icon: icons.DashboardOutlined,
    //   breadcrumbs: false,
    // },
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'top/purchase_orders',
      icon: icons.TransactionOutlined,
      breadcrumbs: false,
    },
  ],
  "Head Administrator": [
    {
      id: 'dashboard',
      title: 'Dashboard(Admin)',
      type: 'item',
      url: 'admin/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
<<<<<<< Updated upstream
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
    {
      id: 'add-rooms',
      title: 'Add Rooms',
      type: 'item',
      url: '/add-rooms',
      icon: icons.ChromeOutlined

    }
    

    },*/
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/arpages/download-acknowledgement-receipt', // Updated to match the AR page route
      //url: '/requisitions',
      icon: icons.FileTextOutlined
    },

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
=======
      url: 'admin/purchase_orders',
>>>>>>> Stashed changes
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    } 
  ],
  "Property Custodian": [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   type: 'item',
    //   url: 'admin/dashboard',
    //   icon: icons.DashboardOutlined,
    //   breadcrumbs: false,
    // },
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'property_custodian/purchase_orders',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'mark_po',
      title: 'Delivery',
      type: 'item',
      url: 'property_custodian/delivery/mark_po',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
  ],
};

// Get user's role  
const userRole = localStorage.getItem('role') || 'Unknown'; // Default to 'Guest' if role is not set
console.log("User Rolee: ", userRole);
// Filter menu items based on the user's role
const menuItems = roleBasedMenu[userRole] || []; // Fallback to an empty array if the role doesn't match

// Final menu object
const menu = {
  id: 'group-menu',
  title: 'Menu',
  type: 'group',
  children: menuItems, // Dynamically assign menu items based on role
};

export default menu;
