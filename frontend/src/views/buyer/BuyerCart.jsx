import React, { useState } from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw, ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'ម្រេចខ្យងបៃតង',
      nameEn: 'Green Chili Pepper',
      price: 8500,
      originalPrice: 10000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1583281629518-4c4c83a1dee8?w=300&h=300&fit=crop',
      weight: '1kg',
      farmer: 'កសិករ ម៉ៅ សុភា',
      inStock: true,
      discount: 15
    },
    {
      id: 2,
      name: 'ត្រសក់ស',
      nameEn: 'Fresh Lettuce',
      price: 4200,
      originalPrice: 5000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556909114-c7e5a0ba8bb0?w=300&h=300&fit=crop',
      weight: '500g',
      farmer: 'កសិករ លី វណ្ណី',
      inStock: true,
      discount: 16
    },
    {
      id: 3,
      name: 'ផ្លែប៉េងប៉ោះ',
      nameEn: 'Fresh Tomatoes',
      price: 6800,
      originalPrice: 8000,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1546470427-e26264be0b95?w=300&h=300&fit=crop',
      weight: '1kg',
      farmer: 'កសិករ ឆេង សុវណ្ណ',
      inStock: true,
      discount: 15
    },
    {
      id: 4,
      name: 'ស្ពៃបៃតង',
      nameEn: 'Green Vegetables Mix',
      price: 12000,
      originalPrice: 0,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop',
      weight: '2kg',
      farmer: 'កសិករ ខៀវ ម៉ានី',
      inStock: false,
      discount: 0
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

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
            <span className="text-sm font-medium">ត្រលប់ទៅទិញទំនិញ</span>
          </button>
          
          {/* Cart Title */}
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-100 p-2 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              រទេះទិញឥវ៉ាន់
            </h1>
          </div>
          
          {/* Item Count */}
          <p className="text-gray-600">
            {cartItems.length === 0 ? (
              <span>គ្មានទំនិញក្នុងរទេះ</span>
            ) : (
              <span>
                អ្នកមាន <span className="font-semibold text-green-600">{cartItems.length}</span> ធាតុក្នុងរទេះរបស់អ្នក
              </span>
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
                <h2 className="text-lg font-semibold text-gray-900">ទំនិញក្នុងរទេះ</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className={`p-6 ${!item.inStock ? 'bg-gray-50' : ''}`}>
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        {item.discount > 0 && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{item.discount}%
                          </div>
                        )}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xs font-medium">អស់ពីស្តុក</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.nameEn}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center">
                                <span className="font-medium">ទម្ងន់:</span>
                                <span className="ml-1">{item.weight}</span>
                              </span>
                              <span className="flex items-center">
                                <span className="font-medium">កសិករ:</span>
                                <span className="ml-1">{item.farmer}</span>
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
                                <span>ទំនិញនេះអស់ពីស្តុកហើយ</span>
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
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
                                សន្សំបាន {((item.originalPrice - item.price) * item.quantity).toLocaleString()} ៛
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">រទេះទិញឥវ៉ាន់ទទេ</h3>
                  <p className="text-gray-500 mb-6">សូមបន្ថែមទំនិញទៅក្នុងរទេះរបស់អ្នក</p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-all">
                    ចាប់ផ្តើមទិញទំនិញ
                  </button>
                </div>
              )}
            </div>

            {/* Features */}
            {cartItems.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">ដឹកជញ្ជូនឥតគិតថ្លៃ</p>
                    <p className="text-sm text-gray-500">លើសពី ៥០,០០០៛</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">ធានាគុណភាព</p>
                    <p className="text-sm text-gray-500">ទំនិញស្រស់ថ្មី ១០០%</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <RotateCcw className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">ងាយស្រួលប្តូរ</p>
                    <p className="text-sm text-gray-500">ក្នុងរយៈពេល ២៤ម៉ោង</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">សង្ខេបការបញ្ជាទិញ</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">តម្លៃសរុប ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} ធាតុ)</span>
                    <span className="font-medium">{subtotal.toLocaleString()} ៛</span>
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>ចុះតម្លៃ</span>
                      <span className="font-medium">-{discount.toLocaleString()} ៛</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ថ្លៃដឹកជញ្ជូន</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'ឥតគិតថ្លៃ' : `${shipping.toLocaleString()} ៛`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">សរុបទាំងអស់</span>
                      <span className="text-xl font-bold text-green-600">{total.toLocaleString()} ៛</span>
                    </div>
                  </div>

                  {subtotal < 50000 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        បន្ថែមទំនិញ <span className="font-semibold">{(50000 - subtotal).toLocaleString()} ៛</span> ទៀត 
                        ដើម្បីបានដឹកជញ្ជូនឥតគិតថ្លៃ!
                      </p>
                    </div>
                  )}

                  <button className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02]">
                    បន្តទៅបង់ប្រាក់
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all">
                    បន្តទិញទំនិញ
                  </button>
                </div>

                {/* Promo Code */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="លេខកូដបញ្ចុះតម្លៃ"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-all">
                      ប្រើ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;