import { RouterProvider } from 'react-router-dom';

// project import
import router from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop'; 

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom" 

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

function Logout() {
  // Clear the refresh and access token
  localStorage.clear();
  return <Navigate to="/login" />
}

export default function App() {
  return ( 
     <ThemeCustomization>
     <ScrollTop>
       <RouterProvider router={router} />
     </ScrollTop>
   </ThemeCustomization>
   
  );
}
