import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage

  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If the user's role is not authorized, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

  // If authorized, render the child component
  return children;
};

export default ProtectedRoute;
