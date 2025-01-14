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
  PieChartOutlined
};

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
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/report',
      icon: icons.PieChartOutlined // Updated icon for reports
    },
  ],
  "Executive Housekeeper": [
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
    {
      id: 'inventory',
      title: 'Inventory Management',
      type: 'item',
      url: 'property_custodian/inventory',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
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
