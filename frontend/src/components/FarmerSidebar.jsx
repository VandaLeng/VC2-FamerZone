import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  LayoutGrid, // Replaced Grid3X3 with LayoutGrid
  Bell,
  Settings,
  LogOut,
  User,
  X,
} from "lucide-react";

const FarmerSidebar = ({
  currentLanguage,
  setCurrentLanguage,
  userData,
  handleLogout,
  isCollapsed,
  setIsCollapsed,
}) => {
  const location = useLocation();

  // Define internalCollapsed state to handle collapse if external prop not provided
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Use external collapse state if provided, otherwise fallback to internal state
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalCollapsed;
  const setCollapsed = setIsCollapsed !== undefined ? setIsCollapsed : setInternalCollapsed;

  const texts = {
    kh: {
      dashboard: "ផ្ទាំងគ្រប់គ្រង",
      orders: "ការបញ្ជាទិញ",
      customers: "ការគ្រប់គ្រងអតិថិជន",
      products: "ការគ្រប់គ្រងផលិតផល",
      categories: "ការគ្រប់គ្រងប្រភេទ",
      notifications: "ការជូនដំណឹង",
      settings: "ការកំណត់",
      logout: "ចាកចេញ",
      framerZone: "FramerZone",
      farmerPanel: "ផ្ទាំងកសិករ",
      premiumFarmer: "កសិករពិសេស",
    },
    en: {
      dashboard: "Dashboard",
      orders: "Order Management",
      customers: "Customer Management",
      products: "Product Management",
      categories: "Category Management",
      notifications: "Notifications",
      settings: "Settings",
      logout: "Logout",
      framerZone: "FramerZone",
      farmerPanel: "Farmer Panel",
      premiumFarmer: "Premium Farmer",
    },
  };

  const currentTexts = texts[currentLanguage];

  const bottomMenuItems = [
    { id: "dashboard", label: currentTexts.dashboard, icon: LayoutDashboard, path: "/farmer/dashboard" },
    { id: "orders", label: currentTexts.orders, icon: ShoppingCart, path: "/farmer/orders", badge: "3" },
    { id: "customers", label: currentTexts.customers, icon: Users, path: "/farmer/customers" },
    { id: "products", label: currentTexts.products, icon: Package, path: "/farmer/products" },
    { id: "categories", label: currentTexts.categories, icon: LayoutGrid, path: "/farmer/categories" },
    { id: "notifications", label: currentTexts.notifications, icon: Bell, path: "/farmer/notifications", badge: "2" },
    { id: "settings", label: currentTexts.settings, icon: Settings, path: "/farmer/settings" },
    { id: "logout", label: currentTexts.logout, icon: LogOut, path: "/", onClick: handleLogout, isButton: true },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "kh" : "en");
  };

  return (
    <div
      className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-72"
      } h-screen flex flex-col fixed left-0 top-0 z-50 overflow-hidden`}
    >
      {/* Header */}
      <div className="pt-6 pb-6 p-3 border-b border-gray-100 flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${collapsed ? "justify-center w-full" : ""}`}>
          <button
            onClick={collapsed ? toggleSidebar : undefined}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <span className="font-bold text-xl">F</span>
          </button>
          {!collapsed && (
            <div>
              <h1 className="text-xl text-gray-800 font-bold">{currentTexts.framerZone}</h1>
              <p className="text-sm text-gray-500">{currentTexts.farmerPanel}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
            >
              {currentLanguage.toUpperCase()}
            </button>
            <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Profile Section */}
      {!collapsed && (
        <div className="pt-6 pb-6 p-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">{userData?.name || "John Farmer"}</h3>
              <p className="text-sm text-gray-500">{currentTexts.premiumFarmer}</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {bottomMenuItems.slice(0, -3).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-2 px-2 py-2 rounded-md transition-colors duration-200 ${
                isActive ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} className={isActive ? "text-green-800" : "text-gray-400"} />
              {!collapsed && <span className="text-base font-medium flex-1">{item.label}</span>}
              {item.badge && !collapsed && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Menu Items */}
      <div className="p-2 space-y-1 border-t border-gray-100">
        {bottomMenuItems.slice(-3).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isLogout = item.id === "logout";
          return item.isButton ? (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex items-center space-x-2 px-2 py-2 rounded-md w-full text-left transition-colors duration-200 ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : isLogout
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} className={isActive ? "text-green-800" : isLogout ? "text-red-500" : "text-gray-400"} />
              {!collapsed && <span className="text-base font-medium flex-1">{item.label}</span>}
              {item.badge && !collapsed && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600">{item.badge}</span>
              )}
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-2 px-2 py-2 rounded-md transition-colors duration-200 ${
                isActive ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} className={isActive ? "text-green-800" : "text-gray-400"} />
              {!collapsed && <span className="text-base font-medium flex-1">{item.label}</span>}
              {item.badge && !collapsed && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerSidebar;
