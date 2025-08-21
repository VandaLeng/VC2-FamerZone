import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, BrowserRouter as Router } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

// User Website
import Home from "./views/user/HomePage";
import Products from "./views/user/ProductPage";
import About from "./views/user/AboutPage";
import LearningCenter from "./views/user/LearningCenterPage";
import Contact from "./views/user/ContactPage";
import BuyerCart from "./views/buyer/BuyerCart";
// Auth
import RegisterForm from "./views/auth/RegisterForm";
import LoginForm from "./views/auth/LoginForm";
// Layout
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
import VideoProductManagement from "./views/farmer/VideoProductManagement";
// Api
import { logoutUser } from "./stores/api";

import { ProductProvider } from './services/ProductContext';
import ProductsPage from '../src/views/user/ProductPage';
import ProductManagement from '../src/views/farmer/ProductManagementFarmer';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("kh");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isFarmerRoute = location.pathname.startsWith('/farmer');
  const isFarmer = userData?.role === 'farmer' || userData?.role?.name === 'farmer';

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUserData = localStorage.getItem("user_data");
    if (token && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);

        const userRole = parsedUserData.role?.name || parsedUserData.role;
        if (userRole === 'farmer' && !location.pathname.startsWith('/farmer')) {
          navigate('/farmer/dashboard');
        }
      } catch (e) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        setIsLoggedIn(false);
        setUserData(null);
      }
    }
  }, [navigate, location.pathname]);

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
      alert("Logout failed: " + error.message);
    }
  };

  if (isFarmerRoute && isFarmer) {
    return (
      <ProductProvider>
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
            <Route path="/farmer/video-product" element={<VideoProductManagement currentLanguage={currentLanguage} />} />
          </Routes>
        </FarmerLayout>
      </ProductProvider>
    );
  }

  return (
    <ProductProvider>
      <PublicLayout
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleLogout={handleLogout}
        isFarmer={isFarmer}
      >
        <Routes>
          <Route path="/" element={<Home currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />} />
          <Route path="/products" element={<Products currentLanguage={currentLanguage} />} />
          <Route path="/about" element={<About currentLanguage={currentLanguage} />} />
          <Route path="/learning-center" element={<LearningCenter currentLanguage={currentLanguage} />} />
          <Route path="/contact" element={<Contact currentLanguage={currentLanguage} />} />
          <Route path="/cart" element={<BuyerCart currentLanguage={currentLanguage} />} />
          <Route path="/register" element={<RegisterForm currentLanguage={currentLanguage} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
          <Route path="/login" element={<LoginForm currentLanguage={currentLanguage} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />

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

          <Route path="/manage-products" element={<ProductManagement />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </PublicLayout>
    </ProductProvider>
  );
}

export default App;