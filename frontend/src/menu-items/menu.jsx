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
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'top/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
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
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'top/requisitions',
      icon: icons.FileTextOutlined
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
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: 'property_custodian/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
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
      id: 'mark_po',
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
