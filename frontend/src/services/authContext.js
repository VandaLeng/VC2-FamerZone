import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../stores/api"; // Adjust path to your API file

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role_id: data.user.role_id,
        role: data.user.role,
        roles: data.user.roles,
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role_id: data.user.role_id,
        role: data.user.role,
        roles: data.user.roles,
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
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