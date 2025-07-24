import { useState, useEffect } from "react"
import '../../styles/HomeStyle.css';

export default function HomePage({ currentLanguage }) {
    const [isVisible, setIsVisible] = useState({})
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Intersection Observer hook for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }))
                    }
                })
            },
            { threshold: 0.1, rootMargin: "50px" },
        )

        // Observe all sections
        const sections = document.querySelectorAll("[data-animate]")
        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    // Language texts
    const texts = {
        kh: {
            // Hero Section
            heroTitle: "ភ្ជាប់កសិករ និងអ្នកទិញ",
            heroSubtitle: "ដោយផ្ទាល់",
            heroDescription: "ទិញផលិតផលកសិកម្មស្រស់ៗ ពីកសិករក្នុងស្រុកដោយផ្ទាល់ តាមរយៈវេទិកាអនឡាញទំនើប",
            heroButton: "ចាប់ផ្តើមទិញ",
            heroSecondaryButton: "សម្រាប់កសិករ",

            // Stats
            activeFarmers: "កសិករសកម្ម",
            freshProducts: "ផលិតផលស្រស់",
            happyCustomers: "អតិថិជនពេញចិត្ត",

            // Features
            featuresTitle: "ហេតុអ្វីត្រូវជ្រើសរើស FramerZone?",
            feature1Title: "ផលិតផលស្រស់ពីកសិករ",
            feature1Desc: "ទទួលបានបន្លែ ផ្លែឈើ និងផលិតផលកសិកម្មស្រស់ៗ ដោយផ្ទាល់ពីកសិករក្នុងស្រុក",
            feature2Title: "គ្មានអ្នកកណ្តាល",
            feature2Desc: "ទំនាក់ទំនងដោយផ្ទាល់រវាងកសិករ និងអ្នកទិញ ធានាតម្លៃសមរម្យ",
            feature3Title: "ការដឹកជញ្ជូនរហ័ស",
            feature3Desc: "ប្រព័ន្ធដឹកជញ្ជូនរហ័ស និងមានប្រសិទ្ធភាព ដល់ទីតាំងរបស់អ្នក",
            feature4Title: "ការទូទាត់ដោយផ្ទាល់",
            feature4Desc: "ទូទាត់ដោយផ្ទាល់ទៅកសិករ ទំនាក់ទំនងតម្លាភាព និងមិត្តភាព",

            // How it works
            howItWorksTitle: "របៀបដំណើរការ",
            step1Title: "រកមើលផលិតផល",
            step1Desc: "ស្វែងរកផលិតផលកសិកម្មពីកសិករក្នុងតំបន់របស់អ្នក",
            step2Title: "បញ្ជាទិញ",
            step2Desc: "ជ្រើសរើសផលិតផល និងធ្វើការបញ្ជាទិញដោយងាយស្រួល",
            step3Title: "ទទួលផលិតផល",
            step3Desc: "ទទួលបានផលិតផលស្រស់ៗ នៅផ្ទះរបស់អ្នក",

            // Categories
            categoriesTitle: "ប្រភេទផលិតផល",
            vegetables: "បន្លែ",
            fruits: "ផ្លែឈើ",
            grains: "គ្រាប់ធញ្ញជាតិ",
            livestock: "សត្វចិញ្ចឹម",

            // Learning Center
            learningTitle: "មជ្ឈមណ្ឌលសិក្សា",
            learningSubtitle: "រៀនបច្ចេកទេសកសិកម្មទំនើប",
            learningDesc: "ស្វែងយល់អំពីបច្ចេកទេសដាំដុះ ការថែទាំដំណាំ និងការគ្រប់គ្រងកសិដ្ឋាន",
            watchVideos: "មើលវីដេអូ",

            // CTA
            ctaTitle: "ចាប់ផ្តើមជាមួយ FramerZone ថ្ងៃនេះ",
            ctaDesc: "ភ្ជាប់ជាមួយកសិករក្នុងស្រុក និងទទួលបានផលិតផលកសិកម្មស្រស់ៗ",
            joinAsBuyer: "ចូលរួមជាអ្នកទិញ",
            joinAsFarmer: "ចូលរួមជាកសិករ",
        },
        en: {
            // Hero Section
            heroTitle: "Connecting Farmers",
            heroSubtitle: "& Buyers Directly",
            heroDescription: "Buy fresh agricultural products directly from local farmers through our modern online platform",
            heroButton: "Start Shopping",
            heroSecondaryButton: "For Farmers",

            // Stats
            activeFarmers: "Active Farmers",
            freshProducts: "Fresh Products",
            happyCustomers: "Happy Customers",

            // Features
            featuresTitle: "Why Choose FramerZone?",
            feature1Title: "Fresh from Farm",
            feature1Desc: "Get fresh vegetables, fruits, and agricultural products directly from local farmers",
            feature2Title: "No Middlemen",
            feature2Desc: "Direct connection between farmers and buyers ensuring fair prices for everyone",
            feature3Title: "Fast Delivery",
            feature3Desc: "Quick and efficient delivery system right to your doorstep",
            feature4Title: "Direct Payment",
            feature4Desc: "Pay directly to farmers - transparent and friendly communication",

            // How it works
            howItWorksTitle: "How It Works",
            step1Title: "Browse Products",
            step1Desc: "Explore agricultural products from farmers in your area",
            step2Title: "Place Order",
            step2Desc: "Select products and place your order with ease",
            step3Title: "Receive Products",
            step3Desc: "Get fresh products delivered to your home",

            // Categories
            categoriesTitle: "Product Categories",
            vegetables: "Vegetables",
            fruits: "Fruits",
            grains: "Grains & Rice",
            livestock: "Livestock",

            // Learning Center
            learningTitle: "Learning Center",
            learningSubtitle: "Learn Modern Farming Techniques",
            learningDesc: "Discover farming techniques, crop care, and farm management practices",
            watchVideos: "Watch Videos",

            // CTA
            ctaTitle: "Start with FramerZone Today",
            ctaDesc: "Connect with local farmers and get fresh agricultural products",
            joinAsBuyer: "Join as Buyer",
            joinAsFarmer: "Join as Farmer",
        },
    }

    const currentTexts = texts[currentLanguage]

    return (
        <div className="min-h-screen bg-cream-50 overflow-hidden">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden">
                <div className="absolute inset-0 bg-white/20"></div>

                {/* Floating Elements Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-float-delayed"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-float-slow"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6 animate-slide-in-left">
                                <span className="text-green-600 animate-text-shimmer">{currentTexts.heroTitle}</span>
                                <br />
                                <span className="text-yellow-600 animate-text-shimmer-delayed">{currentTexts.heroSubtitle}</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed animate-slide-in-left animate-delay-300">
                                {currentTexts.heroDescription}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in-up animate-delay-500">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-subtle">
                                    {currentTexts.heroButton}
                                </button>
                                <button className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 animate-pulse-subtle">
                                    {currentTexts.heroSecondaryButton}
                                </button>
                            </div>
                        </div>
                        <div className="relative animate-slide-in-right">
                            <div className="relative transform animate-float">
                                <img
                                    src="https://media.istockphoto.com/id/1798620908/photo/senior-woman-farmers-harvesting-corn-during-the-agricultural-season-increasing-income.jpg?s=612x612&w=0&k=20&c=u8Zo1tJPZuqGZNwaPhK-Vpt-6MuvDvuhyhXc9zQAwoM="
                                    alt="Cambodian farmers with fresh produce"
                                    className="w-full h-auto rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg animate-slide-in-up animate-delay-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-green-100 p-3 rounded-full animate-spin-slow">
                                            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">100% Fresh</p>
                                            <p className="text-sm text-gray-600">Direct from Farm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" data-animate className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div
                            className={`p-6 transform transition-all duration-700 ${isVisible.stats ? "animate-count-up translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                        >
                            <div className="text-4xl font-bold text-green-600 mb-2 animate-number-count">500+</div>
                            <p className="text-gray-600 font-medium">{currentTexts.activeFarmers}</p>
                        </div>
                        <div
                            className={`p-6 transform transition-all duration-700 delay-200 ${isVisible.stats ? "animate-count-up translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                        >
                            <div className="text-4xl font-bold text-yellow-600 mb-2 animate-number-count">1000+</div>
                            <p className="text-gray-600 font-medium">{currentTexts.freshProducts}</p>
                        </div>
                        <div
                            className={`p-6 transform transition-all duration-700 delay-400 ${isVisible.stats ? "animate-count-up translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                        >
                            <div className="text-4xl font-bold text-brown-600 mb-2 animate-number-count">2500+</div>
                            <p className="text-gray-600 font-medium">{currentTexts.happyCustomers}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section
                id="features"
                data-animate
                className="py-20 bg-gradient-to-br from-green-50/30 to-yellow-50/30 relative overflow-hidden"
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/10 rounded-full blur-2xl animate-float-gentle"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-200/10 rounded-full blur-xl animate-float-delayed"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div
                        className={`text-center mb-16 transform transition-all duration-700 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{currentTexts.featuresTitle}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: currentTexts.feature1Title,
                                desc: currentTexts.feature1Desc,
                                bg: "bg-green-50",
                                borderColor: "border-green-200",
                                hoverBorder: "hover:border-green-400",
                                image:
                                    "https://media.istockphoto.com/id/2221605330/photo/young-cabbage-after-watering-growing-in-the-garden-bed-home-gardening-concept-handheld-phone.jpg?s=612x612&w=0&k=20&c=UAYykpxX3INo8Mn2wP0zq4DCr3_vXszjf48Hu5RCUpU=",
                                gradient: "from-green-500/10 to-emerald-500/5",
                            },
                            {
                                title: currentTexts.feature2Title,
                                desc: currentTexts.feature2Desc,
                                bg: "bg-yellow-50",
                                borderColor: "border-yellow-200",
                                hoverBorder: "hover:border-yellow-400",
                                image:
                                    "https://media.istockphoto.com/id/1061400948/photo/farmer-giving-box-of-veg-to-customer-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=UOuur8q5SRru_fy1OdDybUlm9BuCq9Pw2XjLDkZ5aCY=",
                                gradient: "from-yellow-500/10 to-orange-500/5",
                            },
                            {
                                title: currentTexts.feature3Title,
                                desc: currentTexts.feature3Desc,
                                bg: "bg-blue-50",
                                borderColor: "border-blue-200",
                                hoverBorder: "hover:border-blue-400",
                                image:
                                    "https://media.istockphoto.com/id/1216988317/photo/a-man-is-delivering-a-bag-of-vegetables-and-fruit.jpg?s=612x612&w=0&k=20&c=4DfRUtmdVwwLEeS7DdFOacPglRbg-Q_vYcsFlkot_X0=",
                                gradient: "from-blue-500/10 to-cyan-500/5",
                            },
                            {
                                title: currentTexts.feature4Title,
                                desc: currentTexts.feature4Desc,
                                bg: "bg-purple-50",
                                borderColor: "border-purple-200",
                                hoverBorder: "hover:border-purple-400",
                                image:
                                    "https://media.istockphoto.com/id/2156905193/photo/phone-payment-and-people-at-organic-market-with-fresh-groceries-sustainable-business-and.jpg?s=612x612&w=0&k=20&c=pU7KjjhZ2ItPIWYVPV1DQ-TrTCe__bfp-Xg0VN0e1NE=",
                                gradient: "from-purple-500/10 to-pink-500/5",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white border-2 ${feature.borderColor} ${feature.hoverBorder} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] ${isVisible.features ? "animate-slide-in-up opacity-100" : "translate-y-10 opacity-0"}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image Section with Gradient Overlay */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={feature.image || "/placeholder.svg"}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} group-hover:opacity-80 transition-opacity duration-300`}
                                    ></div>

                                    {/* Floating number indicator */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                                        <span className="text-gray-700 font-bold text-sm">{index + 1}</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className={`p-6 ${feature.bg} transition-colors duration-300`}>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center group-hover:text-gray-900 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-center leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                                        {feature.desc}
                                    </p>

                                    {/* Decorative bottom accent */}
                                    <div className="mt-4 flex justify-center">
                                        <div
                                            className={`w-12 h-1 bg-gradient-to-r ${feature.gradient.replace("/10", "/60").replace("/5", "/40")} rounded-full transform transition-all duration-500 group-hover:w-16`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" data-animate className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-200/20 to-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className={`text-center mb-20 transition-all duration-1000 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                            }`}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Simple Process
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent">
                                {currentTexts.howItWorksTitle}
                            </span>
                        </h2>

                        {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Connect directly with local farmers in three simple steps
                        </p> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                title: currentTexts.step1Title,
                                desc: currentTexts.step1Desc,
                                number: "1",
                                bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
                                shadowColor: "shadow-emerald-500/25",
                                borderColor: "border-emerald-200",
                                iconBg: "bg-emerald-50",
                                iconColor: "text-emerald-600",
                                image: "https://media.istockphoto.com/id/1062685620/photo/sales-of-fresh-and-organic-fruits-and-vegetables-at-the-green-market-or-farmers-market.jpg?s=612x612&w=0&k=20&c=ZQH45iwu1T-sq6ECmZhrjPzTJNV48_C6G4o12B9OXTY=",
                            },
                            {
                                title: currentTexts.step2Title,
                                desc: currentTexts.step2Desc,
                                number: "2",
                                bgGradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
                                shadowColor: "shadow-blue-500/25",
                                borderColor: "border-blue-200",
                                iconBg: "bg-blue-50",
                                iconColor: "text-blue-600",
                                image: "https://media.istockphoto.com/id/870915532/photo/man-holding-crate-ob-fresh-vegetables.jpg?s=612x612&w=0&k=20&c=k2dXOI-wxUy7lX77Pm90vU6TJXmAAv5VtK60ZZHIyCA=",
                            },
                            {
                                title: currentTexts.step3Title,
                                desc: currentTexts.step3Desc,
                                number: "3",
                                bgGradient: "bg-gradient-to-br from-orange-500 to-red-600",
                                shadowColor: "shadow-orange-500/25",
                                borderColor: "border-orange-200",
                                iconBg: "bg-orange-50",
                                iconColor: "text-orange-600",
                                image: "https://media.istockphoto.com/id/1587031865/photo/close-up-hands-of-young-delivery-man-delivering-package-to-customer-attractive-postman-in-red.jpg?s=612x612&w=0&k=20&c=8mMgYk4T3_6byRvLaKFgBenaiNPsN-LYk8PP2F5SoYo=",
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`group relative transition-all duration-700 hover:scale-105 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 300}ms` }}
                            >
                                {/* Card */}
                                <div className={`relative h-full p-8 bg-white/80 backdrop-blur-sm rounded-3xl border ${step.borderColor} shadow-xl hover:shadow-2xl ${step.shadowColor} transition-all duration-500 group-hover:border-opacity-50`}>

                                    {/* Step Number - Top Corner */}
                                    <div className={`absolute -top-4 -right-4 ${step.bgGradient} text-white w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                                        {step.number}
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative mb-8">
                                        <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-56 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>

                                        {/* Floating Icon */}
                                        <div className={`absolute -bottom-6 left-6 ${step.iconBg} ${step.iconColor} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300`}>
                                            {index === 0 && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            )}
                                            {index === 1 && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6m-10 0V9a1 1 0 011-1h8a1 1 0 011 1v4H7z" />
                                                </svg>
                                            )}
                                            {index === 2 && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className={`absolute bottom-0 left-8 right-8 h-1 ${step.bgGradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                                </div>

                                {/* Connecting Line */}
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                                        <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className={`text-center mt-20 transition-all duration-1000 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}>
                        <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                            <span>Get Started Today</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Enhanced Product Categories */}
            <section
                id="categories"
                data-animate
                className="py-24 bg-gradient-to-br from-green-50/40 to-yellow-50/40 relative overflow-hidden"
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-green-200/10 rounded-full blur-3xl animate-float-gentle"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-200/10 rounded-full blur-2xl animate-float-delayed"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div
                        className={`text-center mb-20 transform transition-all duration-700 ${isVisible.categories ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            {currentTexts.categoriesTitle}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            {currentLanguage === "kh"
                                ? "ស្វែងរកផលិតផលកសិកម្មគុណភាពខ្ពស់ពីកសិករក្នុងស្រុក"
                                : "Discover high-quality agricultural products from local farmers"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: currentTexts.vegetables,
                                image:
                                    "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                gradient: "from-green-500/90 to-emerald-600/90",
                                bgGradient: "from-green-50 to-emerald-50",
                                count: "150+ varieties",
                            },
                            {
                                name: currentTexts.fruits,
                                image:
                                    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                gradient: "from-orange-500/90 to-red-500/90",
                                bgGradient: "from-orange-50 to-red-50",
                                count: "80+ varieties",
                            },
                            {
                                name: currentTexts.grains,
                                image:
                                    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                gradient: "from-yellow-500/90 to-amber-600/90",
                                bgGradient: "from-yellow-50 to-amber-50",
                                count: "25+ varieties",
                            },
                            {
                                name: currentTexts.livestock,
                                image:
                                    "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                gradient: "from-blue-500/90 to-indigo-600/90",
                                bgGradient: "from-blue-50 to-indigo-50",
                                count: "Fresh daily",
                            },
                        ].map((category, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-4 hover:scale-[1.02] ${isVisible.categories ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Image Section */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                                    />

                                    {/* Gradient Overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                                    ></div>

                                    {/* Count Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="text-xs font-semibold text-gray-700">{category.count}</span>
                                    </div>

                                    {/* Category Name Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                                            {category.name}
                                        </h3>
                                        <div className="w-12 h-1 bg-white/80 rounded-full transform transition-all duration-500 group-hover:w-20"></div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className={`p-6 bg-gradient-to-br ${category.bgGradient} transition-all duration-300`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                {currentLanguage === "kh" ? "ផលិតផលមាន" : "Available products"}
                                            </p>
                                            <p className="font-semibold text-gray-800">{category.count}</p>
                                        </div>

                                        {/* Arrow Icon */}
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-45">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div
                                        className={`absolute inset-0 rounded-3xl bg-gradient-to-t ${category.gradient.replace("/90", "/20")} blur-xl`}
                                    ></div>
                                </div>

                                {/* Border Glow */}
                                <div
                                    className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r ${category.gradient.replace("/90", "/50")} transition-all duration-500`}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center">
                        <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            {currentLanguage === "kh" ? "មើលផលិតផលទាំងអស់" : "View All Products"}
                        </button>
                    </div>
                </div>
            </section>


            {/* Learning Center Section */}
            <section
                id="learning"
                data-animate
                className="py-20 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div
                            className={`transform transition-all duration-700 ${isVisible.learning
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-10 opacity-0"
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                {currentTexts.learningTitle}
                            </h2>
                            <h3 className="text-xl text-green-600 font-semibold mb-6 animate-text-shimmer">
                                {currentTexts.learningSubtitle}
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {currentTexts.learningDesc}
                            </p>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-subtle">
                                {currentTexts.watchVideos}
                            </button>
                        </div>

                        {/* Video Thumbnail */}
                        <div
                            className={`relative transform transition-all duration-700 ${isVisible.learning
                                ? "translate-x-0 opacity-100"
                                : "translate-x-10 opacity-0"
                                }`}
                        >
                            <div
                                className="relative group animate-float cursor-pointer"
                                onClick={() => setIsVideoOpen(true)}
                                aria-label="Open Learning Video"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") setIsVideoOpen(true);
                                }}
                            >
                                <img
                                    src="/placeholder.svg?height=400&width=600&text=Learning+center"
                                    alt="Learning center"
                                    className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-40">
                                    <div className="bg-white bg-opacity-90 p-4 rounded-full transform transition-all duration-300 group-hover:scale-110 animate-pulse">
                                        <svg
                                            className="h-12 w-12 text-green-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isVideoOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setIsVideoOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="video-modal-title"
                >
                    <div
                        className="relative w-full max-w-4xl mx-auto bg-black rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-yellow-500"
                            onClick={() => setIsVideoOpen(false)}
                            aria-label="Close video"
                        >
                            &times;
                        </button>

                        {/* Responsive video container */}
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://media.istockphoto.com/id/2163456407/photo/fresh-vegetables-and-fruits-for-sale-in-asian-farmer-market-stall.jpg?s=612x612&w=0&k=20&c=LNl7GM00YQPHNzCZlKTG9-M6v8zEG9Fg0tSWM9mIxGY="
                                title="Learning Center Video"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <section
                id="cta"
                data-animate
                className="py-20 bg-gradient-to-r from-green-600 to-yellow-500 relative overflow-hidden"
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/15 rounded-full animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
                </div>

                <div
                    className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative transform transition-all duration-700 ${isVisible.cta ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 animate-text-shimmer">
                        {currentTexts.ctaTitle}
                    </h2>
                    <p className="text-xl text-white mb-8 opacity-90">{currentTexts.ctaDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up animate-delay-300">
                        <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-subtle">
                            {currentTexts.joinAsBuyer}
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 animate-pulse-subtle">
                            {currentTexts.joinAsFarmer}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

