import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./services/authContext"; // Adjust path
import { CartProvider } from "./services/cartContext"; // Adjust path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Add AuthProvider at the root */}
        <CartProvider> {/* Nest CartProvider inside AuthProvider */}
          <App />
          <ToastContainer /> {/* Add ToastContainer for global toast notifications */}
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);