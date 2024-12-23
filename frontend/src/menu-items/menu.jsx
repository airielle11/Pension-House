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
  TeamOutlined, ProductOutlined
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
