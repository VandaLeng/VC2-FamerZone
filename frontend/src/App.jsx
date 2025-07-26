import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import FarmerLayout from './layouts/FarmerLayout';

import Home from './views/user/HomePage';
import Products from './views/user/ProductPage';
import About from './views/user/AboutPage';
import LearningCenter from './views/user/LearningCenterPage';
import Contact from './views/user/ContactPage';
import RegisterForm from './views/auth/RegisterForm';
import LoginForm from './views/auth/LoginForm';

import FarmerDashboard from './views/farmer/DashboardFarmer';
import ProductManagementFarmer from './views/farmer/ProductManagementFarmer';
import CategoryManagementFarmer from './views/farmer/CategoryManagementFarmer';
import OrderManagementFarmer from './views/farmer/OrderManagementFarmer';
import CustomerManagementFarmer from './views/farmer/CustomerManagementFarmer';


function App() {
  const [currentLanguage, setCurrentLanguage] = useState('kh');
  const [userRole, setUserRole] = useState(null); // 'farmer', 'buyer', etc.

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <Home currentLanguage={currentLanguage} />
          </PublicLayout>
        } />

        <Route path="/products" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <Products currentLanguage={currentLanguage} />
          </PublicLayout>
        } />

        <Route path="/about" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <About currentLanguage={currentLanguage} />
          </PublicLayout>
        } />

        <Route path="/learning-center" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <LearningCenter currentLanguage={currentLanguage} />
          </PublicLayout>
        } />

        <Route path="/contact" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <Contact currentLanguage={currentLanguage} />
          </PublicLayout>
        } />

        {/* Auth Pages */}
        <Route path="/register" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <RegisterForm currentLanguage={currentLanguage} />
          </PublicLayout>
        } />

        <Route path="/login" element={
          <PublicLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <LoginForm currentLanguage={currentLanguage} setUserRole={setUserRole} />
          </PublicLayout>
        } />

        {/* Farmer System Pages */}
        <Route path="/farmer/dashboard" element={
          <FarmerLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <FarmerDashboard currentLanguage={currentLanguage} />
          </FarmerLayout>
        } />

        <Route path="/farmer/orders" element={
          <FarmerLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <OrderManagementFarmer currentLanguage={currentLanguage} />
          </FarmerLayout>
        } />

        <Route path="/farmer/products" element={
          <FarmerLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <ProductManagementFarmer currentLanguage={currentLanguage} />
          </FarmerLayout>
        } />
        <Route path="/farmer/categories" element={
          <FarmerLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <CategoryManagementFarmer currentLanguage={currentLanguage} />
          </FarmerLayout>
        } />
        <Route path="/farmer/customer" element={
          <FarmerLayout currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}>
            <CustomerManagementFarmer currentLanguage={currentLanguage} />
          </FarmerLayout>
        } />

        {/* Optional: Redirect based on role */}
        <Route path="/redirect-after-login" element={
          userRole === 'farmer'
            ? <Navigate to="/farmer/dashboard" replace />
            : <Navigate to="/" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
