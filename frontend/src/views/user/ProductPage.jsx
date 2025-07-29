import { useState, useMemo, useEffect } from "react";
import '../../styles/ProductStyle.css';
import provinces from "../../services/provinces";
import ProductCard from "../../components/ProductCard";
import productData from "../../data/productData"; // Adjust path based on your project structure
import ProductSection from "../../components/ProductSection";


import {
  MapPin, Search, Star, SlidersHorizontal, Grid,
  List, ChevronDown, MapIcon, Users, Package, ArrowRight
} from "lucide-react";

export default function ProductsPage({ currentLanguage = "en" }) {
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [orderingProducts, setOrderingProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Handle order
  const handleOrder = (productId) => {
    setOrderingProducts((prev) => [...prev, productId]);

    // Simulate order processing
    setTimeout(() => {
      setOrderingProducts((prev) => prev.filter((id) => id !== productId));
      setOrderedProducts((prev) => [...prev, productId]);

      // Show success message
      alert(currentTexts.orderSuccess);

      // Remove from ordered after 3 seconds
      setTimeout(() => {
        setOrderedProducts((prev) => prev.filter((id) => id !== productId));
      }, 3000);
    }, 1500);
  };

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
      mapTitle: "រកផលិតផលកសិករក្នុងតំបន់",
      mapDescription: "មើលផលិតផលពីកសិករនៅជិតអ្នក",
      viewMap: "មើលផែនទី",
      hideMap: "បិទផែនទី",
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
    },
    en: {
      heroTitle: "Fresh Agricultural Products",
      heroSubtitle: "Direct from Local Farmers",
      heroDescription: "Discover and buy high-quality agricultural products from farmers in your area. Connect directly with trusted local farmers for the freshest produce.",
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
      mapTitle: "Find Products Near You",
      mapDescription: "View products from farmers near your location",
      viewMap: "View Map",
      hideMap: "Hide Map",
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
    },
  };

  const currentTexts = texts[currentLanguage];

  // Categories with new additions
  const categories = [
    { id: "all", name: currentTexts.allCategories, color: "bg-stone-100" },
    { id: "vegetables", name: currentTexts.vegetables, color: "bg-green-100" },
    { id: "fruits", name: currentTexts.fruits, color: "bg-orange-100" },
    { id: "grains", name: currentTexts.grains, color: "bg-yellow-100" },
    { id: "livestock", name: currentTexts.livestock, color: "bg-blue-100" },
    { id: "beverages", name: currentTexts.beverages, color: "bg-purple-100" },
    { id: "seafood", name: currentTexts.seafood, color: "bg-teal-100" },
  ];

  // Sort options
  const sortOptions = [
    { id: "popular", name: currentTexts.sortPopular },
    { id: "price-low", name: currentTexts.sortPriceLow },
    { id: "price-high", name: currentTexts.sortPriceHigh },
    { id: "rating", name: currentTexts.sortRating },
    { id: "newest", name: currentTexts.sortNewest },
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Phnom Penh if location access is denied
          setUserLocation({ lat: 11.5564, lng: 104.9282 });
        }
      );
    } else {
      setUserLocation({ lat: 11.5564, lng: 104.9282 }); // Default to Phnom Penh
    }
  }, []);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Filtering and sorting logic with distance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = productData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameKh && product.nameKh.includes(searchQuery));
      const matchesProvince = selectedProvince === "all" || product.province === selectedProvince;
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesProvince && matchesCategory && matchesPrice;
    });

    if (userLocation) {
      filtered.forEach((product) => {
        product.distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          product.farmer.location.lat,
          product.farmer.location.lng
        );
      });
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "popular":
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedProvince, selectedCategory, priceRange, sortBy, userLocation]);

  const popularProducts = filteredAndSortedProducts.filter((product) => product.isPopular);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const clearFilters = () => {
    setSelectedProvince("all");
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([0, 10]);
  };

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
                {productData.slice(0, 4).map((product, index) => (
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

      {/* Map Section with Nearby Products */}
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
          {showMap && userLocation && (
            <div className="bg-white rounded-xl shadow-xl p-8 border border-stone-200 map-container">
              <div className="h-96 bg-stone-100 rounded-xl relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  {filteredAndSortedProducts
                    .filter((product) => product.distance < 50) // Show products within 50km
                    .map((product) => (
                      <div key={product.id} className="bg-white p-2 rounded-lg shadow-md mb-2 w-full max-w-xs">
                        <h4 className="font-bold text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-600">
                          {currentTexts.from} {provinces.find((p) => p.id === product.province)?.name},{" "}
                          {product.distance.toFixed(1)} km away
                        </p>
                        <p className="text-xs text-green-600">{product.currency}{product.price}/{product.unit}</p>
                      </div>
                    ))}
                  {filteredAndSortedProducts.filter((product) => product.distance < 50).length === 0 && (
                    <p className="text-stone-600 font-medium">No products within 50km</p>
                  )}
                </div>
              </div>
            </div>
          )}
          {!userLocation && showMap && (
            <div className="bg-white rounded-xl shadow-xl p-8 border border-stone-200 map-container">
              <div className="h-96 bg-stone-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-600 font-medium">Loading map...</p>
                  <p className="text-sm text-stone-500 mt-2">Please allow location access</p>
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
                  provinces={provinces}
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
                {productData.length} {currentTexts.products}
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
      {/* All Items Section */}
      <ProductSection/>
    </div>
  );
}