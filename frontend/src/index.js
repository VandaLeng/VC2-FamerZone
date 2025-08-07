import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // global styles or Tailwind if installed
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./services/cartContext"; // Import CartProvider (adjust path if needed)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);