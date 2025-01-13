import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { RoleProvider } from './contexts/RoleContext';
import router from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';

export default function App() {
  return (
    <RoleProvider>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </RoleProvider>
  );
}
