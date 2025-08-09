// File: ProductSection.js
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Package, Loader2, RefreshCw } from 'lucide-react';

function ProductSection({
  products: propProducts,
  currentTexts,
  currentLanguage = "en",
  favorites = [],
  onToggleFavorite,
  onOrder,
  orderingProducts = [],
  orderedProducts = [],
  viewMode = "grid",
  provinces = [],
  onShowDetail,
  isLoading = false,
  error = null,
  categories = []
}) {
  const [products, setProducts] = useState(propProducts || []);
  const [localLoading, setLocalLoading] = useState(!propProducts && !isLoading);
  const [localError, setLocalError] = useState(error);

  const defaultTexts = {
    allProducts: "All Products",
    noProductsFound: "No products found",
    orderNow: "Order Now",
    orderPlaced: "Order Placed",
    orderSuccess: "Order placed successfully! The farmer will contact you soon",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    from: "From",
    loadingProducts: "Loading products...",
    errorLoadingProducts: "Error loading products",
    tryAgain: "Try Again",
    refreshProducts: "Refresh Products",
    category: "Category",
    status: "Status",
    orders: "Orders",
    reviews: "Reviews",
    active: "Active",
    inactive: "Inactive"
  };

  const texts = { ...defaultTexts, ...currentTexts };

  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
      setLocalLoading(false);
      setLocalError(null);
    } else if (!isLoading) {
      fetchProducts();
    }
  }, [propProducts, isLoading]);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const fetchProducts = async () => {
    try {
      setLocalLoading(true);
      setLocalError(null);
      
      console.log('Fetching products from API...');
      const response = await fetch('http://localhost:8000/api/items');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && data.data) {
        setProducts(data.data);
        console.log('Products loaded successfully:', data.data.length);
      } else {
        throw new Error(data.message || 'Invalid API response format');
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLocalError(error.message || "Failed to load products");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleToggleFavorite = (productId) => {
    if (onToggleFavorite) {
      onToggleFavorite(productId);
    }
  };

  const handleOrder = (productId) => {
    if (onOrder) {
      onOrder(productId);
    }
  };

  const handleShowDetail = (product) => {
    if (onShowDetail) {
      onShowDetail(product);
    } else {
      console.log("Show product detail:", product);
    }
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  const loading = isLoading || localLoading;
  const displayError = error || localError;

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
            <p className="mt-2 text-gray-600">{texts.loadingProducts}</p>
          </div>
        </div>
      </section>
    );
  }

  if (displayError) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">{displayError}</p>
            <button 
              onClick={handleRefresh}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              {texts.tryAgain}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              {texts.allProducts}
            </h2>
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title={texts.refreshProducts}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">Found {products.length} products</p>
        </div>

        {products.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTexts={texts}
                currentLanguage={currentLanguage}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
                onOrder={handleOrder}
                orderingProducts={orderingProducts}
                orderedProducts={orderedProducts}
                viewMode={viewMode}
                provinces={provinces}
                categories={categories}
                onShowDetail={handleShowDetail}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">{texts.noProductsFound}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              {texts.refreshProducts}
            </button> 
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;