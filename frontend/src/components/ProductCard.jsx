import { MapPin, Star, Heart, Phone, MessageCircle, TrendingUp } from "lucide-react";

function ProductCard({
  product,
  currentTexts,
  currentLanguage,
  isFavorite,
  onToggleFavorite,
  onOrder,
  orderingProducts,
  orderedProducts,
  viewMode = "grid",
  provinces,
  onShowDetail,
}) {
  const productName = currentLanguage === "kh" ? product.nameKh || product.name : product.name;
  const productDescription =
    currentLanguage === "kh" ? product.descriptionKh || product.description : product.description;
  const farmerName = currentLanguage === "kh"
    ? product.farmer?.nameKh || product.farmer?.name || "Unknown"
    : product.farmer?.name || product.farmer?.nameKh || "Unknown";

  const provinceName = provinces.find((p) => p.id === product.province)?.name || product.province;

  if (viewMode === "list") {
    return (
      <div
        className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-200 cursor-pointer"
        onClick={() => onShowDetail(product)}
      >
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isPopular && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  Popular
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  product.inStock ? "bg-green-600 text-white" : "bg-red-500 text-white"
                }`}
              >
                {product.inStock ? currentTexts.inStock : currentTexts.outOfStock}
              </span>
            </div>
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{productName}</h3>
                <p className="text-gray-600 text-sm mb-3">{productDescription}</p>

                {/* Province */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {currentTexts.from} {provinceName}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  {product.currency}
                  {product.price}
                  <span className="text-gray-500 text-sm">/{product.unit}</span>
                </div>
              </div>
            </div>

            {/* Farmer Info and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div className="flex items-center gap-3">
                <img
                  src={product.farmer.avatar || "/placeholder.svg"}
                  alt={farmerName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-stone-200"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{farmerName}</p>
                  {/* Contact Info */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{product.farmer.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.farmer.rating}</span>
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
                    onOrder(product.id);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 mr-2"
                  disabled={
                    !product.inStock || orderingProducts.includes(product.id) || orderedProducts.includes(product.id)
                  }
                >
                  {orderingProducts.includes(product.id)
                    ? "Ordering..."
                    : orderedProducts.includes(product.id)
                    ? currentTexts.orderPlaced
                    : currentTexts.orderNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-stone-200 product-card cursor-pointer"
      onClick={() => onShowDetail(product)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 product-image"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isPopular && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 popular-badge">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${
              product.inStock ? "bg-green-600 text-white" : "bg-red-500 text-white"
            } stock-badge`}
          >
            {product.inStock ? currentTexts.inStock : currentTexts.outOfStock}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg favorite-btn"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500 favorite-active" : "text-gray-600"}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1 pr-2">{productName}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 star" />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{productDescription}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">{currentTexts.from}</span>
            <span className="text-sm font-medium text-green-700">{provinceName}</span>
          </div>
          <div className="text-right price-display">
            <span className="text-lg font-bold text-green-700">
              {product.currency}{product.price}
            </span>
            <span className="text-gray-500 text-sm">/{product.unit}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 farmer-avatar">
            <img
              src={product.farmer.avatar || "/placeholder.svg"}
              alt={farmerName}
              className="w-8 h-8 rounded-full object-cover border border-stone-200"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 truncate">{farmerName}</span>
              {/* Contact Info */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>{product.farmer.phone || "N/A"}</span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrder(product.id);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg order-btn"
            disabled={!product.inStock || orderingProducts.includes(product.id) || orderedProducts.includes(product.id)}
          >
            {orderingProducts.includes(product.id)
              ? "..."
              : orderedProducts.includes(product.id)
              ? "✓"
              : currentTexts.orderNow}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;