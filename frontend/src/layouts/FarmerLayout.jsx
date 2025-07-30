import React from "react";
import FarmerSidebar from "../components/FarmerSidebar"; 
// Back to top
// import BackToTopButton from "../components/BackToTop";

const FarmerLayout = ({ currentLanguage, setCurrentLanguage, userData, handleLogout, children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen">
      <FarmerSidebar
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        userData={userData}
        handleLogout={handleLogout}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main
        className={`flex-1 pt-2 p-4 transition-all duration-300 ease-in-out ${isCollapsed ? "ml-20" : "ml-72"
          } overflow-auto bg-gray-50`}
      >
        {children}
      </main>
      {/* <BackToTopButton /> */}
    </div>
  );
};

export default FarmerLayout;