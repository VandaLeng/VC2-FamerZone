// AdminSidebar component (unchanged)
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Package, LayoutGrid, Bell, Settings, LogOut, User, X, UserCheck, Video } from 'lucide-react';

const AdminSidebar = ({
  userData = { name: "Admin User" },
  handleLogout = () => console.log("Logout"),
  isCollapsed = false,
  setIsCollapsed = () => {},
  notificationCount = 0,
}) => {
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogoutClick = () => {
    if (handleLogout) {
      console.log("Attempting to log out...");
      try {
        handleLogout();
        console.log("Logout function called successfully.");
      } catch (error) {
        console.error("Logout failed:", error.message || "Unknown error");
      }
    } else {
      console.error("handleLogout prop is not provided or is undefined.");
    }
  };

  return (
    <div
      className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20 md:w-20" : "w-72"
      } h-screen flex flex-col fixed left-0 top-0 z-50 overflow-hidden ${isCollapsed ? "hidden md:block" : ""}`}
    >
      {/* Header */}
      <div className="pt-6 pb-6 p-3 border-b border-gray-100 flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${isCollapsed ? "justify-center w-full" : ""}`}>
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <span className="font-bold text-xl">A</span>
          </button>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl text-gray-800 font-bold">FramerZone</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-100">
            <X size={24} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* Profile Section */}
      {!isCollapsed && (
        <div className="pt-6 pb-6 p-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">{userData?.name || "Admin User"}</h3>
              <p className="text-sm text-gray-500">System Administrator</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {[
          
          { 
            id: "dashboard", 
            label: "Dashboard", 
            icon: LayoutDashboard, 
            path: "/admin/dashboard",
          },
          { 
            id: "users", 
            label: "Manage Users", 
            icon: Users, 
            path: "/admin/user_list",
          },
          { 
            id: "products", 
            label: "Manage Products", 
            icon: Package, 
            path: "/admin/product_list",
          },
          { 
            id: "categories", 
            label: "Manage Categories", 
            icon: LayoutGrid, 
            path: "/admin/category_list",
          },
          {
            id: "videos",
            label: "Manage Videos",
            icon: Video,
            path: "/admin/video_management",
          },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "bg-green-100 text-green-800 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon 
                size={20} 
                className={`${
                  isActive 
                    ? "text-green-700" 
                    : "text-gray-500 group-hover:text-gray-700"
                } transition-colors duration-200`} 
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium block truncate">{item.label}</span>
                  {item.description && (
                    <span className="text-xs text-gray-400 block truncate mt-0.5">
                      {item.description}
                    </span>
                  )}
                </div>
              )}
              {item.badge && !isCollapsed && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* System Stats Section (Only when expanded) */}
      {!isCollapsed && (
        <div className="p-3 mx-2 bg-gradient-to-r from-green-50 to-green-100 rounded-lg mb-2">
          <h4 className="text-xs font-semibold text-green-800 mb-2">System Status</h4>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-green-700">Total Farmers</span>
              <span className="text-xs font-medium text-green-800">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-green-700">Total Products</span>
              <span className="text-xs font-medium text-green-800">892</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-green-700">Total Users</span>
              <span className="text-xs font-medium text-green-800">2,341</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Menu Items */}
      <div className="p-2 space-y-1 border-t border-gray-100">
        {[
          { 
            id: "logout", 
            label: "Logout", 
            icon: LogOut, 
            path: "/", 
            onClick: handleLogoutClick, 
            isButton: true 
          },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isLogout = item.id === "logout";
          return item.isButton ? (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left transition-all duration-200 ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : isLogout
                  ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon 
                size={20} 
                className={
                  isActive 
                    ? "text-green-700" 
                    : isLogout 
                    ? "text-red-500" 
                    : "text-gray-500"
                } 
              />
              {!isCollapsed && <span className="text-sm font-medium flex-1">{item.label}</span>}
              {item.badge > 0 && !isCollapsed && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                  {item.badge}
                </span>
              )}
            </button>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-green-100 text-green-800" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon 
                size={20} 
                className={
                  isActive 
                    ? "text-green-700" 
                    : "text-gray-500"
                } 
              />
              {!isCollapsed && <span className="text-sm font-medium flex-1">{item.label}</span>}
              {item.badge > 0 && !isCollapsed && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;