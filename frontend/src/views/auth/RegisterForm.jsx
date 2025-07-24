"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../stores/api"

export default function RegisterForm({ currentLanguage = "en", onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    phone: "",
    address: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const texts = {
    kh: {
      title: "ចុះឈ្មោះ",
      subtitle: "បង្កើតគណនីរបស់អ្នកនៅ FramerZone",
      name: "ឈ្មោះ",
      namePlaceholder: "បញ្ចូលឈ្មោះរបស់អ្នក",
      email: "អ៊ីមែល",
      emailPlaceholder: "your@email.com",
      password: "លេខសម្ងាត់",
      passwordPlaceholder: "បង្កើតលេខសម្ងាត់",
      confirmPassword: "បញ្ជាក់លេខសម្ងាត់",
      confirmPasswordPlaceholder: "បញ្ជាក់លេខសម្ងាត់របស់អ្នក",
      role: "តួនាទី",
      phone: "លេខទូរស័ព្ទ",
      phonePlaceholder: "+855 12 345 678",
      address: "អាសយដ្ឋាន",
      addressPlaceholder: "បញ្ចូលអាសយដ្ឋានរបស់អ្នក",
      register: "ចុះឈ្មោះ",
      alreadyHaveAccount: "មានគណនីហើយ?",
      signIn: "ចូលប្រើ",
      roles: {
        user: "អ្នកទិញ (ក្រុមគ្រួសារ)",
        farmer: "កសិករ (អ្នកលក់)",
      },
      passwordRequirements: "លេខសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់៨តួរអក្សរ",
      creating: "កំពុងបង្កើតគណនី...",
      close: "បិទ",
      registerSuccess: "ការចុះឈ្មោះជោគជ័យ!",
      registerFailed: "ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្តងទៀត។",
    },
    en: {
      title: "Create Account",
      subtitle: "Join the FramerZone community",
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "Create a strong password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      role: "I am a",
      phone: "Phone Number",
      phonePlaceholder: "+855 12 345 678",
      address: "Address",
      addressPlaceholder: "Enter your address",
      register: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign In",
      roles: {
        user: "Buyer (Family/Consumer)",
        farmer: "Farmer (Seller)",
      },
      passwordRequirements: "Password must be at least 8 characters long",
      creating: "Creating account...",
      close: "Close",
      registerSuccess: "Registration successful!",
      registerFailed: "Registration failed. Please try again.",
    },
  }

  const currentTexts = texts[currentLanguage]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = currentLanguage === "kh" ? "ត្រូវការឈ្មោះ" : "Name is required"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = currentLanguage === "kh" ? "ត្រូវការអ៊ីមែល" : "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = currentLanguage === "kh" ? "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ" : "Please enter a valid email"
    }
    if (!formData.password) {
      newErrors.password = currentLanguage === "kh" ? "ត្រូវការលេខសម្ងាត់" : "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password =
        currentLanguage === "kh" ? "លេខសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៨ តួអក្សរ" : "Password must be at least 8 characters"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === "kh" ? "សូមបញ្ជាក់លេខសម្ងាត់" : "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === "kh" ? "លេខសម្ងាត់មិនត្រូវគ្នា" : "Passwords do not match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: formData.role,
        phone: formData.phone || null,
        address: formData.address || null,
      })
      alert(currentTexts.registerSuccess)
      if (data && data.access_token) {
        localStorage.setItem("auth_token", data.access_token)
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            name: data.user.name,
            email: data.user.email,
          }),
        )
      }
      if (onClose) {
        onClose()
      } else {
        navigate("/")
      }
    } catch (error) {
      const errorMsg = error.message || currentTexts.registerFailed
      setErrors({ general: typeof errorMsg === "string" ? errorMsg : currentTexts.registerFailed })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    navigate("/login")
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-t-2xl mb-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-green-200 transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66C8.24 14.6 11.79 12 16.8 12c3.47 0 6.2-2.8 6.2-6.25S20.27 0 16.8 0C11.79 0 8.24 2.6 5.66 7.34L7.55 8c.95-2.66 3.14-4.32 5.73-4.32 2.4 0 4.32 1.6 4.32 3.57S19.68 11 17.28 11c-3.47 0-6.2 2.8-6.2 6.25v.57c0 .31.25.57.57.57s.57-.25.57-.57v-.57c0-2.4 1.92-4.32 4.32-4.32S20.86 15.6 20.86 18s-1.92 4.32-4.32 4.32-4.32-1.92-4.32-4.32" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentTexts.title}</h2>
              <p className="text-green-100 text-sm">{currentTexts.subtitle}</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.name} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={currentTexts.namePlaceholder}
                  className="w-full pl-10 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 border-gray-200 hover:border-gray-300"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.email} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={currentTexts.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 border-gray-200 hover:border-gray-300"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.password} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={currentTexts.passwordPlaceholder}
                  className="w-full pl-10 pr-10 py-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 border-gray-200 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">{currentTexts.passwordRequirements}</p>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.confirmPassword} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={currentTexts.confirmPasswordPlaceholder}
                  className="w-full pl-10 pr-10 py-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 border-gray-200 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentTexts.role} <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="role-user"
                  name="role"
                  type="radio"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label htmlFor="role-user" className="ml-3 flex items-center cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{currentTexts.roles.user}</span>
                  </div>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="role-farmer"
                  name="role"
                  type="radio"
                  value="farmer"
                  checked={formData.role === "farmer"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label htmlFor="role-farmer" className="ml-3 flex items-center cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{currentTexts.roles.farmer}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{currentTexts.phone}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={currentTexts.phonePlaceholder}
                  className="w-full pl-10 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 border-gray-200 hover:border-gray-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{currentTexts.address}</label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <textarea
                  name="address"
                  rows={4}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={currentTexts.addressPlaceholder}
                  className="w-full pl-10 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 resize-none border-gray-200 hover:border-gray-300"
                />
              </div>
            </div>
          </div>
          {errors.general && <p className="text-sm text-red-600 text-center">{errors.general}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{currentTexts.creating}</span>
                </div>
              ) : (
                currentTexts.register
              )}
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {currentTexts.alreadyHaveAccount}{" "}
              <button
                type="button"
                onClick={handleSignIn}
                className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
              >
                {currentTexts.signIn}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}