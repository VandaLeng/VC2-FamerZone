import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User Website
import Home from "./views/user/HomePage";
import Products from "./views/user/ProductPage";
import About from "./views/user/AboutPage";
import LearningCenter from "./views/user/LearningCenterPage";
import Contact from "./views/user/ContactPage";
import CartPage from "./views/buyer/BuyerCart";
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
// Api
import { logoutUser } from "./stores/api";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("kh");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is a farmer route
  const isFarmerRoute = location.pathname.startsWith('/farmer');
  const isFarmer = userData?.role === 'farmer' || userData?.role?.name === 'farmer';

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUserData = localStorage.getItem("user_data");
    setIsLoading(true); // Start loading
    if (token && storedUserData && !isLoggedIn) { // Only validate if not already logged in
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);

        const validateToken = async () => {
          try {
            const response = await fetch('/api/validate-token', {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Invalid token');
            console.log("User authenticated on app load:", parsedUserData);
            console.log("User role:", parsedUserData.role);

            const userRole = parsedUserData.role?.name || parsedUserData.role;
            if (userRole === 'farmer' && !location.pathname.startsWith('/farmer')) {
              navigate('/farmer/dashboard');
            }
          } catch (error) {
            console.error("Token validation failed:", error);
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_data");
            setIsLoggedIn(false);
            setUserData(null);
            navigate('/login');
          } finally {
            setIsLoading(false); // End loading
          }
        };
        validateToken();
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        setIsLoggedIn(false);
        setUserData(null);
        setIsLoading(false); // End loading
      }
    } else {
      setIsLoading(false); // End loading if no token or already logged in
    }
  }, [navigate, isLoggedIn]); // Removed location.pathname from dependencies

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
      navigate(location.pathname.startsWith('/farmer') ? '/login' : '/');
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Loading state
  }

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
      isLoggedIn={isLoggedIn}
      userData={userData}
      handleLogout={handleLogout}
      isFarmer={isFarmer}
    >
      <Routes>
        <Route
          path="/"
          element={<Home currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />}
        />
        <Route
          path="/products"
          element={<Products currentLanguage={currentLanguage} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/about" element={<About currentLanguage={currentLanguage} />} />
        <Route path="/learning-center" element={<LearningCenter currentLanguage={currentLanguage} />} />
        <Route path="/contact" element={<Contact currentLanguage={currentLanguage} />} />
        <Route path="/cart" element={<CartPage currentLanguage={currentLanguage} />} />
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
        {isFarmerRoute && !isFarmer && (
          <Route
            path="/farmer/*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                  <p className="text-gray-600">You don't have permission to access this page.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Go to Homepage
                  </button>
                </div>
              </div>
            }
          />
        )}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </PublicLayout>
  );
}

export default App;