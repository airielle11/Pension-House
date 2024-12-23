// assets
import { DashboardOutlined, 
  ChromeOutlined, 
  QuestionOutlined, 
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined } from '@ant-design/icons';
   

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
  AppstoreAddOutlined
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
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
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
    
  
  ]
};

export default menu;