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
  HomeOutlined,
  TransactionOutlined,
  TeamOutlined,
  PieChartOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
  ExclamationCircleOutlined,
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
  TeamOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  LineChartOutlined,
  ExclamationCircleOutlined
};
 
// Role-based menu configuration
const roleBasedMenu = {

  // Users: General Manager, Assistant General Manager,
  // Duty Manager, Operations Manager,
  // Quality Assurance Manager, Supervisor
  "Top Management(Head Position)": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'top/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    }, 
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'top/requisitions',
      icon: icons.FileTextOutlined
    }, 
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'top/purchase_orders',
      icon: icons.TransactionOutlined,
      breadcrumbs: false,
    },
  ],
  "Top Management": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'top/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    }, 
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'top/requisitions',
      icon: icons.FileTextOutlined
    }, 
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'top/purchase_orders',
      icon: icons.TransactionOutlined,
      breadcrumbs: false,
    },
    {
      id: 'stocks-inventory',
      title: 'Stocks and Inventory',
      type: 'item',
      url: 'top/stocksinventorypage',
      icon: icons.DatabaseOutlined
    },
  ],

  // Users: Head Administrator, Administrator
  "Administration(Head Position)": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'admin/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'admin/purchase_orders',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'add-rooms',
      title: 'Add Rooms',
      type: 'item',
      url: 'admin/add-rooms',
      icon: icons.ChromeOutlined 
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'admin/requisitions',
      icon: icons.FileTextOutlined
    },
    { 
      id: 'supplier_management',
      title: 'Supplier Management',
      type: 'item',
      url: 'admin/supplier-management',  // Define the URL for the Supplier Management page
      icon: icons.AppstoreAddOutlined,  // You can choose a different icon if preferred
      breadcrumbs: false
    },
    {
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/report',
      icon: icons.PieChartOutlined // Updated icon for reports
    }
    // ,
    // {
    //   id: 'employees',
    //   title: 'Employees',
    //   type: 'item',
    //   url: 'admin/employees',
    //   icon: icons.TeamOutlined,
    //   breadcrumbs: false,
    // }
  ],
  "Administration": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'admin/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'admin/purchase_orders',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'add-rooms',
      title: 'Add Rooms',
      type: 'item',
      url: 'admin/add-rooms',
      icon: icons.ChromeOutlined

    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'admin/requisitions',
      icon: icons.FileTextOutlined
    },
    { 
      id: 'supplier_management',
      title: 'Supplier Management',
      type: 'item',
      url: 'admin/supplier-management',  // Define the URL for the Supplier Management page
      icon: icons.AppstoreAddOutlined,  // You can choose a different icon if preferred
      breadcrumbs: false
    },
    {
      id: 'stocks-inventory',
      title: 'Stocks and Inventory',
      type: 'item',
      url: 'admin/stocksinventorypage',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/report',
      icon: icons.PieChartOutlined // Updated icon for reports
    },
    // {
    //   id: 'employees',
    //   title: 'Employees',
    //   type: 'item',
    //   url: 'admin/employees',
    //   icon: icons.TeamOutlined,
    //   breadcrumbs: false,
    // },
    // {
    //   id: 'graph_page',
    //   title: 'Graph and Predictions',
    //   type: 'item',
    //   url: 'admin/graph-page',  // Matches the route defined above
    //   icon: icons.LineChartOutlined, // Choose an appropriate icon
    //   breadcrumbs: false,
    // },
    
    
  ],

  // Users: Executive Housekeeper, Housekeeping Supervisor,
  // Room Attendant/Housekeeper, Laundry Attendant
  // Public Area Cleaner, Linen Room Attendant
  "Housekeeping Management(Head Position)": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'housekeeping/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'housekeeping/requisitions',
      icon: icons.FileTextOutlined
    },
  ],
  "Housekeeping Management": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'housekeeping/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'housekeeping/requisitions',
      icon: icons.FileTextOutlined
    },
  ],

  // Users: Property Custodian, Bookeeper,
  // Inventory Clerk, Procurement Officer,
  // Stockroom Manager, Maintenance Inventory Coordinator
  "Inventory Management(Head Position)": [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   type: 'item',
    //   url: 'admin/dashboard',
    //   icon: icons.DashboardOutlined,
    //   breadcrumbs: false,
    // },
    {
      id: 'stocks-inventory',
      title: 'Stocks and Inventory',
      type: 'item',
      url: 'property_custodian/stocksinventorypage',
      icon: icons.DatabaseOutlined
    },
    
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'property_custodian/purchase_orders',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'delivery',
      title: 'Delivery',
      type: 'item',
      url: 'property_custodian/delivery/mark_po',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },    
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'property_custodian/requisitions',
      icon: icons.FileTextOutlined
    },
  ],
  "Inventory Management": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'property_custodian/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'property_custodian/requisitions',
      icon: icons.FileTextOutlined
    },

    {
      id: 'stocks-inventory',
      title: 'Stocks and Inventory',
      type: 'item',
      url: 'property_custodian/stocksinventorypage',
      icon: icons.DatabaseOutlined
    },
    
    {
      id: 'purchase_orders',
      title: 'Purchase Orders',
      type: 'item',
      url: 'property_custodian/purchase_orders',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'delivery',
      title: 'Delivery',
      type: 'item',
      url: 'property_custodian/delivery/mark_po',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },    
    {
      id: 'defective-items',
      title: 'Defective Items',
      type: 'item',
      url: 'defective-items',
      icon: icons.ExclamationCircleOutlined 
    },
  ],
  "Front Office Manager": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'desk/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'desk/requisitions',
      icon: icons.FileTextOutlined
    },
  ],
  "Desk Management": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'housekeeping/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'housekeeping/requisitions',
      icon: icons.FileTextOutlined
    },
  ],
  "Maintenance Management": [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'maintenance/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'maintenance/requisitions',
      icon: icons.FileTextOutlined
    },

    {
      id: 'supplier_management',
      title: 'Supplier Management',
      type: 'item',
      url: 'supplier-management',  // Define the URL for the Supplier Management page
      icon: icons.AppstoreAddOutlined,  // You can choose a different icon if preferred
      breadcrumbs: false
    },
  ],
};




// Get user's role  
const userRole = localStorage.getItem('role') || 'Unknown'; // Default to 'Unknown' if role is not set
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

 