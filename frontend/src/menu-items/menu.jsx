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
  DatabaseOutlined
}; 
 
// ==============================|| MENU ITEMS ||============================== //

const menu = {
  id: 'group-menu',
  title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
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
      id: 'employees',
      title: 'Employees',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },*/
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: 'arpages/download-acknowledgement-receipt', 
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
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },

    {
      id: 'supplier_management',
      title: 'Supplier Management',
      type: 'item',
      url: 'supplier-management',  // Define the URL for the Supplier Management page
      icon: icons.AppstoreAddOutlined,  // You can choose a different icon if preferred
      breadcrumbs: false
    }
  ]
};

export default menu;
