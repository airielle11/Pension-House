import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes.jsx';
import LoginRoutes from './LoginRoutes.jsx';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, LoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME || '/' });

export default router;
