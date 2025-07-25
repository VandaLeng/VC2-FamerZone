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
            {/* Professional Features Section */}
            <section
                id="features"
                data-animate
                className="py-20 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-500 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                            }`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {currentTexts.featuresTitle}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {currentLanguage === "kh"
                                ? "មុខងារសំខាន់ៗដែលធ្វើអ្វីសម្រាប់អ្នក"
                                : "Key features that make your agricultural business thrive"}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: currentTexts.feature1Title,
                                desc: currentTexts.feature1Desc,
                                color: "green",
                                image: "https://media.istockphoto.com/id/2221605330/photo/young-cabbage-after-watering-growing-in-the-garden-bed-home-gardening-concept-handheld-phone.jpg?s=612x612&w=0&k=20&c=UAYykpxX3INo8Mn2wP0zq4DCr3_vXszjf48Hu5RCUpU=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                )
                            },
                            {
                                title: currentTexts.feature2Title,
                                desc: currentTexts.feature2Desc,
                                color: "blue",
                                image: "https://media.istockphoto.com/id/1061400948/photo/farmer-giving-box-of-veg-to-customer-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=UOuur8q5SRru_fy1OdDybUlm9BuCq9Pw2XjLDkZ5aCY=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: currentTexts.feature3Title,
                                desc: currentTexts.feature3Desc,
                                color: "orange",
                                image: "https://media.istockphoto.com/id/1216988317/photo/a-man-is-delivering-a-bag-of-vegetables-and-fruit.jpg?s=612x612&w=0&k=20&c=4DfRUtmdVwwLEeS7DdFOacPglRbg-Q_vYcsFlkot_X0=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: currentTexts.feature4Title,
                                desc: currentTexts.feature4Desc,
                                color: "purple",
                                image: "https://media.istockphoto.com/id/2156905193/photo/phone-payment-and-people-at-organic-market-with-fresh-groceries-sustainable-business-and.jpg?s=612x612&w=0&k=20&c=pU7KjjhZ2ItPIWYVPV1DQ-TrTCe__bfp-Xg0VN0e1NE=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                )
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={feature.image || "/placeholder.svg"}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                    {/* Icon overlay */}
                                    <div className={`absolute bottom-4 left-4 p-3 rounded-lg shadow-lg backdrop-blur-sm ${feature.color === 'green' ? 'bg-green-500/90 text-white' :
                                            feature.color === 'blue' ? 'bg-blue-500/90 text-white' :
                                                feature.color === 'orange' ? 'bg-orange-500/90 text-white' :
                                                    'bg-purple-500/90 text-white'
                                        }`}>
                                        {feature.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-3 group-hover:text-gray-700 transition-colors duration-200">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.desc}
                                    </p>

                                    {/* Learn more link */}
                                    <div className="mt-4">
                                        <button className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${feature.color === 'green' ? 'text-green-600 hover:text-green-700' :
                                                feature.color === 'blue' ? 'text-blue-600 hover:text-blue-700' :
                                                    feature.color === 'orange' ? 'text-orange-600 hover:text-orange-700' :
                                                        'text-purple-600 hover:text-purple-700'
                                            }`}>
                                            {currentLanguage === "kh" ? "ស្វែងយល់បន្ថែម" : "Learn more"}
                                            <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className={`mt-16 text-center transition-all duration-500 ${isVisible.features ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}>
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {currentLanguage === "kh" ? "ចាប់ផ្តើមជាមួយយើង" : "Ready to get started?"}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {currentLanguage === "kh"
                                    ? "ចាប់ផ្តើមលក់ផលិតផលកសិកម្មរបស់អ្នកនៅថ្ងៃនេះ"
                                    : "Start selling your agricultural products today and connect with customers directly"}
                            </p>
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <span>{currentLanguage === "kh" ? "ចាប់ផ្តើមឥឡូវ" : "Get Started Now"}</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            {/* Professional How It Works Section */}
            <section id="how-it-works" data-animate className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-500 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                            }`}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Simple Process
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {currentTexts.howItWorksTitle}
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Connect directly with local farmers in three simple steps
                        </p>
                    </div>

                    {/* Steps Container */}
                    <div className="relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gray-200">
                            <div className="absolute left-0 w-1/2 h-full bg-green-500 rounded-full"></div>
                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {[
                                {
                                    title: currentTexts.step1Title,
                                    desc: currentTexts.step1Desc,
                                    number: "01",
                                    color: "green",
                                    image: "https://media.istockphoto.com/id/1062685620/photo/sales-of-fresh-and-organic-fruits-and-vegetables-at-the-green-market-or-farmers-market.jpg?s=612x612&w=0&k=20&c=ZQH45iwu1T-sq6ECmZhrjPzTJNV48_C6G4o12B9OXTY=",
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: currentTexts.step2Title,
                                    desc: currentTexts.step2Desc,
                                    number: "02",
                                    color: "blue",
                                    image: "https://media.istockphoto.com/id/870915532/photo/man-holding-crate-ob-fresh-vegetables.jpg?s=612x612&w=0&k=20&c=k2dXOI-wxUy7lX77Pm90vU6TJXmAAv5VtK60ZZHIyCA=",
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6m-10 0V9a1 1 0 011-1h8a1 1 0 011 1v4H7z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: currentTexts.step3Title,
                                    desc: currentTexts.step3Desc,
                                    number: "03",
                                    color: "orange",
                                    image: "https://media.istockphoto.com/id/1587031865/photo/close-up-hands-of-young-delivery-man-delivering-package-to-customer-attractive-postman-in-red.jpg?s=612x612&w=0&k=20&c=8mMgYk4T3_6byRvLaKFgBenaiNPsN-LYk8PP2F5SoYo=",
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    )
                                },
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className={`relative transition-all duration-300 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    {/* Step Card */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                                        {/* Step Number */}
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 ${step.color === 'green' ? 'bg-green-100 text-green-600' :
                                            step.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                                'bg-orange-100 text-orange-600'
                                            }`}>
                                            {step.icon}
                                        </div>

                                        {/* Image */}
                                        <div className="relative mb-6 overflow-hidden rounded-lg">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`text-sm font-semibold px-2 py-1 rounded ${step.color === 'green' ? 'bg-green-100 text-green-700' :
                                                    step.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    Step {step.number}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                {step.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-sm z-10 ${step.color === 'green' ? 'bg-green-500' :
                                        step.color === 'blue' ? 'bg-blue-500' :
                                            'bg-orange-500'
                                        }`}>
                                        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                                            <div className={`w-2 h-2 rounded-full ${step.color === 'green' ? 'bg-green-500' :
                                                step.color === 'blue' ? 'bg-blue-500' :
                                                    'bg-orange-500'
                                                }`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div
                        className={`text-center mt-16 transition-all duration-500 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <span>Get Started Today</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Professional Product Categories Section */}
            <section
                id="categories"
                data-animate
                className="py-20 bg-gray-50 relative"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transform transition-all duration-500 ${isVisible.categories ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                            }`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {currentTexts.categoriesTitle}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {currentLanguage === "kh"
                                ? "ស្វែងរកផលិតផលកសិកម្មគុណភាពខ្ពស់ពីកសិករក្នុងស្រុក"
                                : "Discover high-quality agricultural products from local farmers"}
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: currentTexts.vegetables,
                                image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "green",
                                count: "150+ varieties",
                                description: currentLanguage === "kh" ? "បន្លែស្រស់" : "Fresh vegetables"
                            },
                            {
                                name: currentTexts.fruits,
                                image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "orange",
                                count: "80+ varieties",
                                description: currentLanguage === "kh" ? "ផ្លែឈើឆ្ងាញ់" : "Sweet fruits"
                            },
                            {
                                name: currentTexts.grains,
                                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "amber",
                                count: "25+ varieties",
                                description: currentLanguage === "kh" ? "គ្រាប់ធញ្ញជាតិ" : "Quality grains"
                            },
                            {
                                name: currentTexts.livestock,
                                image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "blue",
                                count: "Fresh daily",
                                description: currentLanguage === "kh" ? "សត្វពាហនៈ" : "Livestock products"
                            },
                        ].map((category, index) => (
                            <div
                                key={index}
                                className={`group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${isVisible.categories ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Subtle overlay for better text readability */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>

                                    {/* Count badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${category.color === 'green' ? 'bg-green-100 text-green-800' :
                                            category.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                                                category.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {category.count}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-gray-700 transition-colors duration-200">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                {category.description}
                                            </p>

                                            {/* Action link */}
                                            <button className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${category.color === 'green' ? 'text-green-600 hover:text-green-700' :
                                                category.color === 'orange' ? 'text-orange-600 hover:text-orange-700' :
                                                    category.color === 'amber' ? 'text-amber-600 hover:text-amber-700' :
                                                        'text-blue-600 hover:text-blue-700'
                                                }`}>
                                                {currentLanguage === "kh" ? "មើលផលិតផល" : "View products"}
                                                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div className={`h-1 w-full transition-all duration-300 ${category.color === 'green' ? 'bg-green-500 group-hover:bg-green-600' :
                                    category.color === 'orange' ? 'bg-orange-500 group-hover:bg-orange-600' :
                                        category.color === 'amber' ? 'bg-amber-500 group-hover:bg-amber-600' :
                                            'bg-blue-500 group-hover:bg-blue-600'
                                    }`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-sm hover:shadow">
                            {currentLanguage === "kh" ? "មើលផលិតផលទាំងអស់" : "View All Products"}
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
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

