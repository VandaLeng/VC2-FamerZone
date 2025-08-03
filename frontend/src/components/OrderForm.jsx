import React from 'react';

function OrderForm({
  selectedProduct,
  quantity,
  address,
  isSubmitting,
  setQuantity,
  setAddress,
  handleOrderSubmit,
  onClose,
}) {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">Order: {selectedProduct.name}</h3>
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          {/* Quantity */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
              required
            />
          </div>

          {/* Total Price */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Total Price</label>
            <p className="text-xl font-bold text-green-600 bg-green-50 border border-green-200 rounded-md px-4 py-2">
              ${(selectedProduct.price * quantity).toFixed(2)}
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Delivery Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your delivery location"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
