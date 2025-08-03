import React from 'react';

function OrderSummaryPage({ orderItems, address, onUpdateQuantity, onProceed }) {
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    onUpdateQuantity(productId, Number(newQuantity));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🧾 Order Summary</h2>

      {orderItems.length === 0 ? (
        <p className="text-center text-gray-500">No items selected.</p>
      ) : (
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 border rounded px-2 py-1"
                />
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          {/* Delivery Address */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg">📍 Delivery Address</h4>
            <p className="text-gray-700 mt-1">{address || "No address provided"}</p>
          </div>

          {/* Payment Method (Preview) */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg">💳 Payment Method</h4>
            <p className="text-gray-700 mt-1">Cash on Delivery</p>
          </div>

          {/* Total */}
          <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>

          {/* Proceed Button */}
          <button
            onClick={onProceed}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-6 font-semibold"
            disabled={!address || orderItems.length === 0}
          >
            Proceed to Payment
          </button>

          {/* Error Notice */}
          {(!address || orderItems.length === 0) && (
            <p className="text-red-500 text-sm mt-2 text-center">
              Please make sure all fields are filled before proceeding.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderSummaryPage;
