import { useState, useMemo, useEffect, useRef, useContext } from "react";
import provinces from "../../services/provinces";
import ProductCard from "../../components/ProductCard";
import LocationMap from "../../components/LocationMap";
import ProductSection from "../../components/ProductSection";
import { MapPin, Search, Star, SlidersHorizontal, Grid, List, ChevronDown, MapIcon, Users, Package, ArrowRight, Navigation, Loader2, AlertCircle, X, Heart } from 'lucide-react';
import { ProductContext } from "../../services/ProductContext";

export default function ProductsPage({ currentLanguage = "en" }) {
  const { products } = useContext(ProductContext);
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [orderingProducts, setOrderingProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [currLocation, setCurrLocation] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [nearbyRadius, setNearbyRadius] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [categories, setCategories] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const productsRef = useRef(null);
  const filtersRef = useRef(null);

  const texts = {
    kh: {
      heroTitle: "ទីផ្សារកសិកម្មឌីជីថល",
      heroSubtitle: "ភ្ជាប់កសិករជាមួយអ្នកទិញ",
      heroDescription: "រកឃើញផលិតផលកសិកម្មស្រស់ពីកសិករក្នុងតំបន់របស់អ្នក។ គាំទ្រកសិកម្មក្នុងស្រុក និងទទួលបានអាហារដ៏ល្អបំផុត។",
      searchPlaceholder: "ស្វែងរកផលិតផល...",
      exploreProducts: "រុករកផលិតផល",
      allCategories: "ប្រភេទទាំងអស់",
      vegetables: "បន្លែ",
      fruits: "ផ្លែឈើ",
      grains: "គ្រាប់ធញ្ញជាតិ",
      livestock: "សត្វចិញ្ចឹម",
      beverages: "ភេសជ្ជៈ",
      seafood: "អាហារសមុទ្រ",
      allProvinces: "ខេត្តទាំងអស់",
      totalProducts: "ផលិតផលសរុប",
      nearbyFarmers: "កសិករក្បែរខ្លួន",
      activeFarmers: "កសិករសកម្ម",
      provinces: "ខេត្ត",
      filters: "តម្រង",
      priceRange: "ជួរតម្លៃ",
      radiusFilter: "ចម្ងាយ",
      clearFilters: "សម្អាតតម្រង",
      mapTitle: "រកឃើញផលិតផលក្នុងតំបន់",
      mapDescription: "ប្រើប្រាស់ផែនទីដើម្បីរកឃើញផលិតផលនៅក្បែរអ្នក",
      viewMap: "មើលផែនទី",
      hideMap: "លាក់ផែនទី",
      within: "ក្នុងរយៈ",
      popularProducts: "ផលិតផលពេញនិយម",
      allProducts: "ផលិតផលទាំងអស់",
      noProductsFound: "រកមិនឃើញផលិតផល",
      orderNow: "បញ្ជាទិញឥឡូវ",
      orderPlaced: "បានបញ្ជាទិញ",
      orderSuccess: "បញ្ជាទិញបានជោគជ័យ! កសិករនឹងទាក់ទងអ្នកឆាប់ៗ",
      inStock: "មានស្តុក",
      outOfStock: "អស់ស្តុក",
      from: "ពី",
      yourLocation: "ទីតាំងរបស់អ្នក",
      getLocation: "យកទីតាំង",
      locationLoading: "កំពុងយកទីតាំង...",
      locationError: "មិនអាចយកទីតាំងបាន",
      sortPopular: "ពេញនិយម",
      sortPriceLow: "តម្លៃទាប",
      sortPriceHigh: "តម្លៃខ្ពស់",
      sortRating: "ការវាយតម្លៃ",
      sortNewest: "ថ្មីបំផុត",
      sortDistance: "ចម្ងាយ",
      category: "ប្រភេទ",
      status: "ស្ថានភាព",
      orders: "បញ្ជាទិញ",
      reviews: "ការវាយតម្លៃ",
      active: "សកម្ម",
      inactive: "មិនសកម្ម"
    },
    en: {
      heroTitle: "Digital Agricultural Marketplace",
      heroSubtitle: "Connecting Farmers with Buyers",
      heroDescription: "Discover fresh agricultural products from local farmers in your area. Support local agriculture and get the best quality food.",
      searchPlaceholder: "Search for products...",
      exploreProducts: "Explore Products",
      allCategories: "All Categories",
      vegetables: "Vegetables",
      fruits: "Fruits",
      grains: "Grains",
      livestock: "Livestock",
      beverages: "Beverages",
      seafood: "Seafood",
      allProvinces: "All Provinces",
      totalProducts: "Total Products",
      nearbyFarmers: "Nearby Farmers",
      activeFarmers: "Active Farmers",
      provinces: "Provinces",
      filters: "Filters",
      priceRange: "Price Range",
      radiusFilter: "Distance",
      clearFilters: "Clear Filters",
      mapTitle: "Discover Products in Your Area",
      mapDescription: "Use the map to find products near you",
      viewMap: "View Map",
      hideMap: "Hide Map",
      within: "Within",
      popularProducts: "Popular Products",
      allProducts: "All Products",
      noProductsFound: "No products found",
      orderNow: "Order Now",
      orderPlaced: "Order Placed",
      orderSuccess: "Order placed successfully! The farmer will contact you soon",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      from: "From",
      yourLocation: "Your Location",
      getLocation: "Get Location",
      locationLoading: "Getting location...",
      locationError: "Unable to get location",
      sortPopular: "Popular",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortRating: "Rating",
      sortNewest: "Newest",
      sortDistance: "Distance",
      category: "Category",
      status: "Status",
      orders: "Orders",
      reviews: "Reviews",
      active: "Active",
      inactive: "Inactive"
    },
  };

  const currentTexts = texts[currentLanguage];

  const defaultCategories = [
    { id: "all", name: currentTexts.allCategories, color: "bg-stone-100" },
    { id: "1", name: currentTexts.vegetables, color: "bg-green-100" },
    { id: "2", name: currentTexts.fruits, color: "bg-orange-100" },
    { id: "3", name: currentTexts.grains, color: "bg-yellow-100" },
    { id: "4", name: currentTexts.livestock, color: "bg-blue-100" },
    { id: "5", name: currentTexts.beverages, color: "bg-purple-100" },
    { id: "6", name: currentTexts.seafood, color: "bg-teal-100" },
  ];

  const sortOptions = [
    { id: "popular", name: currentTexts.sortPopular },
    { id: "price-low", name: currentTexts.sortPriceLow },
    { id: "price-high", name: currentTexts.sortPriceHigh },
    { id: "rating", name: currentTexts.sortRating },
    { id: "newest", name: currentTexts.sortNewest },
    { id: "distance", name: currentTexts.sortDistance },
  ];

  useEffect(() => {
    setCategories(defaultCategories);
  }, [currentLanguage]);

  useEffect(() => {
    const handleProductUpdated = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    window.addEventListener('productUpdated', handleProductUpdated);
    return () => window.removeEventListener('productUpdated', handleProductUpdated);
  }, []);

  const getLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);

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
            };

            let closestProvince = provinces[0];
            let minDistance = Infinity;

            provinces.forEach(province => {
              const distance = calculateDistance(
                location.latitude,
                location.longitude,
                province.latitude,
                province.longitude
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestProvince = province;
              }
            });

            location.city = closestProvince.city;
            location.country = "Cambodia";
            location.province = closestProvince.id;

            setUserLocation(location);
            setCurrLocation(location);
            setLocationLoading(false);
          },
          async (error) => {
            console.log("GPS failed, using default location:", error);
            await getIPLocation();
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          }
        );
      } else {
        await getIPLocation();
      }
    } catch (error) {
      console.error("Location error:", error);
      setLocationError(currentTexts.locationError);
      setLocationLoading(false);
    }
  };

  const getIPLocation = async () => {
    try {
      const location = {
        latitude: 11.5564,
        longitude: 104.9282,
        city: "Phnom Penh",
        country: "Cambodia",
        province: "phnom-penh",
        source: "default",
      };
      setUserLocation(location);
      setCurrLocation(location);
      setLocationLoading(false);
    } catch (error) {
      console.error("IP location failed:", error);
      setLocationError(currentTexts.locationError);
      setLocationLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedProvince !== "all") {
      filtered = filtered.filter(product => {
        // Check both direct province_id and nested province object
        if (product.province_id === selectedProvince) {
          return true;
        }
        if (product.province && product.province.id === selectedProvince) {
          return true;
        }
        return false;
      });
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => {
        // Check both direct category_id and nested category object
        if (product.category_id === selectedCategory) {
          return true;
        }
        if (product.category && product.category.id === selectedCategory) {
          return true;
        }
        return false;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && (priceRange[1] === 0 || product.price <= priceRange[1])
    );

    if (userLocation && nearbyRadius < 500) {
      filtered = filtered.filter(product => {
        // Get coordinates from product's province
        let productLat, productLon;
        
        if (product.province && product.province.latitude && product.province.longitude) {
          productLat = product.province.latitude;
          productLon = product.province.longitude;
        } else if (product.latitude && product.longitude) {
          productLat = product.latitude;
          productLon = product.longitude;
        } else {
          // Find province from provinces array
          const province = provinces.find(p => p.id === product.province_id);
          if (province) {
            productLat = province.latitude;
            productLon = province.longitude;
          }
        }

        if (!productLat || !productLon) return true;

        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          productLat,
          productLon
        );
        product.distance = distance;
        return distance <= nearbyRadius;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        break;
      case "distance":
        if (userLocation) {
          filtered.sort((a, b) => {
            const distA = a.distance || 0;
            const distB = b.distance || 0;
            return distA - distB;
          });
        }
        break;
      case "popular":
      default:
        filtered.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, sortBy, userLocation, nearbyRadius, selectedProvince, selectedCategory, searchQuery, priceRange]);

  const popularProducts = filteredAndSortedProducts.filter((product) => product.is_popular);
  const nearbyProducts = filteredAndSortedProducts.filter((product) => {
    if (!userLocation) return false;
    
    let productLat, productLon;
    
    if (product.province && product.province.latitude && product.province.longitude) {
      productLat = product.province.latitude;
      productLon = product.province.longitude;
    } else if (product.latitude && product.longitude) {
      productLat = product.latitude;
      productLon = product.longitude;
    } else {
      const province = provinces.find(p => p.id === product.province_id);
      if (province) {
        productLat = province.latitude;
        productLon = province.longitude;
      }
    }

    if (!productLat || !productLon) return false;

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      productLat,
      productLon
    );
    return distance <= nearbyRadius;
  });

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const clearFilters = () => {
    setSelectedProvince("all");
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([0, 100]);
    setNearbyRadius(50);
    setSortBy("popular");
  };

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleOrder = (productId) => {
    setOrderingProducts((prev) => [...prev, productId]);
    setTimeout(() => {
      setOrderingProducts((prev) => prev.filter((id) => id !== productId));
      setOrderedProducts((prev) => [...prev, productId]);
      alert(currentTexts.orderSuccess);
      setTimeout(() => {
        setOrderedProducts((prev) => prev.filter((id) => id !== productId));
      }, 3000);
    }, 1500);
  };

  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    if (provinceId !== "all") {
      const province = provinces.find(p => p.id === provinceId);
      if (province) {
        setUserLocation({
          latitude: province.latitude,
          longitude: province.longitude,
          city: province.city,
          country: "Cambodia",
          province: province.id,
          source: "selected"
        });
      }
    }
  };

  // Auto-get location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get("category");

      if (categoryParam && categoryParam !== "all") {
        setSelectedCategory(categoryParam);
      }

      if (hash === "#products-section") {
        setTimeout(() => {
          scrollToProducts();
        }, 100);
      }
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      {(locationLoading || locationError || fetchError || userLocation) && (
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
                {filteredAndSortedProducts.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${index === 0 ? "col-span-2" : ""} hero-card`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={product.image_url || "/placeholder.svg?height=300&width=300&query=fresh agricultural product"}
                        alt={product.name}
                        className={`w-full object-cover ${index === 0 ? "h-24" : "h-20"}`}
                      />
                      {product.is_popular && (
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
                      <span className="text-green-600 font-bold">${product.price}</span>
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
                  <div className="text-xl font-bold text-green-600">{filteredAndSortedProducts.length}+</div>
                  <div className="text-xs text-gray-600">Available Products</div>
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
                number: "25+",
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

      <section ref={filtersRef} className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors duration-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {currentTexts.filters}
                <ChevronDown className={`w-4 h-4 ${showFilters ? "rotate-180" : ""} transition-transform duration-200`} />
              </button>

              <div className="relative">
                <input
                  type="text"
                  placeholder={currentTexts.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 w-full sm:w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <select
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              >
                <option value="all">{currentTexts.allProvinces}</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {currentLanguage === "kh" ? province.nameKh : province.province_name}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-green-700 text-white" : "bg-gray-100"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-green-700 text-white" : "bg-gray-100"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{currentTexts.priceRange}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">$0 - ${priceRange[1]}</span>
                  </div>

                  {userLocation && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{currentTexts.radiusFilter}</label>
                      <select
                        value={nearbyRadius}
                        onChange={(e) => setNearbyRadius(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value={10}>10 km</option>
                        <option value={25}>25 km</option>
                        <option value={50}>50 km</option>
                        <option value={100}>100 km</option>
                        <option value={500}>All Cambodia</option>
                      </select>
                    </div>
                  )}

                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors duration-200"
                  >
                    {currentTexts.clearFilters}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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
              selectedProvince={selectedProvince}
              onShowDetail={handleShowDetail}
              currentLanguage={currentLanguage}
              categories={defaultCategories}
            />
          )}
        </div>
      </section>

    {nearbyProducts.length > 0 && userLocation && (
      <section className="py-16 bg-white" ref={productsRef}>
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
            <div className={`grid gap-8 ${viewMode === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
              {nearbyProducts.map((product) => (
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
                  categories={defaultCategories}
                  showDistance={true}
                  onShowDetail={handleShowDetail}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    )}

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
            <div className={`grid gap-8 ${viewMode === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
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
                  viewMode={viewMode}
                  provinces={provinces}
                  categories={defaultCategories}
                  showDistance={userLocation}
                  onShowDetail={handleShowDetail}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    )}

    <ProductSection
      products={filteredAndSortedProducts}
      currentTexts={currentTexts}
      currentLanguage={currentLanguage}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onOrder={handleOrder}
      orderingProducts={orderingProducts}
      orderedProducts={orderedProducts}
      viewMode={viewMode}
      provinces={provinces}
      onShowDetail={handleShowDetail}
      isLoading={isLoading}
      error={fetchError}
      categories={defaultCategories}
    />

      {showProductDetail && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
                <button
                  onClick={() => setShowProductDetail(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image_url || "/placeholder.svg?height=400&width=400&query=fresh agricultural product"}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  {selectedProduct.province && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
                      <p className="text-gray-600">{selectedProduct.province.province_name}</p>
                      <p className="text-sm text-gray-500">
                        {selectedProduct.province.city}, {selectedProduct.province.country}
                      </p>
                      {selectedProduct.distance && (
                        <p className="text-sm text-green-600 font-medium">
                          {selectedProduct.distance.toFixed(1)} km away
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      ${selectedProduct.price}/{selectedProduct.unit}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({selectedProduct.rating})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Farmer Information</h4>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedProduct.user?.avatar || "/placeholder.svg?height=100&width=100&query=farmer portrait"}
                        alt={selectedProduct.user?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{selectedProduct.user?.name}</p>
                        <p className="text-sm text-gray-600">{selectedProduct.user?.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleOrder(selectedProduct.id)}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      disabled={orderingProducts.includes(selectedProduct.id) || orderedProducts.includes(selectedProduct.id)}
                    >
                      {orderingProducts.includes(selectedProduct.id)
                        ? "Ordering..."
                        : orderedProducts.includes(selectedProduct.id)
                        ? "Order Placed"
                        : "Order Now"}
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}