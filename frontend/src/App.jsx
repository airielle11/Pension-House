import { RouterProvider } from 'react-router-dom';

// project import
import router from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop'; 

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute'; 
import NotFound from './pages/404'
import Dashboard from './pages/dashboard/index';
import Login from './pages/authentication/login'

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

function Logout() {
  // Clear the refresh and access token
  localStorage.clear();
  return <Navigate to="/login" />
}

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route 
    //       path='/'
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       }
    //     /> 
    //     <Route path='/pages/authentication/login' element={<Login />} />
    //     <Route path='*' element={<NotFound />}></Route>
    //   </Routes>
    // </BrowserRouter>
     <ThemeCustomization>
     <ScrollTop>
       <RouterProvider router={router} />
     </ScrollTop>
   </ThemeCustomization>
   
  );
}
