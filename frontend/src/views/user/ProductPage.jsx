"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import "../../styles/ProductStyle.css"
import provinces from "../../services/provinces"
import ProductCard from "../../components/ProductCard"
import productData from "../../data/productData"
import LocationMap from "../../components/LocationMap"
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

export default function ProductsPage({ currentLanguage = "en" }) {
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

  // Refs for scrolling
  const productsRef = useRef(null)
  const filtersRef = useRef(null)

  // Handle URL hash navigation and query parameters
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash
      const urlParams = new URLSearchParams(window.location.search)

      // Handle category from URL parameter
      const categoryParam = urlParams.get("category")
      if (categoryParam && categoryParam !== "all") {
        setSelectedCategory(categoryParam)
      }

      // Handle hash navigation
      if (hash === "#products-section") {
        setTimeout(() => {
          scrollToProducts()
        }, 100) // Small delay to ensure component is rendered
      }
    }

    // Run on component mount
    handleHashNavigation()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashNavigation)

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation)
    }
  }, [])

  // Scroll to products section
  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Handle order
  const handleOrder = (productId) => {
    setOrderingProducts((prev) => [...prev, productId])
    setTimeout(() => {
      setOrderingProducts((prev) => prev.filter((id) => id !== productId))
      setOrderedProducts((prev) => [...prev, productId])
      alert(currentTexts.orderSuccess)
      setTimeout(() => {
        setOrderedProducts((prev) => prev.filter((id) => id !== productId))
      }, 3000)
    }, 1500)
  }

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
      freshFromFarm: "ស្រស់ពីកសិ��្ឋាន",
      organicCertified: "វិញ្ញាបនបត្រធម្មជាតិ",
      fastDelivery: "ដឹកជញ្ជូនលឿន",
      qualityGuaranteed: "ធានាគុណភាព",
      orderNow: "បញ្ជាទិញឥឡូវ",
      orderPlaced: "បានបញ្ជាទិញ",
      orderSuccess: "បញ្ជាទិញបានជោគជ័យ! កសិករនឹងទាក់ទងអ្នកក្នុងពេលឆាប់ៗ",
      radiusFilter: "ជួរចម្ងាយ",
      within: "ក្នុងរង្វង់",
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
    },
  }

  const currentTexts = texts[currentLanguage]

  // Categories with new additions
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

  // Get user location using multiple methods
  const getLocation = async () => {
    setLocationLoading(true)
    setLocationError(null)
    try {
      // First try browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              source: "gps",
            }
            // Get additional location details from reverse geocoding
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

  // Calculate distance between two coordinates (Haversine formula)
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

  // Enhanced filtering and sorting logic with distance
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productData.map((product) => {
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

    // Apply filters
    filtered = filtered.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameKh && product.nameKh.includes(searchQuery))
      const matchesProvince = selectedProvince === "all" || product.province === selectedProvince
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesDistance = !userLocation || !product.distance || product.distance <= nearbyRadius

      return matchesSearch && matchesProvince && matchesCategory && matchesPrice && matchesDistance
    })

    // Apply sorting
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
  }, [searchQuery, selectedProvince, selectedCategory, priceRange, sortBy, userLocation, nearbyRadius])

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
  }

  // Auto-get location on component mount
  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Location Status Bar */}
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

      {/* Enhanced Hero Section */}
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
                    className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      index === 0 ? "col-span-2" : ""
                    } hero-card`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
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
                number: "25",
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

      {/* Interactive Map Section */}
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
          </div>
        </section>
      )}

      {/* Enhanced Filters and Controls */}
      <section ref={filtersRef} className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Main Filter Bar */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col space-y-4">
                {/* Top Row - Primary Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Section - Search & Primary Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                    {/* Mobile Filter Toggle */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-sm shadow-sm"
                      aria-label={currentTexts.filters}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>{currentTexts.filters}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                      />
                    </button>
                    {/* Province Filter - Desktop */}
                    <div className="relative hidden lg:block">
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="min-w-[200px] px-4 py-2.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                      >
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  {/* Right Section - View Controls */}
                  <div className="flex items-center gap-3">
                    {/* Results Count */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <span className="text-xs font-medium text-gray-600">
                        {filteredAndSortedProducts.length} {currentTexts.of} {productData.length}
                      </span>
                    </div>
                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="min-w-[140px] px-3 py-2 pr-8 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "grid"
                            ? "bg-white text-green-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                        title="Grid View"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "list"
                            ? "bg-white text-green-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                        title="List View"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Categories - Desktop */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 transform scale-105"
                            : `${
                                category.color === "green"
                                  ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                                  : category.color === "orange"
                                    ? "bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200"
                                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                              } hover:shadow-md hover:scale-105`
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  {/* Clear Filters */}
                  {(selectedProvince !== "all" || selectedCategory !== "all" || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <span>{currentTexts.clearFilters}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Mobile Filters Dropdown */}
            <div
              className={`lg:hidden transition-all duration-300 ${showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="space-y-4">
                  {/* Mobile Province Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                    <div className="relative">
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                      >
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  {/* Mobile Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                            selectedCategory === category.id
                              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                              : `${
                                  category.color === "green"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : category.color === "orange"
                                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                                      : "bg-gray-50 text-gray-700 border border-gray-200"
                                }`
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Mobile Clear Filters */}
                  {(selectedProvince !== "all" || selectedCategory !== "all" || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 border border-red-200"
                    >
                      <span>{currentTexts.clearFilters}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Active Filters Summary (Mobile) */}
            {(selectedProvince !== "all" || selectedCategory !== "all" || searchQuery) && (
              <div className="lg:hidden px-6 py-3 bg-blue-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">
                    {currentTexts.showingResults} {filteredAndSortedProducts.length} {currentTexts.products}
                  </span>
                  <span className="text-xs text-blue-600">Filters active</span>
                </div>
              </div>
            )}
          </div>
          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-green-700 text-white"
                            : `${category.color} text-gray-700`
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {userLocation && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{currentTexts.radiusFilter}</label>
                    <select
                      value={nearbyRadius}
                      onChange={(e) => setNearbyRadius(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
          )}
        </div>
      </section>

      {/* All Products Section */}
      <section ref={productsRef} className="py-16 bg-stone-50" id="products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{currentTexts.allProducts}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredAndSortedProducts.map((product) => (
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
                viewMode={viewMode}
                provinces={provinces}
                showDistance={userLocation}
              />
            ))}
          </div>
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-stone-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {currentTexts.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
