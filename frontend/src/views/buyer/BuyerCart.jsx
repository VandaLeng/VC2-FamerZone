import React, { useContext } from "react";
import { CartContext } from "../../services/cartContext";
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw, ShoppingCart } from "lucide-react";

function BuyerCart({ currentLanguage = "en" }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const texts = {
    kh: {
      cartTitle: "រទេះទិញឥវ៉ាន់",
      emptyCart: "រទេះទិញឥវ៉ាន់របស់អ្នកទទេ",
      quantity: "បរិមាណ",
      price: "តម្លៃ",
      total: "សរុប",
      remove: "លុប",
      clearCart: "សម្អាតរទេះ",
      checkout: "ដាក់បញ្ជាទិញ",
      backToShop: "ត្រលប់ទៅទិញទំនិញ",
      itemsInCart: (count) => `អ្នកមាន <span class="font-semibold text-green-600">${count}</span> ធាតុក្នុងរទេះរបស់អ្នក`,
      emptyCartPrompt: "សូមបន្ថែមទំនិញទៅក្នុងរទេះរបស់អ្នក",
      shopNow: "ចាប់ផ្តើមទិញទំនិញ",
      weight: "ទម្ងន់",
      farmer: "កសិករ",
      outOfStock: "អស់ពីស្តុក",
      discountSaved: (amount) => `សន្សំបាន ${amount.toLocaleString()} ៛`,
      subtotal: (count) => `តម្លៃសរុប (${count} ធាតុ)`,
      discount: "ចុះតម្លៃ",
      shipping: "ថ្លៃដឹកជញ្ជូន",
      freeShipping: "ឥតគិតថ្លៃ",
      totalAll: "សរុបទាំងអស់",
      freeShippingPrompt: (amount) => `បន្ថែមទំនិញ <span class="font-semibold">${amount.toLocaleString()} ៛</span> ទៀត ដើម្បីបានដឹកជញ្ជូនឥតគិតថ្លៃ!`,
      promoCode: "លេខកូដបញ្ចុះតម្លៃ",
      apply: "ប្រើ",
      freeDelivery: "ដឹកជញ្ជូនឥតគិតថ្លៃ",
      freeDeliveryOver: "លើសពី ៥០,០០០៛",
      qualityGuarantee: "ធានាគុណភាព",
      freshProducts: "ទំនិញស្រស់ថ្មី ១០០%",
      easyReturns: "ងាយស្រួលប្តូរ",
      returnPeriod: "ក្នុងរយៈពេល ២៤ម៉ោង",
      continueShopping: "បន្តទិញទំនិញ"
    },
    en: {
      cartTitle: "Your Cart",
      emptyCart: "Your cart is empty",
      quantity: "Quantity",
      price: "Price",
      total: "Total",
      remove: "Remove",
      clearCart: "Clear Cart",
      checkout: "Proceed to Checkout",
      backToShop: "Back to Shopping",
      itemsInCart: (count) => `You have <span class="font-semibold text-green-600">${count}</span> items in your cart`,
      emptyCartPrompt: "Please add items to your cart",
      shopNow: "Start Shopping",
      weight: "Weight",
      farmer: "Farmer",
      outOfStock: "Out of Stock",
      discountSaved: (amount) => `Saved ${amount.toLocaleString()} ៛`,
      subtotal: (count) => `Subtotal (${count} items)`,
      discount: "Discount",
      shipping: "Shipping",
      freeShipping: "Free",
      totalAll: "Total",
      freeShippingPrompt: (amount) => `Add <span class="font-semibold">${amount.toLocaleString()} ៛</span> more to get free shipping!`,
      promoCode: "Promo Code",
      apply: "Apply",
      freeDelivery: "Free Delivery",
      freeDeliveryOver: "Over 50,000 ៛",
      qualityGuarantee: "Quality Guarantee",
      freshProducts: "100% Fresh Products",
      easyReturns: "Easy Returns",
      returnPeriod: "Within 24 Hours",
      continueShopping: "Continue Shopping"
    }
  };

  const currentTexts = texts[currentLanguage];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const discount = cartItems.reduce((sum, item) => {
    if (item.originalPrice > item.price) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">{currentTexts.backToShop}</span>
          </button>
          
          {/* Cart Title */}
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-100 p-2 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {currentTexts.cartTitle}
            </h1>
          </div>
          
          {/* Item Count */}
          <p className="text-gray-600">
            {cartItems.length === 0 ? (
              <span>{currentTexts.emptyCart}</span>
            ) : (
              <span dangerouslySetInnerHTML={{ __html: currentTexts.itemsInCart(cartItems.length) }} />
            )}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">{currentTexts.cartTitle}</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className={`p-6 ${!item.inStock ? 'bg-gray-50' : ''}`}>
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 relative">
                        <img
                          src={item.image_url || item.image || "/placeholder.svg?height=100&width=100"}
                          alt={currentLanguage === "kh" ? item.nameKh || item.name : item.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        {item.discount > 0 && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{item.discount}%
                          </div>
                        )}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{currentTexts.outOfStock}</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {currentLanguage === "kh" ? item.nameKh || item.name : item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{item.nameEn || item.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center">
                                <span className="font-medium">{currentTexts.weight}:</span>
                                <span className="ml-1">{item.weight || "N/A"}</span>
                              </span>
                              <span className="flex items-center">
                                <span className="font-medium">{currentTexts.farmer}:</span>
                                <span className="ml-1">{item.farmer || "N/A"}</span>
                              </span>
                            </div>
                            
                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-lg font-bold text-green-600">
                                {item.price.toLocaleString()} ៛
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  {item.originalPrice.toLocaleString()} ៛
                                </span>
                              )}
                            </div>

                            {!item.inStock && (
                              <div className="flex items-center text-red-600 text-sm mb-3">
                                <X className="h-4 w-4 mr-1" />
                                <span>{currentTexts.outOfStock}</span>
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              {(item.price * item.quantity).toLocaleString()} ៛
                            </p>
                            {item.originalPrice > item.price && (
                              <p className="text-sm text-green-600">
                                {currentTexts.discountSaved((item.originalPrice - item.price) * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cartItems.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{currentTexts.emptyCart}</h3>
                  <p className="text-gray-500 mb-6">{currentTexts.emptyCartPrompt}</p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-all">
                    {currentTexts.shopNow}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">{currentTexts.total}</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{currentTexts.subtotal(cartItems.reduce((sum, item) => sum + item.quantity, 0))}</span>
                    <span className="font-medium">{subtotal.toLocaleString()} ៛</span>
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>{currentTexts.discount}</span>
                      <span className="font-medium">-{discount.toLocaleString()} ៛</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{currentTexts.shipping}</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? currentTexts.freeShipping : `${shipping.toLocaleString()} ៛`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">{currentTexts.totalAll}</span>
                      <span className="text-xl font-bold text-green-600">{total.toLocaleString()} ៛</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Checkout functionality not implemented yet!")}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02]"
                  >
                    {currentTexts.checkout}
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all">
                    {currentTexts.continueShopping}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerCart;