import React, { useState } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../services/useProduct';
import { placeOrder } from '../services/orderService';
import OrderForm from './OrderForm'; // ✅ Import new component

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
      alert('✅ Order placed successfully!');
      closeOrderForm();
    } catch (err) {
      console.error('❌ Order failed:', err);
      alert('❌ Failed to place order.');
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
              currentTexts={{
                inStock: 'In Stock',
                outOfStock: 'Out of Stock',
                orderNow: 'Order Now',
                from: 'From',
              }}
              currentLanguage="en"
              isFavorite={false}
              onToggleFavorite={() => {}}
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

      {/* ✅ Order Form Component */}
      <OrderForm
        selectedProduct={selectedProduct}
        quantity={quantity}
        address={address}
        isSubmitting={isSubmitting}
        setQuantity={setQuantity}
        setAddress={setAddress}
        handleOrderSubmit={handleOrderSubmit}
        onClose={closeOrderForm}
      />
    </section>
  );
}

export default ProductSection;
  