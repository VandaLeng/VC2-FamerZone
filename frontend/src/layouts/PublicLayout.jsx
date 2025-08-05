import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTop';
import UserProfile from '../views/buyer/BuyerProfile';
import UserOrders from '../views/buyer/BuyerOrder';
import UserSettings from '../views/buyer/BuyerSetting';
// import UserDashboard from '../views/buyer/BuyerDashboard';

const PublicLayout = ({ 
  children, 
  currentLanguage, 
  setCurrentLanguage,
  isLoggedIn,
  userData,
  handleLogout,
  isFarmer
}) => {
  const location = useLocation();
  
  // List of routes where Footer should not be displayed
  const noFooterRoutes = ['/profile', '/orders', '/settings', '/dashboard', '/cart'];
  
  // Check if current route is in noFooterRoutes
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleLogout={handleLogout}
      />
      <main>
        <Routes>
          {/* Buyer/User protected routes */}
          {isLoggedIn && userData && !isFarmer && (
            <>
              <Route 
                path="/profile" 
                element={<UserProfile userData={userData} currentLanguage={currentLanguage} />}
              />
              <Route 
                path="/orders" 
                element={<UserOrders userData={userData} currentLanguage={currentLanguage} />}
              />
              <Route 
                path="/settings" 
                element={<UserSettings userData={userData} currentLanguage={currentLanguage} />}
              />
              {/* <Route 
                path="/dashboard" 
                element={<UserDashboard userData={userData} currentLanguage={currentLanguage} />}
              /> */}
            </>
          )}
          {/* Render children routes passed from App.jsx */}
          <Route path="*" element={children} />
        </Routes>
      </main>
      {showFooter && <Footer currentLanguage={currentLanguage} />}
      <BackToTopButton />
    </>
  );
};

export default PublicLayout;