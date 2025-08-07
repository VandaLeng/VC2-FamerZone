"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import "../../styles/ProductStyle.css"
import provinces from "../../services/provinces"
import { toast } from "react-toastify";
import ProductCard from "../../components/ProductCard"
import LocationMap from "../../components/LocationMap"
import ProductSection from "../../components/ProductSection"
import {
  MapPin,
  Search,
  Star,
  SlidersHorizontal,
  Grid,
  List,
  ChevronDown,
  MapIcon,
  Users,
  Package,
  ArrowRight,
  Navigation,
  Loader2,
  AlertCircle,
} from "lucide-react"
import axios from "axios"

const texts = {
    kh: {
      orderSuccess: "ការកម្ម៉ង់ជោគជ័យ!",
      loginPrompt: "សូមចូលប្រើ ឬចុះឈ្មោះដើម្បីធ្វើការកម្ម៉ង់។",
    },
    en: {
      orderSuccess: "Order placed successfully!",
      loginPrompt: "Please log in or register to place an order.",
    },
  };

// Replace with your actual API endpoint
const ITEMS_ENDPOINT = "http://127.0.0.1:8000//api/items"

export default function ProductsPage({ currentLanguage = "en", isLoggedIn }) {
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 10])
  const [orderingProducts, setOrderingProducts] = useState([])
  const [orderedProducts, setOrderedProducts] = useState([])
  const [currLocation, setCurrLocation] = useState({})
  const [userLocation, setUserLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [nearbyRadius, setNearbyRadius] = useState(50) // km
  const [products, setProducts] = useState([]) // State for fetched products
  const [isLoading, setIsLoading] = useState(false) // Loading state for API
  const [fetchError, setFetchError] = useState(null) // Error state for API

  // Refs for scrolling
  const productsRef = useRef(null)
  const filtersRef = useRef(null)

  // Language texts
  const texts = {
    kh: {
      heroTitle: "ផលិតផលកសិកម្មស្រស់ៗ",
      heroSubtitle: "ពីកសិករក្នុងស្រុកដោយផ្ទាល់",
      heroDescription: "រកមើល និងទិញផលិតផលកសិកម្មគុណភាពខ្ពស់ពីកសិករក្នុងតំបន់របស់អ្នក",
      searchPlaceholder: "ស្វែងរកផលិតផល...",
      exploreProducts: "ស្វែងរកផលិតផល",
      sortBy: "តម្រៀបតាម",
      sortPopular: "ពេញនិយម",
      sortPriceLow: "តម្លៃទាប",
      sortPriceHigh: "តម្លៃខ្ពស់",
      sortRating: "ការវាយតម្លៃ",
      sortNewest: "ថ្មីបំផុត",
      sortDistance: "ចម្ងាយ",
      filters: "តម្រង",
      clearFilters: "សម្អាតតម្រង",
      priceRange: "ជួរតម្លៃ",
      showingResults: "បង្ហាញលទ្ធផល",
      of: "នៃ",
      products: "ផលិតផល",
      mapTitle: "រកផលិតផលកសិករក្នុងតំបន់",
      mapDescription: "មើលផលិតផលពីកសិករនៅជិតអ្នក",
      viewMap: "មើលផែនទី",
      hideMap: "បិទផែនទី",
      getLocation: "យកទីតាំង",
      locationLoading: "កំពុងរកទីតាំង...",
      locationError: "មិនអាចរកទីតាំងបាន",
      nearbyFarmers: "កសិករក្នុងតំបន់",
      kmAway: "គីឡូម៉ែត្រ",
      yourLocation: "ទីតាំងរបស់អ្នក",
      farmerLocation: "ទីតាំងកសិករ",
      vegetables: "បន្លែ",
      fruits: "ផ្លែឈើ",
      grains: "គ្រាប់ធញ្ញជាតិ",
      livestock: "សត្វចិញ្ចឹម",
      beverages: "ភេសជ្ជៈ",
      seafood: "ផលិតផលសមុទ្រ",
      allCategories: "ប្រភេទទាំងអស់",
      allProvinces: "ខេត្តទាំងអស់",
      popularProducts: "ផលិតផលពេញនិយម",
      allProducts: "ផលិតផលទាំងអស់",
      contactFarmer: "ទាក់ទងកសិករ",
      directPayment: "បង់ប្រាក់ដោយផ្ទាល់",
      paymentNote: "ការបង់ប្រាក់ត្រូវធ្វើដោយផ្ទាល់ទៅកសិករ",
      inStock: "មានស្តុក",
      outOfStock: "អស់ស្តុក",
      totalProducts: "ផលិតផលសរុប",
      activeFarmers: "កសិករសកម្ម",
      provinces: "ខេត្ត",
      from: "ពី",
      freshFromFarm: "ស្រស់ពីកសិដ្ឋាន",
      organicCertified: "វិញ្ញាបនបត្រធម្មជាតិ",
      fastDelivery: "ដឹកជញ្ជូនលឿន",
      qualityGuaranteed: "ធានាគុណភាព",
      orderNow: "បញ្ជាទិញឥឡូវ",
      orderPlaced: "បានបញ្ជាទិញ",
      orderSuccess: "បញ្ជាទិញបានជោគជ័យ! កសិករនឹងទាក់ទងអ្នកក្នុងពេលឆាប់ៗ",
      radiusFilter: "ជួរចម្ងាយ",
      within: "ក្នុងរង្វង់",
      noProductsFound: "រកមិនឃើញផលិតផលទេ",
    },
    en: {
      heroTitle: "Fresh Agricultural Products",
      heroSubtitle: "Direct from Local Farmers",
      heroDescription:
        "Discover and buy high-quality agricultural products from farmers in your area. Connect directly with trusted local farmers for the freshest produce.",
      searchPlaceholder: "Search for products...",
      exploreProducts: "Explore Products",
      sortBy: "Sort by",
      sortPopular: "Popular",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortRating: "Rating",
      sortNewest: "Newest",
      sortDistance: "Distance",
      filters: "Filters",
      clearFilters: "Clear Filters",
      priceRange: "Price Range",
      showingResults: "Showing",
      of: "of",
      products: "products",
      mapTitle: "Find Products Near You",
      mapDescription: "View products from farmers near your location",
      viewMap: "View Map",
      hideMap: "Hide Map",
      getLocation: "Get Location",
      locationLoading: "Getting location...",
      locationError: "Unable to get location",
      nearbyFarmers: "Nearby Farmers",
      kmAway: "km away",
      yourLocation: "Your Location",
      farmerLocation: "Farmer Location",
      vegetables: "Vegetables",
      fruits: "Fruits",
      grains: "Grains & Rice",
      livestock: "Livestock",
      beverages: "Beverages",
      seafood: "Seafood",
      allCategories: "All Categories",
      allProvinces: "All Provinces",
      popularProducts: "Popular Products",
      allProducts: "All Products",
      contactFarmer: "Contact Farmer",
      directPayment: "Direct Payment",
      paymentNote: "Payment is made directly to the farmer",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      totalProducts: "Total Products",
      activeFarmers: "Active Farmers",
      provinces: "Provinces",
      from: "From",
      freshFromFarm: "Fresh from Farm",
      organicCertified: "Organic Certified",
      fastDelivery: "Fast Delivery",
      qualityGuaranteed: "Quality Guaranteed",
      orderNow: "Order Now",
      orderPlaced: "Order Placed",
      orderSuccess: "Order placed successfully! The farmer will contact you soon",
      radiusFilter: "Distance Range",
      within: "Within",
      noProductsFound: "No products found",
    },
  }

  const currentTexts = texts[currentLanguage]

  // Categories
  const categories = [
    { id: "all", name: currentTexts.allCategories, color: "bg-stone-100" },
    { id: "vegetables", name: currentTexts.vegetables, color: "bg-green-100" },
    { id: "fruits", name: currentTexts.fruits, color: "bg-orange-100" },
    { id: "grains", name: currentTexts.grains, color: "bg-yellow-100" },
    { id: "livestock", name: currentTexts.livestock, color: "bg-blue-100" },
    { id: "beverages", name: currentTexts.beverages, color: "bg-purple-100" },
    { id: "seafood", name: currentTexts.seafood, color: "bg-teal-100" },
  ]

  // Sort options
  const sortOptions = [
    { id: "popular", name: currentTexts.sortPopular },
    { id: "price-low", name: currentTexts.sortPriceLow },
    { id: "price-high", name: currentTexts.sortPriceHigh },
    { id: "rating", name: currentTexts.sortRating },
    { id: "newest", name: currentTexts.sortNewest },
    { id: "distance", name: currentTexts.sortDistance },
  ]

  // Fetch filtered products
  const fetchFilteredProducts = async () => {
    setIsLoading(true);
    setFetchError(null); // Clear error at the start
    const params = {
      province: selectedProvince !== "all" ? selectedProvince : undefined,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchQuery || undefined,
      min_price: priceRange[0],
      max_price: priceRange[1],
      radius: userLocation ? nearbyRadius : undefined,
      latitude: userLocation ? userLocation.latitude : undefined,
      longitude: userLocation ? userLocation.longitude : undefined,
    };

    try {
      const response = await axios.get(`${ITEMS_ENDPOINT}/filter`, { params });
      console.log("API Response:", response.data);
      const mappedProducts = response.data.data.map((item) => ({
        id: item.id,
        name: item.title,
        nameKh: item.titleKh || item.title,
        province: item.province,
        category: item.category?.name || item.category,
        price: item.price,
        currency: item.currency || "$",
        rating: item.rating || 0,
        image: item.image || "/placeholder.svg",
        isPopular: item.isPopular || false,
        createdAt: item.createdAt || new Date().toISOString(),
        farmer: {
          name: item.farmer?.name || "Unknown Farmer",
          location: {
            lat: item.farmer?.location?.latitude || 0,
            lng: item.farmer?.location?.longitude || 0,
          },
        },
      }));
      setProducts(mappedProducts);
      console.log("Products set:", mappedProducts.length);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setFetchError("Unable to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on filter change
  useEffect(() => {
    fetchFilteredProducts()
  }, [selectedProvince, selectedCategory, searchQuery, priceRange, nearbyRadius, userLocation])

  // Get user location
  const getLocation = async () => {
    setLocationLoading(true)
    setLocationError(null)
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              source: "gps",
            }
            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=YOUR_API_KEY`,
              )
              if (response.data.results[0]) {
                location.city = response.data.results[0].components.city || response.data.results[0].components.town
                location.country = response.data.results[0].components.country
                location.province = response.data.results[0].components.state
              }
            } catch (error) {
              console.log("Reverse geocoding failed, using IP location as fallback")
            }
            setUserLocation(location)
            setCurrLocation(location)
            setLocationLoading(false)
          },
          async (error) => {
            console.log("GPS failed, trying IP location:", error)
            await getIPLocation()
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          },
        )
      } else {
        await getIPLocation()
      }
    } catch (error) {
      console.error("Location error:", error)
      setLocationError(error.message)
      setLocationLoading(false)
    }
  }

  // Fallback to IP-based location
  const getIPLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/")
      const location = {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        city: response.data.city,
        country: response.data.country_name,
        province: response.data.region,
        source: "ip",
      }
      setUserLocation(location)
      setCurrLocation(location)
      setLocationLoading(false)
    } catch (error) {
      console.error("IP location failed:", error)
      setLocationError("Unable to determine location")
      setLocationLoading(false)
    }
  }

  // Calculate distance (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in kilometers
  }

  // Filtering and sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.map((product) => {
      let distance = null
      if (userLocation && product.farmer.location) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          product.farmer.location.lat,
          product.farmer.location.lng,
        )
      }
      return { ...product, distance }
    })

    filtered = filtered.filter((product) => {
      const matchesDistance = !userLocation || !product.distance || product.distance <= nearbyRadius
      return matchesDistance
    })

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "distance":
        filtered.sort((a, b) => {
          if (!a.distance && !b.distance) return 0
          if (!a.distance) return 1
          if (!b.distance) return -1
          return a.distance - b.distance
        })
        break
      case "popular":
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        break
    }

    return filtered
  }, [products, sortBy, userLocation, nearbyRadius])

  const popularProducts = filteredAndSortedProducts.filter((product) => product.isPopular)
  const nearbyProducts = filteredAndSortedProducts.filter((product) => product.distance && product.distance <= 20)

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const clearFilters = () => {
    setSelectedProvince("all")
    setSelectedCategory("all")
    setSearchQuery("")
    setPriceRange([0, 10])
    setNearbyRadius(50)
    setSortBy("popular")
  }

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

   const handleOrder = (productId) => {
    if (!isLoggedIn) {
      toast.error(currentTexts.loginPrompt, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setOrderingProducts((prev) => [...prev, productId]);
    setTimeout(() => {
      setOrderingProducts((prev) => prev.filter((id) => id !== productId));
      setOrderedProducts((prev) => [...prev, productId]);
      toast.success(currentTexts.orderSuccess, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        setOrderedProducts((prev) => prev.filter((id) => id !== productId));
      }, 3000);
    }, 1500);
  };

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash
      const urlParams = new URLSearchParams(window.location.search)
      const categoryParam = urlParams.get("category")
      if (categoryParam && categoryParam !== "all") {
        setSelectedCategory(categoryParam)
      }
      if (hash === "#products-section") {
        setTimeout(() => {
          scrollToProducts()
        }, 100)
      }
    }
    handleHashNavigation()
    window.addEventListener("hashchange", handleHashNavigation)
    return () => {
      window.removeEventListener("hashchange", handleHashNavigation)
    }
  }, [])

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Location Status Bar */}
      {/* In the return statement, update the location status bar condition */}
      {(locationLoading || locationError || userLocation) && (
        <div className="bg-green-700 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {locationLoading && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">{currentTexts.locationLoading}</span>
                </>
              )}
              {locationError && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{currentTexts.locationError}</span>
                </>
              )}
              {fetchError && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{fetchError}</span>
                </>
              )}
              {userLocation && !locationLoading && (
                <>
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {currentTexts.yourLocation}: {userLocation.city || "Unknown"}, {userLocation.country || "Cambodia"}
                    {userLocation.source === "gps" && " (GPS)"}
                  </span>
                </>
              )}
            </div>
            {!locationLoading && (
              <button
                onClick={getLocation}
                className="text-sm hover:text-yellow-300 transition-colors flex items-center gap-1"
              >
                <Navigation className="w-3 h-3" />
                {currentTexts.getLocation}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Agricultural background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/70 hero-overlay"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white mb-4 hero-title">
                {currentTexts.heroTitle}
              </h1>
              <div className="text-2xl lg:text-3xl font-semibold text-yellow-300 mb-6 hero-subtitle">
                {currentTexts.heroSubtitle}
              </div>
              <p className="text-lg lg:text-xl text-green-100 leading-relaxed mb-8 max-w-xl hero-description">
                {currentTexts.heroDescription}
              </p>
              <div className="relative max-w-xl mb-8 hero-search">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={currentTexts.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  />
                </div>
              </div>
              <button
                onClick={scrollToProducts}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto lg:mx-0 hero-cta transform hover:scale-105"
              >
                {currentTexts.exploreProducts}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative hero-cards">
              <div className="grid grid-cols-2 gap-4">
                {nearbyProducts.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${index === 0 ? "col-span-2" : ""
                      } hero-card`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full object-cover ${index === 0 ? "h-24" : "h-20"}`}
                      />
                      {product.isPopular && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Popular
                        </div>
                      )}
                      {product.distance && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.distance.toFixed(1)}km
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold">
                        {product.currency}
                        {product.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg hero-stat">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{nearbyProducts.length}+</div>
                  <div className="text-xs text-gray-600">Nearby Products</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg hero-stat">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-600">{userLocation ? `${nearbyRadius}km` : "∞"}</div>
                  <div className="text-xs text-gray-600">Search Radius</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: filteredAndSortedProducts.length.toString(),
                label: currentTexts.totalProducts,
                color: "text-green-700",
                bg: "bg-green-50",
                icon: Package,
              },
              {
                number: nearbyProducts.length.toString(),
                label: currentTexts.nearbyFarmers,
                color: "text-blue-700",
                bg: "bg-blue-50",
                icon: MapPin,
              },
              {
                number: "500+",
                label: currentTexts.activeFarmers,
                color: "text-yellow-700",
                bg: "bg-yellow-50",
                icon: Users,
              },
              {
                number: provinces.length.toString(),
                label: currentTexts.provinces,
                color: "text-purple-700",
                bg: "bg-purple-50",
                icon: MapIcon,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${stat.bg} p-8 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 border border-stone-200 stats-card`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 stats-icon`} />
                <div className={`text-3xl font-bold ${stat.color} mb-2 stats-number`}>{stat.number}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-br from-stone-50 to-green-50 map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{currentTexts.mapTitle}</h2>
            <p className="text-xl text-gray-600 mb-8">{currentTexts.mapDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => setShowMap(!showMap)}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 map-button"
              >
                <MapPin className="inline-block w-5 h-5 mr-2" />
                {showMap ? currentTexts.hideMap : currentTexts.viewMap}
              </button>
              {userLocation && (
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">{currentTexts.within}:</label>
                  <select
                    value={nearbyRadius}
                    onChange={(e) => setNearbyRadius(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value={10}>10 km</option>
                    <option value={25}>25 km</option>
                    <option value={50}>50 km</option>
                    <option value={100}>100 km</option>
                    <option value={500}>All Cambodia</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          {showMap && (
            <LocationMap
              userLocation={userLocation}
              products={filteredAndSortedProducts}
              currentTexts={currentTexts}
              nearbyRadius={nearbyRadius}
            />
          )}
        </div>
      </section>

      {/* Nearby Products Section */}
      {nearbyProducts.length > 0 && userLocation && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {currentTexts.nearbyFarmers} ({nearbyRadius}km)
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>
            {isLoading ? (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {nearbyProducts.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currentTexts={currentTexts}
                    currentLanguage={currentLanguage}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={toggleFavorite}
                    onOrder={handleOrder}
                    orderingProducts={orderingProducts}
                    orderedProducts={orderedProducts}
                    viewMode="grid"
                    provinces={provinces}
                    showDistance={true}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Products Section */}
      {popularProducts.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{currentTexts.popularProducts}</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </div>
            {isLoading ? (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {popularProducts.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currentTexts={currentTexts}
                    currentLanguage={currentLanguage}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={toggleFavorite}
                    onOrder={handleOrder}
                    orderingProducts={orderingProducts}
                    orderedProducts={orderedProducts}
                    viewMode="grid"
                    provinces={provinces}
                    showDistance={userLocation}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* All Products Section */}
      <ProductSection isLoggedIn={isLoggedIn} />
    </div>
  )
}
