// import { lazy } from 'react';
// import Loadable from '../components/Loadable.jsx';
// import MainLayout from '../layout/MainLayout';
// import ProtectedRoute from './ProtectedRoutes'; // Import the custom ProtectedRoute component

// // Lazy load role-specific dashboards
// const DashboardAdmin = Loadable(lazy(() => import('../pages/top_management/dashboard/DashboardAdmin.js;
// const DashboardManager = Loadable(lazy(() => import('../pages/top_management/dashboard/DashboardManager.js;
// const DashboardEmployee = Loadable(lazy(() => import('../pages/top_management/dashboard/DashboardEmployee.js;

// // ==============================|| DASHBOARD ROUTES ||============================== //

// const DashboardRoutes = {
//   path: '/',
//   element: <MainLayout />, // Main layout for authenticated users
//   children: [
//     {
//       path: 'dashboard/admin',
//       element: <ProtectedRoute allowedRoles={['admin']}><DashboardAdmin /></ProtectedRoute>,
//     },
//     {
//       path: 'dashboard/manager',
//       element: <ProtectedRoute allowedRoles={['manager']}><DashboardManager /></ProtectedRoute>,
//     },
//     {
//       path: 'dashboard/employee',
//       element: <ProtectedRoute allowedRoles={['employee']}><DashboardEmployee /></ProtectedRoute>,
//     },
//   ],
// };

// export default DashboardRoutes;
