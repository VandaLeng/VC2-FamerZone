import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useProduct from "../services/useProduct";
import { MapPin, Star, Phone, Mail } from "lucide-react"; // Import Phone and Mail icons

function ProductSection() {
  const { allProducts, provinces, loading, error } = useProduct(); // Removed unused categories
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  // Sync filteredProducts with allProducts on initial load
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  // Close modal
  const closeDetail = () => setSelectedProduct(null);

  // Define currentTexts locally (matching ProductCard)
  const currentTexts = {
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    orderNow: "Order Now",
    from: "From",
    orderPlaced: "Order Placed",
  };

  // Placeholder functions and states (to match ProductCard props)
  const onOrder = () => {}; // Implement your order logic
  const orderingProducts = [];
  const orderedProducts = [];

  if (loading) return <div className="text-center py-16">Loading products...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Failed to load products. Please try again later.</div>;

  // Derive category name directly from selectedProduct.category
  const getCategoryName = (product) => {
    return product?.category?.name || "Unknown Category";
  };

  return (
    <div>
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">All Products</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className={viewMode === "grid" ? "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-6"}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTexts={currentTexts}
                currentLanguage="en"
                isFavorite={false} // Placeholder, implement your logic
                onToggleFavorite={() => {}} // Placeholder, implement your logic
                onOrder={onOrder} // Pass placeholder
                orderingProducts={orderingProducts}
                orderedProducts={orderedProducts}
                viewMode={viewMode}
                provinces={provinces}
                onShowDetail={setSelectedProduct} // Pass function to show details
              />
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* Modal for Product Details */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeDetail}>
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={closeDetail}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>

                {/* Product Details Section */}
                <div className="mb-8 border-b pb-6">
                  <h3 className="text-2xl font-bold mb-4">Product Details</h3>
                  {/* Item Image */}
                  <div className="mb-6">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  {/* Product Name */}
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{selectedProduct.name}</h2>
                  {/* Description */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">{selectedProduct.description || "No description available."}</p>
                  {/* Price, Stock, Quantity, and Location */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <p className="text-xl font-semibold text-green-700">
                        {selectedProduct.currency || "$"}{selectedProduct.price || 0}
                        <span className="text-gray-600 text-base ml-1">/{selectedProduct.unit || "Kg"}</span>
                      </p>
                    </div>
                    <span className="text-lg text-gray-700">
                      Quantity: {selectedProduct.quantity || "none"} {selectedProduct.unit || "items"}
                    </span>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        {currentTexts.from}{" "}
                        {provinces.find((p) => p.id === selectedProduct.province)?.name || selectedProduct.province || "Unknown Location"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Farmer Profile Section */}
                <div className="mb-8 border-b pb-6">
                  <h3 className="text-2xl font-bold mb-4">Farmer Profile</h3>
                  <div className="flex items-start gap-6 mb-4">
                    <img
                      src={selectedProduct.farmer?.avatar || "/placeholder.svg"}
                      alt={getFarmerName(selectedProduct)}
                      className="w-24 h-24 rounded-full object-cover border-4 border-stone-200 shadow-md"
                    />
                    <div>
                      <p className="text-2xl font-semibold text-gray-900 mb-2">{getFarmerName(selectedProduct)}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg text-gray-700">{selectedProduct.farmer?.rating || 0}/5</span>
                      </div>
                    </div>
                  </div>
                  {/* Farmer's Address, Phone, and Email */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        Address: {selectedProduct.farmer?.address || "No address available"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        Phone: {selectedProduct.farmer?.phone || "No phone number available"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        Email: {selectedProduct.farmer?.email || "No email available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Reviews and Average Star Rating */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4">User Reviews</h3>
                  <div className="mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${i < Math.floor(selectedProduct.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg text-gray-700">
                        {selectedProduct.rating || 0}/5 ({selectedProduct.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                  {/* Detailed Reviews */}
                  {selectedProduct.reviewsData && selectedProduct.reviewsData.length > 0 ? (
                    <div className="space-y-4">
                      {selectedProduct.reviewsData.map((review, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                          <p className="text-md font-medium text-gray-900">{review.user || "Anonymous"}:</p>
                          <p className="text-gray-600 text-base">{review.comment || "No comment provided."}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(review.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600">{review.rating || 0}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg text-gray-600">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(selectedProduct.id);
                      closeDetail();
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                    disabled={
                      !selectedProduct.inStock ||
                      orderingProducts.includes(selectedProduct.id) ||
                      orderedProducts.includes(selectedProduct.id)
                    }
                  >
                    {orderingProducts.includes(selectedProduct.id)
                      ? "Ordering..."
                      : orderedProducts.includes(selectedProduct.id)
                        ? currentTexts.orderPlaced
                        : currentTexts.orderNow}
                  </button>
                  <button
                    onClick={closeDetail}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  // Helper function to get farmer name
  function getFarmerName(product) {
    return "en" === "kh" // Using "en" as currentLanguage is hardcoded
      ? product.farmer?.nameKh || product.farmer?.name || "Unknown"
      : product.farmer?.name || product.farmer?.nameKh || "Unknown";
  }
}

export default ProductSection;