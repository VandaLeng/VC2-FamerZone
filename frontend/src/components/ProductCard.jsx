import React, { useContext } from 'react';
import { MapPin, Star, Heart, Phone, MessageCircle, TrendingUp, Package } from 'lucide-react';
import { CartContext } from '../services/cartContext';

function ProductCard({
  product,
  currentTexts,
  currentLanguage = "en",
  isFavorite = false,
  onToggleFavorite,
  onOrder,
  orderingProducts = [],
  orderedProducts = [],
  viewMode = "grid",
  provinces = [],
  categories = [],
  onShowDetail,
  showDistance = false,
}) {
  const { addToCart, cartItems } = useContext(CartContext);

  if (!product) {
    return null;
  }

  console.log("ProductCard - Product Data:", product);

  const productName = currentLanguage === "kh" ? product.nameKh || product.name : product.name;
  const productDescription = currentLanguage === "kh" ? product.descriptionKh || product.description : product.description;

  const farmer = product.user || product.farmer || {};
  const farmerName = currentLanguage === "kh"
    ? farmer.nameKh || farmer.name || "Unknown Farmer"
    : farmer.name || farmer.nameKh || "Unknown Farmer";

  let provinceName = "Unknown";
  if (product.province && typeof product.province === 'object') {
    provinceName = currentLanguage === "kh" ? product.province.nameKh || product.province.province_name : product.province.province_name;
  } else if (product.province_id && provinces.length > 0) {
    const province = provinces.find((p) => p.id === product.province_id);
    if (province) {
      provinceName = currentLanguage === "kh" ? province.nameKh || province.province_name : province.province_name;
    }
  }

  let categoryName = "Unknown";
  if (product.category && typeof product.category === 'object') {
    categoryName = currentLanguage === "kh" ? product.category.nameKh || product.category.name : product.category.name;
  } else if (product.category_id && categories.length > 0) {
    const category = categories.find((c) => c.id === product.category_id || c.id === product.category_id.toString());
    if (category) {
      categoryName = currentLanguage === "kh" ? category.nameKh || category.name : category.name;
    }
  }

  const statusColor = product.status === "active" ? "bg-green-500" : "bg-gray-400";
  const statusText = product.status === "active" ? (currentTexts.active || "Active") : (currentTexts.inactive || "Inactive");

  const isInStock = product.stock > 0;
  const isInCart = cartItems.some(item => item.id === product.id);

  // Currency conversion (1 USD = 4100 Riel approximately)
  const usdToRielRate = 4100;
  const priceUSD = product.price || 0;
  const priceRiel = Math.round(priceUSD * usdToRielRate);

  // Format price based on language
  const formatPrice = () => {
    if (currentLanguage === "kh") {
      return {
        price: priceRiel.toLocaleString(),
        currency: "៛", // Riel symbol
        currencyName: "រៀល"
      };
    } else {
      return {
        price: priceUSD.toFixed(2),
        currency: "$",
        currencyName: "USD"
      };
    }
  };

  const formattedPrice = formatPrice();

  // Format stock with unit
  const formatStock = () => {
    const stockText = currentLanguage === "kh" ? "ស្តុក" : "Stock";
    const stockValue = `${product.stock}${product.unit || ""}`;
    return `${stockText}: ${stockValue}`;
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder.svg?height=300&width=300";
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    const cleanPath = imageUrl.replace(/^\/?(storage\/)?/, '');
    return `http://localhost:8000/storage/${cleanPath}`;
  };

  const productImage = product.image_url || getImageUrl(product.image);

  if (viewMode === "list") {
    return (
      <div
        className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-200 cursor-pointer"
        onClick={() => onShowDetail && onShowDetail(product)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
            <img
              src={productImage}
              alt={productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                console.error(`Failed to load product image: ${productName}`);
                e.target.src = "/placeholder.svg?height=300&width=300";
              }}
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_popular && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {currentLanguage === "kh" ? "ពេញនិយម" : "Popular"}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 ${
                  isInStock ? "bg-green-600 text-white" : "bg-red-500 text-white"
                }`}
              >
                <Package className="w-3 h-3" />
                {product.stock}{product.unit || ""}
              </span>
              {showDistance && product.distance && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {product.distance.toFixed(1)} km
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite && onToggleFavorite(product.id);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{productName}</h3>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-indigo-600">
                    {currentLanguage === "kh" ? "ប្រភេទ" : "Category"}:
                  </span>
                  <span className="text-sm text-gray-700">{categoryName}</span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">{product.stock}{product.unit || ""}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {currentLanguage === "kh" ? "មកពី" : "From"} {provinceName}
                  </span>
                </div>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-lg text-white ${statusColor} mb-3`}>
                  {statusText}
                </span>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600">
                    {product.rating || 0} ({product.reviews || 0} {currentLanguage === "kh" ? "ការវាយតម្លៃ" : "reviews"})
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  ៛{priceRiel.toLocaleString()}
                </div>
                <div className="text-lg font-medium text-green-600">
                  ${priceUSD.toFixed(2)}
                </div>
                {showDistance && product.distance && (
                  <div className="text-sm text-blue-600 font-medium mt-2">
                    {product.distance.toFixed(1)} km away
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div className="flex items-center gap-3">
                {/* Avatar replaced with initial button */}
                <button
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg"
                >
                  {farmerName?.charAt(0).toUpperCase() || "F"}
                </button>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{farmerName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{farmer.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{farmer.rating || 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="text-green-700 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 mr-2"
                  disabled={!isInStock || isInCart}
                >
                  {isInCart
                    ? (currentLanguage === "kh" ? "នៅក្នុងកន្រ្តក" : "In Cart")
                    : (currentLanguage === "kh" ? "បញ្ជាទិញឥឡូវ" : "Order Now")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-stone-200 product-card cursor-pointer"
      onClick={() => onShowDetail && onShowDetail(product)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 product-image"
          onError={(e) => {
            console.error(`Failed to load product image: ${productName}`);
            e.target.src = "/placeholder.svg?height=300&width=300";
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {(product.is_popular || product.isPopular) && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 popular-badge">
              <TrendingUp className="w-3 h-3" />
              {currentLanguage === "kh" ? "ពេញនិយម" : "Popular"}
            </span>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 ${
              isInStock ? "bg-green-600 text-white" : "bg-red-500 text-white"
            } stock-badge`}
          >
            <Package className="w-3 h-3" />
            {formatStock()}
          </span>
          {showDistance && product.distance && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              {product.distance.toFixed(1)} km
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg favorite-btn"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500 favorite-active" : "text-gray-600"}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1 pr-2 line-clamp-1">{productName}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">{product.stock}{product.unit || ""}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-1">
          <strong>{currentLanguage === "kh" ? "ប្រភេទ" : "Category"}:</strong> {categoryName}
        </div>

        <div className="text-sm text-gray-600 mb-1">
          <strong>{currentLanguage === "kh" ? "ស្ថានភាព" : "Status"}:</strong>{" "}
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>
            {statusText}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-green-600" />
            <span className="text-sm text-gray-600">{currentLanguage === "kh" ? "មកពី" : "From"}</span>
            <span className="text-sm font-medium text-green-700">{provinceName}</span>
          </div>
          <div className="text-right price-display">
            <div className="text-lg font-bold text-green-700">
              ៛{priceRiel.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-green-600">
              ${priceUSD.toFixed(2)}
            </div>
          </div>
        </div>

        {showDistance && product.distance && (
          <div className="text-center mb-3">
            <span className="text-sm font-medium text-blue-600">
              {product.distance.toFixed(1)} km away
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 farmer-avatar">
            {/* Avatar replaced with initial button (smaller) */}
            <button
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm"
            >
              {farmerName?.charAt(0).toUpperCase() || "F"}
            </button>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium text-gray-700 truncate block">{farmerName}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="truncate">{farmer.phone || "N/A"}</span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg order-btn disabled:opacity-50 flex-shrink-0"
            disabled={!isInStock || isInCart}
          >
            {isInCart
              ? (currentLanguage === "kh" ? "នៅក្នុងកន្រ្តក" : "In Cart")
              : (currentLanguage === "kh" ? "បញ្ជាទិញឥឡូវ" : "Order Now")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
