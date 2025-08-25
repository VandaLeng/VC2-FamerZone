import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children, currentLanguage, setCurrentLanguage, userData, handleLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        userData={userData}
        handleLogout={handleLogout}
        isCollapsed={!isSidebarOpen}
        setIsCollapsed={setIsSidebarOpen}
        notificationCount={0}
      />

      {/* Mobile Sidebar Toggle */}
      <div className={`${isSidebarOpen ? "hidden" : "block"} md:hidden p-4 fixed top-0 left-0 z-50`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "md:ml-72" : "md:ml-20"} transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}