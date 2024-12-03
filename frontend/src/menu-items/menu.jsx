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
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
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
    },
    {
      id: 'requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/requisitions', // for browser rani sa babaw
      icon: icons.ChromeOutlined
    }
  
  ]
};

export default menu;