import React, { useState } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../services/useProduct';
import { placeOrder } from '../services/orderService';

function ProductSection() {
  const { allProducts, provinces, loading, error } = useProducts();
  const [buyerId] = useState(1); // Replace with authenticated user
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setAddress('');
  };

  const closeOrderForm = () => {
    setSelectedProduct(null);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) return;

    const total_price = quantity * selectedProduct.price;

    const orderData = {
      buyer_id: buyerId,
      product_id: selectedProduct.id,
      quantity,
      address,
      total_price,
    };

    try {
      setIsSubmitting(true);
      await placeOrder(orderData);
      alert("✅ Order placed successfully!");
      closeOrderForm();
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("❌ Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              isFavorite={false}
              onToggleFavorite={() => { }}
              onOrder={() => openOrderForm(product)}
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

      {/* Order Form Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={closeOrderForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Order: {selectedProduct.name}</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  required
                />
              </div>

              {/* ✅ Total Price */}
              <div>
                <label className="block mb-1 font-medium">Total Price</label>
                <p className="text-lg font-semibold text-green-700">
                  ${(selectedProduct.price * quantity).toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block mb-1 font-medium">Delivery Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductSection;
