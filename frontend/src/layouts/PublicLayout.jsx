import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTop';

const PublicLayout = ({ 
  children, 
  currentLanguage, 
  setCurrentLanguage,
  isLoggedIn,
  userData,
  handleLogout,
  isFarmer
}) => {
  return (
    <>
      <Navbar 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleLogout={handleLogout}
      />
      <main>
        <Routes>
          {/* Buyer/User protected routes */}
          {isLoggedIn && userData && !isFarmer && (
            <>
              <Route 
                path="/profile" 
                element={
                  <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4">
                      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Role:</strong> {userData.role?.name || userData.role}</p>
                        <p><strong>Phone:</strong> {userData.phone || 'Not provided'}</p>
                        <p><strong>Address:</strong> {userData.address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4">
                      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p>Your order history will appear here.</p>
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4">
                      <h1 className="text-2xl font-bold mb-6">Settings</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p>User settings will appear here.</p>
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4">
                      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p>Welcome back, {userData.name}!</p>
                        <p>This is your buyer dashboard.</p>
                      </div>
                    </div>
                  </div>
                } 
              />
            </>
          )}
          {/* Render children routes passed from App.jsx */}
          <Route path="*" element={children} />
        </Routes>
      </main>
      <Footer currentLanguage={currentLanguage} />
      <BackToTopButton />
    </>
  );
};

export default PublicLayout;