// src/components/ProductSection.jsx
import React from "react";
import useProducts from "../services/useProduct";

const ProductSection = () => {
  const { allProducts, loading, error } = useProducts();

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {allProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
        >
          <img
            src={`http://localhost:8000/storage/${product.image}`}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-1 font-bold text-pink-500">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
