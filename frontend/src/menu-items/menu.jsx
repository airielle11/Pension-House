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
  DatabaseOutlined } from '@ant-design/icons';

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
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    /*
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },*/
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/arpages/download-acknowledgement-receipt', // Updated to match the AR page route
      //url: '/requisitions',
      icon: icons.FileTextOutlined
    },
    {
      id: 'purchase-orders',
      title: 'Purchase Orders',
      type: 'item',
      url: '/sample-pagetwo',
      icon: icons.ShoppingCartOutlined
    },
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
  ]
};

export default menu;
