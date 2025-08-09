import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // global styles or Tailwind if installed
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( <
    React.StrictMode >
    <
    Router >
    <
    App / >
    <
    /Router> <
    /React.StrictMode>
);