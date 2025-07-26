import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../services/useProduct'; // Adjusted to match file name

function ProductSection() {
  const { allProducts, provinces, loading, error } = useProducts();

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error.message}</div>;

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">All Products</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currentTexts={{ inStock: 'In Stock', outOfStock: 'Out of Stock', orderNow: 'Order Now', from: 'From' }}
              currentLanguage="en"
              isFavorite={false} // Placeholder, implement your logic
              onToggleFavorite={() => {}} // Placeholder, implement your logic
              onOrder={() => {}} // Placeholder, implement your logic
              orderingProducts={[]}
              orderedProducts={[]}
              viewMode="grid"
              provinces={provinces}
            />
          ))}
        </div>

        {allProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;