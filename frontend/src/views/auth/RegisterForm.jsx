"use client"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { registerUser } from "../../stores/api"

export default function RegisterForm({ currentLanguage = "en", onClose, setIsLoggedIn, setUserData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer", 
    phone: "",
    address: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
        buyer: "អ្នកទិញ (ក្រុមគ្រួសារ)",
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
        buyer: "Buyer (Family/Consumer)",
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

  // read role from URL query param to preselect farmer if provided
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam && (roleParam === "farmer" || roleParam === "buyer")) {
      setFormData((prev) => ({ ...prev, role: roleParam }));
    }
  }, [location.search]);

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
      
      if (data && data.access_token) {
        localStorage.setItem("auth_token", data.access_token)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        
        const userData = {
          id: data.user.id,
          name: data.user.name || formData.name,
          email: data.user.email || formData.email,
          role: data.user.role || formData.role,
          phone: data.user.phone || formData.phone,
          address: data.user.address || formData.address,
          ...data.user
        }
        
        setIsLoggedIn(true)
        setUserData(userData)
        
        alert(currentTexts.registerSuccess)
        
        if (onClose) {
          onClose()
        } else {
          navigate("/")
        }
      } else {
        throw new Error("Registration successful but no access token received.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      const errorMsg = error.message || currentTexts.registerFailed
      setErrors({ general: typeof errorMsg === "string" ? errorMsg : currentTexts.registerFailed })
      alert(errorMsg)
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
          {/* form inputs omitted for brevity; keep as in original */}
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
