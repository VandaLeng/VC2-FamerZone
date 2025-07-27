"use client";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/user/HomePage";
import Products from "./views/user/ProductPage";
import About from "./views/user/AboutPage";
import LearningCenter from "./views/user/LearningCenterPage";
import Contact from "./views/user/ContactPage";
import Footer from "./components/Footer";
import RegisterForm from "./views/auth/RegisterForm";
import LoginForm from "./views/auth/LoginForm";
import { logoutUser } from "./stores/api";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("kh");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUserData = localStorage.getItem("user_data");
    if (token && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        setIsLoggedIn(false);
        setUserData(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUserData(null);
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <>
      <Navbar
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleLogout={handleLogout}
      />
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
      </Routes>
      <Footer currentLanguage={currentLanguage} />
    </>
  );
}

export default App;
