import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAuthenticated = !!localStorage.getItem('auth_token');
  const isFarmer = user.role === 'farmer';

  console.log('ProtectedRoute - User:', user, 'IsAuthenticated:', isAuthenticated, 'IsFarmer:', isFarmer);

  if (!isAuthenticated || !isFarmer) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;