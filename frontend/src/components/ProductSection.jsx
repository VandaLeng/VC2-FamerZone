import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useProduct from "../services/useProduct";
import { MapPin, Star } from "lucide-react"; // Import missing icons

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
              <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={closeDetail}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                {/* Item Image */}
                <div className="mb-4">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                {/* Category Name */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Category: {getCategoryName(selectedProduct)}</span>
                </div>
                <div className="mb-4">
                  <span className="text-lg font-bold text-green-700">
                    {selectedProduct.currency}{selectedProduct.price}
                    <span className="text-gray-500 text-sm">/{selectedProduct.unit}</span>
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {currentTexts.from}{" "}
                    {provinces.find((p) => p.id === selectedProduct.province)?.name || selectedProduct.province}
                  </span>
                </div>
                {/* Farmer Profile */}
                <div className="mb-4">
                  <p className="font-semibold mb-2">Farmer: {getFarmerName(selectedProduct)}</p>
                  <img
                    src={selectedProduct.farmer?.avatar || "/placeholder.svg"}
                    alt={getFarmerName(selectedProduct)}
                    className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-stone-200"
                  />
                  <p className="text-sm text-gray-500">Phone: {selectedProduct.farmer?.phone || "N/A"}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{selectedProduct.farmer?.rating || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(selectedProduct.id);
                      closeDetail();
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
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
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
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