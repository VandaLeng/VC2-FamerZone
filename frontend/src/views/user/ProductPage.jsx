import { useState, useMemo } from "react"
import '../../styles/ProductStyle.css';
import provinces from "../../services/provinces";
import ProductCard from "../../components/ProductCard";

import {
  MapPin, Search, Star, Heart, Phone, MessageCircle, SlidersHorizontal, Grid,
  List, ChevronDown, X, MapIcon, TrendingUp, Users, Package, ArrowRight, Shield, Truck, Award
} from "lucide-react"

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
  const [isLoading, setIsLoading] = useState(false)
  const [orderingProducts, setOrderingProducts] = useState([])
  const [orderedProducts, setOrderedProducts] = useState([])

  const handleOrder = (productId) => {
    setOrderingProducts((prev) => [...prev, productId])

    // Simulate order processing
    setTimeout(() => {
      setOrderingProducts((prev) => prev.filter((id) => id !== productId))
      setOrderedProducts((prev) => [...prev, productId])

      // Show success message (you can replace this with a proper toast/notification)
      alert(currentTexts.orderSuccess)

      // Remove from ordered after 3 seconds to reset button state
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
      filters: "តម្រង",
      clearFilters: "សម្អាតតម្រង",
      priceRange: "ជួរតម្លៃ",
      showingResults: "បង្ហាញលទ្ធផល",
      of: "នៃ",
      products: "ផលិតផល",
      mapTitle: "រកកសិករក្នុងតំបន់",
      mapDescription: "មើលទីតាំងកសិករនៅជិតអ្នក",
      viewMap: "មើលផែនទី",
      hideMap: "បិទផែនទី",
      vegetables: "បន្លែ",
      fruits: "ផ្លែឈើ",
      grains: "គ្រាប់ធញ្ញជាតិ",
      livestock: "សត្វចិញ្ចឹម",
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
      filters: "Filters",
      clearFilters: "Clear Filters",
      priceRange: "Price Range",
      showingResults: "Showing",
      of: "of",
      products: "products",
      mapTitle: "Find Farmers Near You",
      mapDescription: "View farmer locations in your area",
      viewMap: "View Map",
      hideMap: "Hide Map",
      vegetables: "Vegetables",
      fruits: "Fruits",
      grains: "Grains & Rice",
      livestock: "Livestock",
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
  ]

  // Sort options
  const sortOptions = [
    { id: "popular", name: currentTexts.sortPopular },
    { id: "price-low", name: currentTexts.sortPriceLow },
    { id: "price-high", name: currentTexts.sortPriceHigh },
    { id: "rating", name: currentTexts.sortRating },
    { id: "newest", name: currentTexts.sortNewest },
  ]

  // Sample products
  const sampleProducts = [
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      nameKh: "ប៉េងប៉ោះធម្មជាតិ",
      description: "Fresh organic tomatoes grown without pesticides",
      descriptionKh: "ប៉េងប៉ោះធម្មជាតិដាំដុះដោយគ្មានថ្នាំសំលាប់សត្វល្អិត",
      price: 2.5,
      currency: "$",
      image: "https://media.istockphoto.com/id/870915532/photo/man-holding-crate-ob-fresh-vegetables.jpg?s=612x612&w=0&k=20&c=k2dXOI-wxUy7lX77Pm90vU6TJXmAAv5VtK60ZZHIyCA=",
      category: "vegetables",
      province: "kandal",
      farmer: {
        name: "Sok Dara",
        nameKh: "សុខ ដារា",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 4.8,
        phone: "+855 12 345 678",
        location: { lat: 11.5564, lng: 104.9282 },
      },
      rating: 4.9,
      reviews: 45,
      inStock: true,
      isPopular: true,
      unit: "kg",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Premium Jasmine Rice",
      nameKh: "អង្ករម្លិះពិសេស",
      description: "High-quality jasmine rice from Battambang province",
      descriptionKh: "អង្ករម្លិះគុណភាពខ្ពស់ពីខេត្តបាត់ដំបង",
      price: 1.8,
      currency: "$",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "grains",
      province: "battambang",
      farmer: {
        name: "Chea Sophea",
        nameKh: "ជា សុភា",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 4.9,
        phone: "+855 17 234 567",
        location: { lat: 13.0957, lng: 103.2028 },
      },
      rating: 4.8,
      reviews: 67,
      inStock: true,
      isPopular: true,
      unit: "kg",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Sweet Dragon Fruit",
      nameKh: "ស្រលាញ់ផ្លែនាគ",
      description: "Sweet and juicy dragon fruit from local farms",
      descriptionKh: "ផ្លែនាគផ្អែម និងមានទឹកច្រើនពីកសិដ្ឋានក្នុងស្រុក",
      price: 3.2,
      currency: "$",
      image:
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "fruits",
      province: "kampong-cham",
      farmer: {
        name: "Pich Ratana",
        nameKh: "ពេជ្រ រតនា",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 4.7,
        phone: "+855 96 345 789",
        location: { lat: 12.0, lng: 105.4667 },
      },
      rating: 4.6,
      reviews: 32,
      inStock: true,
      isPopular: false,
      unit: "piece",
      createdAt: "2024-01-20",
    },
    {
      id: 4,
      name: "Fresh Chicken",
      nameKh: "មាន់ស្រស់",
      description: "Free-range chicken raised naturally",
      descriptionKh: "មាន់ចិញ្ចឹមធម្មជាតិដោយគ្មានថ្នាំ",
      price: 4.5,
      currency: "$",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "livestock",
      province: "siem-reap",
      farmer: {
        name: "Mao Pisach",
        nameKh: "ម៉ៅ ពិសាច",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 4.8,
        phone: "+855 78 456 123",
        location: { lat: 13.3671, lng: 103.8448 },
      },
      rating: 4.7,
      reviews: 28,
      inStock: true,
      isPopular: true,
      unit: "kg",
      createdAt: "2024-01-05",
    },
    {
      id: 5,
      name: "Green Lettuce",
      nameKh: "សាលាត់បៃតង",
      description: "Crispy fresh lettuce perfect for salads",
      descriptionKh: "សាលាត់ស្រស់ល្អសម្រាប់ធ្វើសាលាដ",
      price: 1.5,
      currency: "$",
      image:
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "vegetables",
      province: "phnom-penh",
      farmer: {
        name: "Lim Sokha",
        nameKh: "លឹម សុខា",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        phone: "+855 11 567 890",
        location: { lat: 11.5449, lng: 104.8922 },
      },
      rating: 4.5,
      reviews: 19,
      inStock: true,
      isPopular: false,
      unit: "bunch",
      createdAt: "2024-01-25",
    },
    {
      id: 6,
      name: "Ripe Mangoes",
      nameKh: "ស្វាយទុំ",
      description: "Sweet and ripe mangoes from Kampong Cham",
      descriptionKh: "ស្វាយផ្អែម និងទុំពីកំពង់ចាម",
      price: 2.8,
      currency: "$",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "fruits",
      province: "kampong-cham",
      farmer: {
        name: "Noun Veasna",
        nameKh: "នូន វាសនា",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 4.9,
        phone: "+855 89 123 456",
        location: { lat: 12.0, lng: 105.4667 },
      },
      rating: 4.8,
      reviews: 52,
      inStock: true,
      isPopular: true,
      unit: "kg",
      createdAt: "2024-01-18",
    },
  ]

  // Filtering and sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameKh && product.nameKh.includes(searchQuery))
      const matchesProvince = selectedProvince === "all" || product.province === selectedProvince
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesProvince && matchesCategory && matchesPrice
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
      case "popular":
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        break
    }

    return filtered
  }, [sampleProducts, searchQuery, selectedProvince, selectedCategory, priceRange, sortBy])

  const popularProducts = filteredAndSortedProducts.filter((product) => product.isPopular)

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const clearFilters = () => {
    setSelectedProvince("all")
    setSelectedCategory("all")
    setSearchQuery("")
    setPriceRange([0, 10])
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Enhanced Hero Section with Background Image - 90% Height */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden hero-section">
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

              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto lg:mx-0 hero-cta">
                {currentTexts.exploreProducts}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative hero-cards">
              <div className="grid grid-cols-2 gap-4">
                {sampleProducts.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${index === 0 ? "col-span-2" : ""
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
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold">
                        {product.currency}{product.price}
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
                  <div className="text-xl font-bold text-green-600">1,200+</div>
                  <div className="text-xs text-gray-600">Fresh Products</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg hero-stat">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-600">500+</div>
                  <div className="text-xs text-gray-600">Local Farmers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1,200+",
                label: currentTexts.totalProducts,
                color: "text-green-700",
                bg: "bg-green-50",
                icon: Package,
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
                color: "text-blue-700",
                bg: "bg-blue-50",
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
            <button
              onClick={() => setShowMap(!showMap)}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 map-button"
            >
              <MapPin className="inline-block w-5 h-5 mr-2" />
              {showMap ? currentTexts.hideMap : currentTexts.viewMap}
            </button>
          </div>
          {showMap && (
            <div className="bg-white rounded-xl shadow-xl p-8 border border-stone-200 map-container">
              <div className="h-96 bg-stone-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-600 font-medium">Interactive Map Component</p>
                  <p className="text-sm text-stone-500 mt-2">Farmer locations will be displayed here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Products Section */}
      {popularProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{currentTexts.popularProducts}</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularProducts.map((product) => (
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
                  provinces={provinces} // Pass provinces as a prop
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Controls */}
      <section className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Left side - Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {currentTexts.filters}
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Province Filter */}
                <div className="relative">
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Category Buttons */}
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category.id
                        ? "bg-green-700 text-white shadow-lg"
                        : `${category.color} text-gray-700 hover:shadow-md`
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Sort and View */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {currentTexts.showingResults} {filteredAndSortedProducts.length} {currentTexts.of}{" "}
                {sampleProducts.length} {currentTexts.products}
              </span>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-8 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View mode toggle */}
              <div className="flex border border-stone-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-stone-50"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-stone-50"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Clear filters */}
              {(selectedProvince !== "all" || selectedCategory !== "all" || searchQuery) && (
                <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium">
                  {currentTexts.clearFilters}
                </button>
              )}
            </div>
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
                        className={`p-3 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category.id
                          ? "bg-green-700 text-white"
                          : `${category.color} text-gray-700`
                          }`}
                      >
                        <span className="text-sm">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{currentTexts.allProducts}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-stone-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                    <div className="h-3 bg-stone-200 rounded w-1/2"></div>
                    <div className="h-8 bg-stone-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id} // Fixed key to use product.id instead of product.sampleProducts
                  product={product}
                  currentTexts={currentTexts}
                  currentLanguage={currentLanguage}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onOrder={handleOrder}
                  orderingProducts={orderingProducts}
                  orderedProducts={orderedProducts}
                  viewMode={viewMode}
                  provinces={provinces} // Pass provinces as a prop
                />
              ))}
            </div>
          )}

          {filteredAndSortedProducts.length === 0 && !isLoading && (
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