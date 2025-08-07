"use client"
import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "../styles/NavbarStyle.css"
import { useCart } from "../services/cartContext"; // Ensure this import is present

export default function Navbar({ currentLanguage, setCurrentLanguage, isLoggedIn, userData, handleLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems } = useCart(); // Get cart state

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "kh" ? "en" : "kh")
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogin = () => {
    navigate("/login")
    setIsMobileMenuOpen(false)
  }

  const handleRegister = () => {
    navigate("/register")
    setIsMobileMenuOpen(false)
  }

  const handleCart = () => {
    navigate("/cart")
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const texts = {
    kh: {
      home: "ទំព័រដើម",
      products: "ផលិតផល",
      about: "អំពីពួកយើង",
      learningCenter: "មជ្ឈមណ្ឌលសិក្សា",
      contact: "ទំនាក់ទំនង",
      login: "ចូលប្រើ",
      register: "ចុះឈ្មោះ",
      profile: "ប្រវត្តិរូប",
      settings: "ការកំណត់",
      orders: "ការបញ្ជាទិញ",
      logout: "ចាកចេញ",
      dashboard: "ផ្ទាំងគ្រប់គ្រង",
      switchLang: "ប្តូរទៅភាសាអង់គ្លេស",
      cart: "រទេះទិញឥវ៉ាន់",
    },
    en: {
      home: "Home",
      products: "Products",
      about: "About Us",
      learningCenter: "Learning Center",
      contact: "Contact",
      login: "Login",
      register: "Register",
      profile: "Profile",
      settings: "Settings",
      orders: "Orders",
      logout: "Logout",
      dashboard: "Dashboard",
      switchLang: "Switch to Khmer",
      cart: "Cart",
    },
  }
  const currentTexts = texts[currentLanguage]

  const userInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : "U"
  const userName = userData?.name || "User"
  const userEmail = userData?.email || "user@example.com"

  // Calculate cart item count based on number of unique items
  const cartItemCount = cartItems.length;

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2.5 rounded-full shadow-lg">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66C8.24 14.6 11.79 12 16.8 12c3.47 0 6.2-2.8 6.2-6.25S20.27 0 16.8 0C11.79 0 8.24 2.6 5.66 7.34L7.55 8c.95-2.66 3.14-4.32 5.73-4.32 2.4 0 4.32 1.6 4.32 3.57S19.68 11 17.28 11c-3.47 0-6.2 2.8-6.2 6.25v.57c0 .31.25.57.57.57s.57-.25.57-.57v-.57c0-2.4 1.92-4.32 4.32-4.32S20.86 15.6 20.86 18s-1.92 4.32-4.32 4.32-4.32-1.92-4.32-4.32" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">
              <span className="text-green-600">Farmer</span>
              <span className="text-gray-700">Zone</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === "/" ? "active" : ""}`}
            >
              {currentTexts.home}
            </Link>
            <Link
              to="/products"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === "/products" ? "active" : ""}`}
            >
              {currentTexts.products}
            </Link>
            <Link
              to="/about"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === "/about" ? "active" : ""}`}
            >
              {currentTexts.about}
            </Link>
            <Link
              to="/learning-center"
              className={`nav-link text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${location.pathname === "/learning-center" ? "active" : ""}`}
            >
              {currentTexts.learningCenter}
            </Link>
            <Link
              to="/contact"
              className={`nav-link text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium text-sm tracking-wide ${location.pathname === "/contact" ? "active" : ""}`}
            >
              {currentTexts.contact}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/cart"
              onClick={handleCart}
              className="relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-600 hover:text-green-600 group"
              title={currentTexts.cart}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </a>
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
              <span>{currentLanguage === "kh" ? "EN" : "ខ្មែរ"}</span>
            </button>

            {isLoggedIn && userData ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">{userInitial}</span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm hidden lg:block">{userName}</span>
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
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
                          <span className="text-green-600 font-semibold">{userInitial}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{userName}</p>
                          <p className="text-gray-500 text-xs">{userEmail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
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
                        onClick={() => {
                          handleLogout()
                          setIsProfileOpen(false)
                        }}
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

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleCart}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.034-.864 2.034-1.929 0-.66-.45-1.25-.965-1.56L13.5 7.78c-.72-.3-1.5-.3-2.22 0L5.06 10.89c-.515.31-.965.9-.965 1.56 0 1.065.913 1.929 2.034 1.929z"
                />
                <circle cx="8.25" cy="20.25" r="0.75" fill="currentColor" />
                <circle cx="18.75" cy="20.25" r="0.75" fill="currentColor" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

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

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-4 pb-3 space-y-1 bg-white">
              <Link
                to="/"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentTexts.home}
              </Link>
              <Link
                to="/products"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === "/products" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentTexts.products}
              </Link>
              <Link
                to="/about"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === "/about" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentTexts.about}
              </Link>
              <Link
                to="/learning-center"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === "/learning-center" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentTexts.learningCenter}
              </Link>
              <Link
                to="/contact"
                className={`nav-link block px-3 py-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium ${location.pathname === "/contact" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentTexts.contact}
              </Link>

              <div className="px-3 py-4 border-t border-gray-100 mt-4 space-y-3">
                {isLoggedIn && userData ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">{userInitial}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{userName}</p>
                        <p className="text-gray-500 text-xs">{userEmail}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {currentTexts.dashboard}
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {currentTexts.profile}
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {currentTexts.orders}
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {currentTexts.settings}
                    </Link>
                  </div>
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
                  <span>{currentLanguage === "kh" ? "Switch to English" : "ប្តូរទៅភាសាខ្មែរ"}</span>
                </button>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
                  >
                    {currentTexts.logout}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}