import { MapPin, Star, Heart, Phone, MessageCircle, TrendingUp } from "lucide-react";

function ProductCard({
  product,
  currentTexts,
  currentLanguage,
  isFavorite,
  onToggleFavorite,
  onOrder,
  orderingProducts = [],
  orderedProducts = [],
  viewMode = "grid",
  provinces = [],
}) {
  const productName = currentLanguage === "kh" ? product.nameKh || product.name : product.name;
  const productDescription = currentLanguage === "kh" ? product.descriptionKh || product.description : product.description;

  const farmer = product.farmer || {};
  const farmerName = currentLanguage === "kh"
    ? farmer.nameKh || farmer.name || "Unknown"
    : farmer.name || farmer.nameKh || "Unknown";

  // ✅ FIX: Province handling
  const provinceName = provinces.find((p) => p.id === product.province)?.name || product.province;

  const isOutOfStock = !product.inStock || product.quantity === 0;
  const isOrdering = orderingProducts.includes(product.id);
  const isOrdered = orderedProducts.includes(product.id);

  // ✅ LOGGING for debug
  console.log("Product ID:", product.id);
  console.log("Product Province ID:", product.province);
  console.log("Resolved Province Name:", provinceName);
  console.log("Order Conditions:", {
    isOutOfStock,
    isOrdering,
    isOrdered,
    canOrder: !isOutOfStock && !isOrdering && !isOrdered,
  });

  const handleOrderClick = () => {
    console.log("Clicked Order Now:", product.id);
    onOrder(product.id);
  };

  if (viewMode === "list") return null;

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-stone-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isPopular && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${isOutOfStock ? "bg-red-500" : "bg-green-600"} text-white`}>
            {isOutOfStock ? currentTexts.outOfStock : currentTexts.inStock}
          </span>
        </div>

        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800">{productName}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">{product.rating || 0}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{productDescription}</p>


        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">{currentTexts.from}</span>
              <span className="text-sm font-medium text-green-700">{provinceName}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-green-700">
              {product.currency || "$"}
              {product.price}
            </span>
            <span className="text-gray-500 text-sm">/{product.unit || "kg"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <img
              src={farmer.avatar || "/placeholder.svg"}
              alt={farmerName}
              className="w-8 h-8 rounded-full object-cover border border-stone-200"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">{farmerName}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Phone className="w-3 h-3" />
                <span>{farmer.phone || "N/A"}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="py-2 px-4 rounded-lg font-semibold text-sm bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:shadow-lg"
          >
            {isOrdering
              ? "Ordering..."
              : isOrdered
                ? currentTexts.orderPlaced || "✓"
                : currentTexts.orderNow}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
