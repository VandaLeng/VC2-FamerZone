// HomePage component (unchanged)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { videoAPI } from '../../stores/api';
import '../../styles/HomeStyle.css';
import homeData from '../../data/homedata.js';

export default function HomePage({ currentLanguage }) {
    const [isVisible, setIsVisible] = useState({});
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(true);
    const [videoError, setVideoError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        const sections = document.querySelectorAll("[data-animate]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    // Fetch videos from API
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setLoadingVideos(true);
            setVideoError(null);
            
            const data = await videoAPI.getAllVideos({ limit: 6 });
            
            if (data.success && Array.isArray(data.data)) {
                setVideos(data.data);
            } else {
                console.error('Invalid response format:', data);
                setVideoError('Invalid response format');
                setVideos([]);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            setVideoError(error.message || 'Failed to load videos');
            setVideos([]);
        } finally {
            setLoadingVideos(false);
        }
    };

    const currentTexts = homeData[currentLanguage] || homeData["en"];

    // Navigation functions
    const navigateToProducts = () => {
        window.location.href = "/about";
    };

    const navigateToProductsCategory = (category = "") => {
        const categoryParam = category ? `?category=${category}` : "";
        window.location.href = `/products${categoryParam}#products-section`;
    };

    const navigateToRegisterAsBuyer = () => {
        navigate("/register", { state: { defaultRole: "buyer" } });
    };

    const navigateToRegisterAsFarmer = () => {
        navigate("/register", { state: { defaultRole: "farmer" } });
    };

    const navigateToRegister = () => {
        navigate("/register");
    };

    // Video functions
    const openVideoModal = async (video) => {
        try {
            await videoAPI.incrementView(video.id);
        } catch (error) {
            console.log('Failed to increment view count:', error);
        }
        
        setSelectedVideo(video);
        setIsVideoOpen(true);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
        setIsVideoOpen(false);
    };

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const patterns = [
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
            /youtube\.com\/v\/([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const getVideoThumbnail = (video) => {
        if (video.thumbnail_url && !video.thumbnail_url.includes('youtube.com')) {
            return video.thumbnail_url;
        }
        
        const videoId = video.video_id || getYouTubeVideoId(video.url);
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
        
        return null;
    };

    const getVideoEmbedUrl = (video) => {
        if (video.embed_url) {
            return video.embed_url;
        }
        
        const videoId = video.video_id || getYouTubeVideoId(video.url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
        }
        
        return video.url;
    };

    return (
        <div className="min-h-screen bg-cream-50 overflow-hidden">
            {/* Video Modal */}
            {isVideoOpen && selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeVideoModal}>
                    <div className="bg-white rounded-xl p-4 max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                            <button 
                                onClick={closeVideoModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="aspect-video">
                            <iframe
                                src={getVideoEmbedUrl(selectedVideo)}
                                title={selectedVideo.title}
                                className="w-full h-full rounded-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">{selectedVideo.description || 'No description available'}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {selectedVideo.formatted_views || selectedVideo.views || 0} views • 
                                {selectedVideo.time_ago || (selectedVideo.created_at ? new Date(selectedVideo.created_at).toLocaleDateString() : 'Recently')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden min-h-[85vh]">
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
                                <span className="text-green-600 animate-text-shimmer">{currentTexts.heroTitle || "Fresh"}</span>
                                <br />
                                <span className="text-yellow-600 animate-text-shimmer-delayed">{currentTexts.heroSubtitle || "Farming"}</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed animate-slide-in-left animate-delay-300">
                                {currentTexts.heroDescription || "Connect directly with local farmers"}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in-up animate-delay-500">
                                <button
                                    onClick={navigateToProducts}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-subtle cursor-pointer"
                                >
                                    {currentTexts.heroButton || "Shop Now"}
                                </button>
                                <button
                                    onClick={navigateToRegisterAsFarmer}
                                    className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 animate-pulse-subtle cursor-pointer"
                                >
                                    {currentTexts.heroSecondaryButton || "Join as Farmer"}
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
                        {[
                            { number: "500+", text: currentTexts.activeFarmers || "Active Farmers", color: "text-green-600" },
                            { number: "1000+", text: currentTexts.freshProducts || "Fresh Products", color: "text-yellow-600" },
                            { number: "2500+", text: currentTexts.happyCustomers || "Happy Customers", color: "text-brown-600" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`p-6 transform transition-all duration-700 hover-lift hover-glow ${
                                    isVisible.stats ? "animate-card-pop" : "opacity-0"
                                } animate-delay-${index * 200}`}
                            >
                                <div className={`text-4xl font-bold ${stat.color} mb-2 animate-number-count`}>{stat.number}</div>
                                <p className="text-gray-600 font-medium">{stat.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
             {/* Features Section */}
            <section id="features" data-animate className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-500 ${
                            isVisible.features ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                        }`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {currentTexts.featuresTitle || "Why Choose Us"}
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
                                title: currentTexts.feature1Title || "Fresh Products",
                                desc: currentTexts.feature1Desc || "Direct from farm to your table",
                                color: "green",
                                image: "https://media.istockphoto.com/id/2221605330/photo/young-cabbage-after-watering-growing-in-the-garden-bed-home-gardening-concept-handheld-phone.jpg?s=612x612&w=0&k=20&c=UAYykpxX3INo8Mn2wP0zq4DCr3_vXszjf48Hu5RCUpU=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                ),
                            },
                            {
                                title: currentTexts.feature2Title || "Direct Connection",
                                desc: currentTexts.feature2Desc || "Connect with local farmers",
                                color: "blue",
                                image: "https://media.istockphoto.com/id/1061400948/photo/farmer-giving-box-of-veg-to-customer-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=ZQH45iwu1T-sq6ECmZhrjPzTJNV48_C6G4o12B9OXTY=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: currentTexts.feature3Title || "Fast Delivery",
                                desc: currentTexts.feature3Desc || "Quick and reliable delivery",
                                color: "orange",
                                image: "https://media.istockphoto.com/id/1216988317/photo/a-man-is-delivering-a-bag-of-vegetables-and-fruit.jpg?s=612x612&w=0&k=20&c=4DfRUtmdVwwLEeS7DdFOacPglRbg-Q_vYcsFlkot_X0=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: currentTexts.feature4Title || "Fair Prices",
                                desc: currentTexts.feature4Desc || "Best prices for everyone",
                                color: "purple",
                                image: "https://media.istockphoto.com/id/2156905193/photo/phone-payment-and-people-at-organic-market-with-fresh-groceries-sustainable-business-and.jpg?s=612x612&w=0&k=20&c=pU7KjjhZ2ItPIWYVPV1DQ-TrTCe__bfp-Xg0VN0e1NE=",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift hover-glow ${
                                    isVisible.features ? "animate-card-pop" : "opacity-0"
                                } animate-delay-${index * 100}`}
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={feature.image || "/placeholder.svg"}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className={`absolute bottom-4 left-4 p-3 rounded-lg shadow-lg backdrop-blur-sm ${
                                        feature.color === 'green' ? 'bg-green-500/90 text-white' :
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
                                    <div className="mt-4">
                                        <button
                                            onClick={navigateToProducts}
                                            className={`inline-flex items-center text-sm font-medium transition-colors duration-200 cursor-pointer ${
                                                feature.color === 'green' ? 'text-green-600 hover:text-green-700' :
                                                feature.color === 'blue' ? 'text-blue-600 hover:text-blue-700' :
                                                feature.color === 'orange' ? 'text-orange-600 hover:text-orange-700' :
                                                'text-purple-600 hover:text-purple-700'
                                            }`}
                                        >
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
                    <div className={`mt-16 text-center transition-all duration-500 ${
                        isVisible.features ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}>
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {currentTexts.getStartedTitle || (currentLanguage === "kh" ? "ចាប់ផ្តើមលក់ជាកសិករនៅថ្ងៃនេះ" : "Start Selling as a Farmer Today")}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {currentTexts.getStartedDesc || (currentLanguage === "kh" ? "ចូលរួមជាមួយ FramerZone ដើម្បីលក់ផលិតផលស្រស់ៗរបស់អ្នកដោយផ្ទាល់ទៅកាន់អ្នកទិញ រកប្រាក់បានច្រើនជាងមុនដោយគ្មានឈ្មួញកណ្តាល និងពង្រីកអាជីវកម្មរបស់អ្នកដោយភាពងាយស្រួល។" : "Join FramerZone to sell your fresh produce directly to buyers, earn more without middlemen, and grow your business with ease.")}
                            </p>
                            <button
                                onClick={navigateToRegisterAsFarmer}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                            >
                                <span>{currentTexts.getStartedButton || (currentLanguage === "kh" ? "ចូលរួមជាកសិករ" : "Join as a Farmer")}</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
             {/* How It Works Section */}
            <section id="how-it-works" data-animate className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-500 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
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

                    {/* Steps Grid */}
                    <div className="relative">
                        <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gray-200">
                            <div className="absolute left-0 w-1/2 h-full bg-green-500 rounded-full"></div>
                        </div>
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
                                    ),
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
                                    ),
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
                                    ),
                                },
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className={`relative transition-all duration-300 hover-lift hover-glow ${isVisible["how-it-works"] ? "animate-card-pop" : "opacity-0"} animate-delay-${index * 150}`}
                                >
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 ${
                                            step.color === 'green' ? 'bg-green-100 text-green-600' :
                                            step.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                            'bg-orange-100 text-orange-600'
                                        }`}>
                                            {step.icon}
                                        </div>
                                        <div className="relative mb-6 overflow-hidden rounded-lg">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`text-sm font-semibold px-2 py-1 rounded ${
                                                    step.color === 'green' ? 'bg-green-100 text-green-700' :
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
                                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-sm z-10 ${
                                        step.color === 'green' ? 'bg-green-500' :
                                        step.color === 'blue' ? 'bg-blue-500' :
                                        'bg-orange-500'
                                    }`}>
                                        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                                            <div className={`w-2 h-2 rounded-full ${
                                                step.color === 'green' ? 'bg-green-500' :
                                                step.color === 'blue' ? 'bg-blue-500' :
                                                'bg-orange-500'
                                            }`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`text-center mt-16 transition-all duration-500 ${isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
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
            {/* Categories Section */}
            <section id="categories" data-animate className="py-20 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className={`text-center mb-16 transform transition-all duration-500 ${isVisible.categories ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: currentTexts.vegetables,
                                image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "green",
                                count: "150+ varieties",
                                description: currentLanguage === "kh" ? "បន្លែស្រស់" : "Fresh vegetables",
                            },
                            {
                                name: currentTexts.fruits,
                                image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "orange",
                                count: "80+ varieties",
                                description: currentLanguage === "kh" ? "ផ្លែឈើឆ្ងាញ់" : "Sweet fruits",
                            },
                            {
                                name: currentTexts.grains,
                                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "amber",
                                count: "25+ varieties",
                                description: currentLanguage === "kh" ? "គ្រាប់ធញ្ញជាតិ" : "Quality grains",
                            },
                            {
                                name: currentTexts.livestock,
                                image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                color: "blue",
                                count: "Fresh daily",
                                description: currentLanguage === "kh" ? "សត្វពាហនៈ" : "Livestock products",
                            },
                        ].map((category, index) => (
                            <div
                                key={index}
                                className={`group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover-lift hover-glow ${isVisible.categories ? "animate-card-pop" : "opacity-0"} animate-delay-${index * 100}`}
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                                    <div className="absolute top-3 right-3">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                            category.color === 'green' ? 'bg-green-100 text-green-800' :
                                            category.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                                            category.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {category.count}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-gray-700 transition-colors duration-200">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                {category.description}
                                            </p>
                                            <button className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
                                                category.color === 'green' ? 'text-green-600 hover:text-green-700' :
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
                                <div className={`h-1 w-full transition-all duration-300 ${
                                    category.color === 'green' ? 'bg-green-500 group-hover:bg-green-600' :
                                    category.color === 'orange' ? 'bg-orange-500 group-hover:bg-orange-600' :
                                    category.color === 'amber' ? 'bg-amber-500 group-hover:bg-amber-600' :
                                    'bg-blue-500 group-hover:bg-blue-600'
                                }`}></div>
                            </div>
                        ))}
                    </div>
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


            {/* Farmer Videos Section */}
            <section id="farmer-videos" data-animate className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-500 ${
                        isVisible['farmer-videos'] ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {currentLanguage === "kh" ? "វីដេអូពីកសិករ" : "Learn from Farmers"}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {currentLanguage === "kh" ? "មើលដំណើរការកសិកម្មពីកសិករពិតប្រាកដ" : "Watch Real Farming Stories"}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {currentLanguage === "kh" 
                                ? "រៀនពីបទពិសោធន៍ និងបច្ចេកទេសកសិកម្មពីកសិករក្នុងស្រុកដែលមានបទពិសោធន៍"
                                : "Learn from the experiences and techniques of our local farmers"}
                        </p>
                    </div>

                    {loadingVideos ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-300"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
                                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : videoError ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-500 text-lg mb-2">
                                {currentLanguage === "kh" ? "មានបញ្ហាក្នុងការផ្ទុកវីដេអូ" : "Error loading videos"}
                            </p>
                            <p className="text-gray-400 mb-4">
                                {videoError}
                            </p>
                            <button
                                onClick={fetchVideos}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                                {currentLanguage === "kh" ? "ព្យាយាមម្តងទៀត" : "Try Again"}
                            </button>
                        </div>
                    ) : videos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video, index) => {
                                const thumbnailUrl = getVideoThumbnail(video);
                                
                                return (
                                    <div
                                        key={video.id}
                                        className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover-lift hover-glow ${
                                            isVisible['farmer-videos'] ? "animate-card-pop" : "opacity-0"
                                        } animate-delay-${index * 100}`}
                                        onClick={() => openVideoModal(video)}
                                    >
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            {thumbnailUrl ? (
                                                <img
                                                    src={thumbnailUrl}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div 
                                                className="w-full h-full flex items-center justify-center bg-gray-200"
                                                style={{display: thumbnailUrl ? 'none' : 'flex'}}
                                            >
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                <div className="bg-white bg-opacity-90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {video.views && video.views > 0 && (
                                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                                    {video.formatted_views || video.views} views
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                                                {video.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {video.description || (currentLanguage === "kh" ? "មិនមានការពិពណ៌នា" : "No description available")}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {video.time_ago || (video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Recently')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500 text-lg mb-2">
                                {currentLanguage === "kh" ? "មិនទាន់មានវីដេអូនៅឡើយទេ" : "No videos available yet"}
                            </p>
                            <p className="text-gray-400">
                                {currentLanguage === "kh" ? "កសិករនឹងបន្ថែមវីដេអូភ្លាមៗនេះ" : "Farmers will be adding videos soon"}
                            </p>
                        </div>
                    )}

                    {videos.length > 0 && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => window.location.href = '/videos'}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                            >
                                <span>{currentLanguage === "kh" ? "មើលវីដេអូទាំងអស់" : "View All Videos"}</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </section>

           
        </div>
    );
}