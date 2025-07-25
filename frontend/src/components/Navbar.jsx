import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavbarStyle.css';

export default function Navbar({ currentLanguage, setCurrentLanguage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'kh' ? 'en' : 'kh');
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const texts = {
    kh: {
      home: 'ទំព័រដើម',
      products: 'ផលិតផល',
      about: 'អំពីពួកយើង',
      learningCenter: 'មជ្ឈមណ្ឌលសិក្សា',
      contact: 'ទំនាក់ទំនង',
      login: 'ចូលប្រើ',
      register: 'ចុះឈ្មោះ',
      phone: '+855 (0) 12 345 678',
      profile: 'ប្រវត្តិរូប',
      settings: 'ការកំណត់',
      orders: 'ការបញ្ជាទិញ',
      logout: 'ចាកចេញ',
      dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    },
    en: {
      home: 'Home',
      products: 'Products',
      about: 'About Us',
      learningCenter: 'Learning Center',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      phone: '+855 (0) 12 345 678',
      profile: 'Profile',
      settings: 'Settings',
      orders: 'Orders',
      logout: 'Logout',
      dashboard: 'Dashboard',
    },
  };

  const currentTexts = texts[currentLanguage];

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2.5 rounded-full shadow-lg">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66C8.24 14.6 11.79 12 16.8 12c3.47 0 6.2-2.8 6.2-6.25S20.27 0 16.8 0C11.79 0 8.24 2.6 5.66 7.34L7.55 8c.95-2.66 3.14-4.32 5.73-4.32 2.4 0 4.32 1.6 4.32 3.57S19.68 11 17.28 11c-3.47 0-6.2 2.8-6.2 6.25v.57c0 .31.25.57.57.57s.57-.25.57-.57v-.57c0-2.4 1.92-4.32 4.32-4.32S20.86 15.6 20.86 18s-1.92 4.32-4.32 4.32-4.32-1.92-4.32-4.32" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">
              <span className="text-green-600">Framer</span>
              <span className="text-gray-700">Zone</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === '/' ? 'active' : ''}`}
            >
              {currentTexts.home}
            </Link>
            <Link
              to="/products"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === '/products' ? 'active' : ''}`}
            >
              {currentTexts.products}
            </Link>
            <Link
              to="/about"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === '/about' ? 'active' : ''}`}
            >
              {currentTexts.about}
            </Link>
            <Link
              to="/learning-center"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === '/learning-center' ? 'active' : ''}`}
            >
              {currentTexts.learningCenter}
            </Link>
            <Link
              to="/contact"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              {currentTexts.contact}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-600 hover:text-green-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span>{currentLanguage === 'kh' ? 'EN' : 'ខ្មែរ'}</span>
            </button>

            {/* User Profile or Login/Register Buttons */}
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">U</span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm hidden lg:block">User</span>
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">U</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">User</p>
                          <p className="text-gray-500 text-xs">user@example.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5a2 2 0 012-2h2a2 2 0 012 2v6H8V5z"
                          />
                        </svg>
                        {currentTexts.dashboard}
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {currentTexts.profile}
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
                          />
                        </svg>
                        {currentTexts.orders}
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {currentTexts.settings}
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        {currentTexts.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {currentTexts.register}
                </button>
                <button
                  onClick={handleLogin}
                  className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-green-50"
                >
                  {currentTexts.login}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200 p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-4 pb-3 space-y-1 bg-white">
              <Link
                to="/"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === '/' ? 'active' : ''}`}
              >
                {currentTexts.home}
              </Link>
              <Link
                to="/products"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === '/products' ? 'active' : ''}`}
              >
                {currentTexts.products}
              </Link>
              <Link
                to="/about"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === '/about' ? 'active' : ''}`}
              >
                {currentTexts.about}
              </Link>
              <Link
                to="/learning-center"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === '/learning-center' ? 'active' : ''}`}
              >
                {currentTexts.learningCenter}
              </Link>
              <Link
                to="/contact"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                {currentTexts.contact}
              </Link>

              <div className="px-3 py-4 border-t border-gray-100 mt-4 space-y-3">
                {isLoggedIn && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">U</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">User</p>
                        <p className="text-gray-500 text-xs">user@example.com</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                    >
                      {currentTexts.dashboard}
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                    >
                      {currentTexts.profile}
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                    >
                      {currentTexts.orders}
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                    >
                      {currentTexts.settings}
                    </Link>
                  </div>
                )}

                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center space-x-2 w-full px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-600 hover:text-green-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  <span>{currentLanguage === 'kh' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'}</span>
                </button>

                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{currentTexts.phone}</span>
                </div>

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
                  >
                    {currentTexts.logout}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleRegister}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
                    >
                      {currentTexts.register}
                    </button>
                    <button
                      onClick={handleLogin}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-200"
                    >
                      {currentTexts.login}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}