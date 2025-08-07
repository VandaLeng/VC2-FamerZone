import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "./ProductCard";
import useProduct from "../services/useProduct";
import { MapPin, Star, Phone, Mail, SlidersHorizontal, ChevronDown, Grid, List } from "lucide-react";
import { useCart } from "../services/cartContext";

function ProductSection({ isLoggedIn }) {
  const { allProducts, loading, error } = useProduct();
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  // Language-specific texts (Khmer only)
  const texts = {
    outOfStock: "ផលិតផលនេះអស់ពីស្តុក ឬមិនមាន។",
    addedToCart: "បានបន្ថែម {name} ទៅក្នុងរទេះរបស់អ្នកដោយជោគជ័យ!",
    loginPrompt: "សូមចូលប្រើ ឬចុះឈ្មោះដើម្បីធ្វើការកម្ម៉ង់។",
    inStock: "មាននៅក្នុងស្តុក",
    outOfStockLabel: "អស់ពីស្តុក",
    orderNow: "កម្ម៉ង់ឥឡូវ",
    from: "មកពី",
    orderPlaced: "បានកម្ម៉ង់",
    filters: "តម្រង",
    allProvinces: "គ្រប់ខេត្ត",
    clearFilters: "លុបតម្រង",
    showingResults: "បង្ហាញលទ្ធផល",
    products: "ផលិតផល",
    of: "នៃ",
  };
  const currentTexts = texts;

  // Derive provinces from allProducts
  const provinces = React.useMemo(() => {
    const uniqueProvinces = new Set();
    allProducts.forEach((product) => {
      if (typeof product.province === "object" && product.province?.id) {
        uniqueProvinces.add(product.province.id);
      } else if (typeof product.province === "string") {
        uniqueProvinces.add(product.province);
      }
    });
    return Array.from(uniqueProvinces).map((id) => ({
      id,
      name: allProducts.find((p) =>
        (typeof p.province === "object" && p.province?.id === id) || p.province === id
      )?.province?.name || id,
    }));
  }, [allProducts]);

  // Derive categories from allProducts
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set();
    allProducts.forEach((product) => {
      if (typeof product.category === "object" && product.category?.id) {
        uniqueCategories.add(product.category.id);
      } else if (product.categoryId) {
        uniqueCategories.add(product.categoryId);
      }
    });
    return Array.from(uniqueCategories).map((id) => ({
      id,
      name: allProducts.find((p) =>
        (typeof p.category === "object" && p.category?.id === id) || p.categoryId === id
      )?.category?.name || id,
      color: `bg-${id === "cat1" ? "green" : id === "cat2" ? "yellow" : "blue"}-50`,
    }));
  }, [allProducts]);

  useEffect(() => {
    let updatedProducts = [...allProducts];

    if (selectedProvince !== "all") {
      updatedProducts = updatedProducts.filter((product) => {
        if (typeof product.province === "object" && product.province?.id) {
          return product.province.id === selectedProvince;
        }
        return product.province === selectedProvince;
      });
    }

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => (product.category?.id === selectedCategory || product.categoryId === selectedCategory)
      );
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      updatedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-desc") {
      updatedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(b.price));
    }

    setFilteredProducts(updatedProducts);
  }, [allProducts, selectedProvince, selectedCategory, searchQuery, sortBy]);

  const closeDetail = () => setSelectedProduct(null);

  const onOrder = (productId) => {
    if (!isLoggedIn) {
      toast.error(currentTexts.loginPrompt, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const product = allProducts.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        stock: product.stock,
        unit: product.unit,
        image: product.image || "/placeholder.svg",
        weight: product.weight || product.unit,
        farmer: product.farmer?.name || "Unknown Farmer",
        originalPrice: product.originalPrice || product.price,
        discount: product.discount || 0,
        inStock: product.stock > 0,
      });
      toast.success(currentTexts.addedToCart.replace("{name}", product.name), {
        position: "bottom-right",
        autoClose: 3000,
      });
      closeDetail();
    } else {
      toast.error(currentTexts.outOfStock, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const orderingProducts = [];
  const orderedProducts = [];

  const clearFilters = () => {
    setSelectedProvince("all");
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("default");
  };

  const sortOptions = [
    { id: "default", name: "លំនាំដើម" },
    { id: "price-asc", name: "តម្លៃ: ទាបទៅខ្ពស់" },
    { id: "price-desc", name: "តម្លៃ: ខ្ពស់ទៅទាប" },
  ];

  if (loading) return <div className="text-center py-16">កំពុងផ្ទុកផលិតផល...</div>;
  if (error) return <div className="text-center py-16 text-red-500">បរាជ័យក្នុងការផ្ទុកផលិតផល។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។</div>;

  const getCategoryName = (product) => {
    return product?.category?.name || "ប្រភេទមិនស្គាល់";
  };

  function getFarmerName(product) {
    return product.farmer?.nameKh || product.farmer?.name || "មិនស្គាល់";
  }

  return (
    <div>
      <section ref={null} className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
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
                    <div className="relative hidden lg:block">
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="min-w-[200px] px-4 py-2.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                      >
                        <option value="all">{currentTexts.allProvinces}</option>
                        {Array.isArray(provinces) && provinces.length > 0 ? (
                          provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>គ្មានខេត្តណាមួយទេ</option>
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <span className="text-xs font-medium text-gray-600">
                        {filteredProducts.length} {currentTexts.of} {allProducts.length}
                      </span>
                    </div>
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
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                          }`}
                        title="ទិដ្ឋភាពក្រឡាចត្រង្គ"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                          }`}
                        title="ទិដ្ឋភាពបញ្ជី"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${selectedCategory === category.id
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 transform scale-105"
                          : `${category.color} text-gray-700 hover:shadow-md hover:scale-105 border border-gray-200`
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
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
            <div
              className={`lg:hidden transition-all duration-300 ${showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ខេត្ត</label>
                    <div className="relative">
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                      >
                        <option value="all">{currentTexts.allProvinces}</option>
                        {Array.isArray(provinces) && provinces.length > 0 ? (
                          provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>គ្មានខេត្តណាមួយទេ</option>
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ប្រភេទ</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${selectedCategory === category.id
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                            : `${category.color} text-gray-700 border border-gray-200`
                            }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
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
            {(selectedProvince !== "all" || selectedCategory !== "all" || searchQuery) && (
              <div className="lg:hidden px-6 py-3 bg-blue-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">
                    {currentTexts.showingResults} {filteredProducts.length} {currentTexts.products}
                  </span>
                  <span className="text-xs text-blue-600">តម្រងសកម្ម</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">ផលិតផលទាំងអស់</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className={viewMode === "grid" ? "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-6"}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTexts={currentTexts}
                isFavorite={false}
                onToggleFavorite={() => { }}
                onOrder={onOrder}
                orderingProducts={orderingProducts}
                orderedProducts={orderedProducts}
                viewMode={viewMode}
                provinces={provinces}
                onShowDetail={setSelectedProduct}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">រកមិនឃើញផលិតផល</h3>
              <p className="text-gray-500 mb-4">សូមកែសម្រួលការស្វែងរក ឬតម្រងរបស់អ្នក។</p>
            </div>
          )}

          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeDetail}>
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeDetail} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button>
                <div className="mb-8 border-b pb-6">
                  <h3 className="text-2xl font-bold mb-4">ព័ត៌មានលម្អិតផលិតផល</h3>
                  <div className="mb-6">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{selectedProduct.name}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">{selectedProduct.description || "គ្មានការពិពណ៌នា។"}</p>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <p className="text-xl font-semibold text-green-700">
                        {selectedProduct.currency || "$"}{selectedProduct.price || 0}
                        <span className="text-gray-600 text-base ml-1">/{selectedProduct.unit || "គីឡូក្រាម"}</span>
                      </p>
                    </div>
                    <span className="text-lg text-gray-700">
                      បរិមាណ: {selectedProduct.stock || "គ្មាន"} {selectedProduct.unit || "ឯកតា"}
                    </span>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        {currentTexts.from}{" "}
                        {provinces.find((p) => p.id === selectedProduct.province)?.name || selectedProduct.province || "ទីតាំងមិនស្គាល់"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-8 border-b pb-6">
                  <h3 className="text-2xl font-bold mb-4">ប្រវត្តិកសិករ</h3>
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
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        អាសយដ្ឋាន: {selectedProduct.farmer?.address || "គ្មានអាសយដ្ឋាន"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        ទូរស័ព្ទ: {selectedProduct.farmer?.phone || "គ្មានលេខទូរស័ព្ទ"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-green-600" />
                      <p className="text-lg text-gray-700">
                        អ៊ីមែល: {selectedProduct.farmer?.email || "គ្មានអ៊ីមែល"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4">ការវាយតម្លៃរបស់អ្នកប្រើប្រាស់</h3>
                  <div className="mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${i < Math.floor(selectedProduct.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg text-gray-700">
                        {selectedProduct.rating || 0}/5 ({selectedProduct.reviews || 0} ការវាយតម្លៃ)
                      </span>
                    </div>
                  </div>
                  {selectedProduct.reviewsData && selectedProduct.reviewsData.length > 0 ? (
                    <div className="space-y-4">
                      {selectedProduct.reviewsData.map((review, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                          <p className="text-md font-medium text-gray-900">{review.user || "អនាមិក"}:</p>
                          <p className="text-gray-600 text-base">{review.comment || "គ្មានមតិយោបល់។"}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(review.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="text-sm text-gray-600">{review.rating || 0}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg text-gray-600">នៅមិនទាន់មានការវាយតម្លៃ។ ក្លាយជាអ្នកដំបូងដែលវាយតម្លៃផលិតផលនេះ!</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(selectedProduct.id);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                    disabled={!selectedProduct.inStock || orderingProducts.includes(selectedProduct.id) || orderedProducts.includes(selectedProduct.id)}
                  >
                    {orderingProducts.includes(selectedProduct.id)
                      ? "កំពុងកម្ម៉ង់..."
                      : orderedProducts.includes(selectedProduct.id)
                        ? currentTexts.orderPlaced
                        : currentTexts.orderNow}
                  </button>
                  <button
                    onClick={closeDetail}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
                  >
                    បិទ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductSection;