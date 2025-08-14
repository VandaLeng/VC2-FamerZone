import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../stores/api"; // Adjust path to your API file

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load from localStorage
    const userData = localStorage.getItem("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);

    // Listen for localStorage changes (e.g., from LoginForm or other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "user_data" || e.key === "auth_token") {
        const newUserData = localStorage.getItem("user_data");
        if (newUserData) {
          setUser(JSON.parse(newUserData));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      const newUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role_id: data.user.role_id,
        role: data.user.role,
        roles: data.user.roles,
      };
      setUser(newUser);
      localStorage.setItem("user_data", JSON.stringify(newUser));
      localStorage.setItem("auth_token", data.access_token); // Matches LoginForm's key
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      const newUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role_id: data.user.role_id,
        role: data.user.role,
        roles: data.user.roles,
      };
      setUser(newUser);
      localStorage.setItem("user_data", JSON.stringify(newUser));
      localStorage.setItem("auth_token", data.access_token); // Matches LoginForm's key
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user_data");
      localStorage.removeItem("auth_token");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const isAuthenticated = () => !!user && !!localStorage.getItem("auth_token");

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);