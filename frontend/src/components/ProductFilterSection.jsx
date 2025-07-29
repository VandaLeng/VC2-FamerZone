import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, SlidersHorizontal, Grid, List } from "lucide-react";
import useProduct from "../services/useProduct"; // Adjust the path as needed

const ProductFilterSection = ({ onViewModeChange, onFilterChange, provinces }) => {
  const { allProducts, loading, error } = useProduct();
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-asc");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique categories from category_id
  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map((product) => product.category_id));
    return Array.from(uniqueCategories).map((id) => ({
      id: id.toString(),
      name: `Category ${id}`, // Replace with actual names if available from API or database
      color: `bg-gray-200`, // Default color, customize as needed
    })).concat([{ id: "all", name: "All", color: "bg-gray-200" }]);
  }, [allProducts]);

  // Sort options
  const sortOptions = [
    { id: "price-asc", name: "Price: Low to High" },
    { id: "price-desc", name: "Price: High to Low" },
    { id: "name-asc", name: "Name: A to Z" },
  ];

  // Filter and sort products based on province and category
  const filteredAndSortedProducts = allProducts
    .filter((product) => {
      const matchesProvince = selectedProvince === "all" || product.province === selectedProvince;
      const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
      return matchesProvince && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Update filtered products when filters or sort change
  useEffect(() => {
    if (onFilterChange) onFilterChange(filteredAndSortedProducts);
  }, [selectedProvince, selectedCategory, sortBy, onFilterChange, filteredAndSortedProducts]);

  // Clear filters
  const clearFilters = () => {
    setSelectedProvince("all");
    setSelectedCategory("all");
  };

  // Current texts
  const currentTexts = {
    filters: "Filters",
    showingResults: "Showing",
    of: "of",
    products: "Products",
    clearFilters: "Clear Filters",
  };

  // Handle view mode change
  useEffect(() => {
    if (onViewModeChange) onViewModeChange(viewMode);
  }, [viewMode, onViewModeChange]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
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
                  <option value="all">All Provinces</option>
                  {provinces && provinces.map((province) => (
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
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
              {allProducts.length} {currentTexts.products}
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
            {(selectedProvince !== "all" || selectedCategory !== "all") && (
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
                  <option value="all">All Provinces</option>
                  {provinces && provinces.map((province) => (
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
                      className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                        selectedCategory === category.id
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
  );
};

export default ProductFilterSection;