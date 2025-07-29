"use client";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./views/user/HomePage";
import Products from "./views/user/ProductPage";
import About from "./views/user/AboutPage";
import LearningCenter from "./views/user/LearningCenterPage";
import Contact from "./views/user/ContactPage";
import RegisterForm from "./views/auth/RegisterForm";
import LoginForm from "./views/auth/LoginForm";
import FarmerLayout from "./layouts/FarmerLayout";
import PublicLayout from "./layouts/PublicLayout";

// Farmer System
import FarmerDashboard from "./views/farmer/DashboardFarmer";
import FarmerOrders from "./views/farmer/OrderManagementFarmer";
import FarmerCustomers from "./views/farmer/CustomerManagementFarmer";
import FarmerProducts from "./views/farmer/ProductManagementFarmer";
import FarmerCategories from "./views/farmer/CategoryManagementFarmer";
import FarmerNotifications from "./views/farmer/FarmerNotification";
import FarmerSettings from "./views/farmer/FarmerSetting";

import { logoutUser } from "./stores/api";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("kh");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is a farmer route
  const isFarmerRoute = location.pathname.startsWith('/farmer');
  
  // Check if user is a farmer (handles both userData.role and userData.role.name)
  const isFarmer = userData?.role === 'farmer' || userData?.role?.name === 'farmer';

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUserData = localStorage.getItem("user_data");
    if (token && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);
        
        // Auto-redirect farmer to dashboard after login
        const userRole = parsedUserData.role?.name || parsedUserData.role;
        if (userRole === 'farmer' && !location.pathname.startsWith('/farmer')) {
          navigate('/farmer/dashboard');
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        setIsLoggedIn(false);
        setUserData(null);
      }
    }
  }, [navigate, location.pathname]);

  // Redirect non-farmers away from farmer routes
  useEffect(() => {
    if (isFarmerRoute && isLoggedIn && !isFarmer) {
      navigate('/');
    }
  }, [isFarmerRoute, isLoggedIn, isFarmer, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUserData(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    }
  };

  // Determine which layout to render based on conditions
  if (isFarmerRoute && isFarmer) {
    return (
      <FarmerLayout
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        userData={userData}
        handleLogout={handleLogout}
      >
        <Routes>
          <Route path="/farmer/dashboard" element={<FarmerDashboard currentLanguage={currentLanguage} />} />
          <Route path="/farmer/orders" element={<FarmerOrders currentLanguage={currentLanguage} />} />
          <Route path="/farmer/customers" element={<FarmerCustomers currentLanguage={currentLanguage} />} />
          <Route path="/farmer/products" element={<FarmerProducts currentLanguage={currentLanguage} />} />
          <Route path="/farmer/categories" element={<FarmerCategories currentLanguage={currentLanguage} />} />
          <Route path="/farmer/notifications" element={<FarmerNotifications currentLanguage={currentLanguage} />} />
          <Route path="/farmer/settings" element={<FarmerSettings currentLanguage={currentLanguage} />} />
        </Routes>
      </FarmerLayout>
    );
  }

  return (
    <PublicLayout
      currentLanguage={currentLanguage}
      setCurrentLanguage={setCurrentLanguage}
    >
      <Routes>
        <Route
          path="/"
          element={<Home currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />}
        />
        <Route path="/products" element={<Products currentLanguage={currentLanguage} />} />
        <Route path="/about" element={<About currentLanguage={currentLanguage} />} />
        <Route path="/learning-center" element={<LearningCenter currentLanguage={currentLanguage} />} />
        <Route path="/contact" element={<Contact currentLanguage={currentLanguage} />} />
        <Route
          path="/register"
          element={
            <RegisterForm
              currentLanguage={currentLanguage}
              setIsLoggedIn={setIsLoggedIn}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              currentLanguage={currentLanguage}
              setIsLoggedIn={setIsLoggedIn}
              setUserData={setUserData}
            />
          }
        />
        {/* Access denied for farmer routes accessed by non-farmers */}
        {isFarmerRoute && !isFarmer && (
          <Route
            path="/farmer/*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                  <p className="text-gray-600">You don't have permission to access this page.</p>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </PublicLayout>
  );
}

export default App;