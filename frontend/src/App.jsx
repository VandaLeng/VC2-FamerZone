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
import AdminLayout from "./layouts/AdminLayout";
// Farmer System
import FarmerDashboard from "./views/farmer/DashboardFarmer";
import FarmerOrders from "./views/farmer/OrderManagementFarmer";
import FarmerCustomers from "./views/farmer/CustomerManagementFarmer";
import FarmerProducts from "./views/farmer/ProductManagementFarmer";
import FarmerCategories from "./views/farmer/CategoryManagementFarmer";
import FarmerNotifications from "./views/farmer/FarmerNotification";
import FarmerSettings from "./views/farmer/FarmerSetting";

// Admin System
import AdminDashboard from "./views/admin/AdminDashboard"; 
import AdminFarmerListManagement from "./views/admin/AdminFarmerListManagement"; 
import AdminProductManagement from "./views/admin/AdminProductManagement"; 
import AdminCategoryManagement from "./views/admin/AdminCategoryManagement"; 
import AdminUserManagement from "./views/admin/AdminUserManagement";
import AdminVideoManagement from "./views/admin/AdminVideoManagement"; // New import

// Api
import { logoutUser } from "./stores/api";

import { ProductProvider } from './services/ProductContext';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("kh");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isFarmerRoute = location.pathname.startsWith('/farmer');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isFarmer = userData?.role === 'farmer' || userData?.role?.name === 'farmer';
  const isAdmin = userData?.role === 'admin' || userData?.role?.name === 'admin';

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUserData = localStorage.getItem("user_data");
    if (token && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);

        const userRole = parsedUserData.role?.name || parsedUserData.role;
        if (userRole === 'admin' && !location.pathname.startsWith('/admin')) {
          navigate('/admin/dashboard');
        } else if (userRole === 'farmer' && !location.pathname.startsWith('/farmer')) {
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
    if (isAdminRoute && isLoggedIn && !isAdmin) {
      navigate('/');
    }
  }, [isFarmerRoute, isAdminRoute, isLoggedIn, isFarmer, isAdmin, navigate]);

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

  if (isAdminRoute && isAdmin) {
    return (
      <ProductProvider>
        <AdminLayout
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          userData={userData}
          handleLogout={handleLogout}
        >
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard currentLanguage={currentLanguage} userData={userData} />} />
            <Route path="/admin/farmer_list" element={<AdminFarmerListManagement currentLanguage={currentLanguage} userData={userData} />} />
            <Route path="/admin/product_list" element={<AdminProductManagement currentLanguage={currentLanguage} userData={userData} />} />
            <Route path="/admin/category_list" element={<AdminCategoryManagement currentLanguage={currentLanguage} userData={userData} />} />
            <Route path="/admin/user_list" element={<AdminUserManagement currentLanguage={currentLanguage} userData={userData} />} />
            <Route path="/admin/video_management" element={<AdminVideoManagement currentLanguage={currentLanguage} userData={userData} />} />
          </Routes>
        </AdminLayout>
      </ProductProvider>
    );
  }

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
          
          {isAdminRoute && !isAdmin && (
            <Route
              path="/admin/*"
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
    </ProductProvider>
  );
}

export default App;