"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../stores/api" // Ensure this path is correct

export default function LoginForm({ currentLanguage = "en", onClose, setIsLoggedIn, setUserData }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const texts = {
    kh: {
      title: "ចូលប្រើគណនី",
      subtitle: "ចូលទៅកាន់ FramerZone",
      email: "អ៊ីមែល",
      emailPlaceholder: "your@email.com",
      password: "លេខសម្ងាត់",
      passwordPlaceholder: "បញ្ចូលលេខសម្ងាត់របស់អ្នក",
      login: "ចូលប្រើ",
      noAccount: "មិនទាន់មានគណនី?",
      register: "ចុះឈ្មោះ",
      loggingIn: "កំពុងចូល...",
      close: "បិទ",
      loginSuccess: "ការចូលជោគជ័យ!",
      loginFailed: "ការចូលបរាជ័យ។ សូមពិនិត្យមើលអ៊ីមែល និងលេខសម្ងាត់របស់អ្នក។",
    },
    en: {
      title: "Login to Account",
      subtitle: "Access your FramerZone account",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      login: "Login",
      noAccount: "Don't have an account?",
      register: "Register",
      loggingIn: "Logging in...",
      close: "Close",
      loginSuccess: "Login successful!",
      loginFailed: "Login failed. Please check your email and password.",
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = currentLanguage === "kh" ? "ត្រូវការអ៊ីមែល" : "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = currentLanguage === "kh" ? "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ" : "Please enter a valid email"
    }
    if (!formData.password) {
      newErrors.password = currentLanguage === "kh" ? "ត្រូវការលេខសម្ងាត់" : "Password is required"
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
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      })
      if (data && data.access_token) {
        // The loginUser function in api.js already handles localStorage.setItem for token and user_data
        setIsLoggedIn(true) // Update global login state
        setUserData(data.user) // Update global user data
        alert(currentTexts.loginSuccess)
        console.log("Login successful. Token stored:", localStorage.getItem("auth_token"))
        console.log("User data stored:", localStorage.getItem("user_data"))
        console.log("Navigating to /")
        if (onClose) {
          onClose()
        } else {
          navigate("/") // Redirect to home page after successful login
        }
      } else {
        throw new Error("Login successful but no access token received.")
      }

    } catch (error) {
      const errorMsg = error.message || currentTexts.loginFailed
      setErrors({ general: typeof errorMsg === "string" ? errorMsg : currentTexts.loginFailed })
      alert(errorMsg) // Show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    navigate("/register")
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
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
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
                  <span>{currentTexts.loggingIn}</span>
                </div>
              ) : (
                currentTexts.login
              )}
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {currentTexts.noAccount}{" "}
              <button
                type="button"
                onClick={handleRegister}
                className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
              >
                {currentTexts.register}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
