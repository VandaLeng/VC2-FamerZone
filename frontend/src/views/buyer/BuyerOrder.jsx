import React, { useState } from 'react';
import { 
  Package, Truck, CheckCircle, Clock, AlertCircle, X, 
  Search, Filter, Calendar, ChevronDown, Star, Heart,
  MoreHorizontal, Download, RefreshCw, MessageCircle,
  MapPin, Phone, User, Eye, ShoppingCart, ArrowRight
} from 'lucide-react';

const BuyerOrders = ({ currentLanguage = 'en' }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('all');

  // Language texts
  const texts = {
    kh: {
      myOrders: "ការបញ្ជាទិញរបស់ខ្ញុំ",
      searchOrders: "ស្វែងរកការបញ្ជាទិញ",
      filterBy: "តម្រងតាម",
      sortBy: "តម្រៀបតាម",
      all: "ទាំងអស់",
      pending: "កំពុងរង់ចាំ",
      confirmed: "បានបញ្ជាក់",
      shipped: "បានដឹកជញ្ជូន",
      delivered: "បានដល់",
      cancelled: "បានលុបចោល",
      dateNewest: "កាលបរិច្ឆេទថ្មីបំផុត",
      dateOldest: "កាលបរិច្ឆេទចាស់បំផុត",
      priceHighest: "តម្លៃខ្ពស់បំផុត",
      priceLowest: "តម្លៃទាបបំផុត",
      thisWeek: "សប្តាហ៍នេះ",
      thisMonth: "ខែនេះ",
      last3Months: "៣ខែចុងក្រោយ",
      orderNumber: "លេខការបញ្ជាទិញ",
      orderDate: "កាលបរិច្ឆេទ",
      farmer: "កសិករ",
      items: "ទំនិញ",
      total: "សរុប",
      status: "ស្ថានភាព",
      actions: "សកម្មភាព",
      viewDetails: "មើលព័ត៌មានលម្អិត",
      reorder: "បញ្ជាទិញម្តងទៀត",
      trackOrder: "តាមដានការបញ្ជាទិញ",  
      contactFarmer: "ទាក់ទងកសិករ",
      downloadInvoice: "ទាញយកវិក្កយបត្រ",
      cancelOrder: "លុបចោលការបញ្ជាទិញ",
      rateOrder: "វាយតម្លៃ",
      noOrders: "អ្នកមិនទាន់មានការបញ្ជាទិញនៅឡើយទេ",
      startShopping: "ចាប់ផ្តើមទិញទំនិញ",
      ordersFound: "រកឃើញការបញ្ជាទិញ",
      showingResults: "បង្ហាញលទ្ធផល",
      of: "នៃ",
      clearFilters: "សម្អាតតម្រង",
      quickActions: "សកម្មភាពរហ័ស",
      estimatedDelivery: "ការដឹកជញ្ជូនប៉ាន់ស្មាន",
      trackingNumber: "លេខតាមដាន",
      paymentMethod: "វិធីបង់ប្រាក់",
      subtotal: "សរុបរង",
      deliveryFee: "ថ្លៃដឹកជញ្ជូន",
      kg: "គីឡូក្រាម",
      piece: "គ្រាប់",
      bundle: "ចង",
      riel: "រៀល"
    },
    en: {
      myOrders: "My Orders",
      searchOrders: "Search orders...",
      filterBy: "Filter by",
      sortBy: "Sort by",
      all: "All",
      pending: "Pending",
      confirmed: "Confirmed", 
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      dateNewest: "Date (Newest)",  
      dateOldest: "Date (Oldest)",
      priceHighest: "Price (Highest)",
      priceLowest: "Price (Lowest)",
      thisWeek: "This Week",
      thisMonth: "This Month", 
      last3Months: "Last 3 Months",
      orderNumber: "Order #",
      orderDate: "Date",
      farmer: "Farmer",
      items: "Items",
      total: "Total",
      status: "Status",
      actions: "Actions",
      viewDetails: "View Details",
      reorder: "Reorder",
      trackOrder: "Track Order",
      contactFarmer: "Contact Farmer", 
      downloadInvoice: "Download Invoice",
      cancelOrder: "Cancel Order",
      rateOrder: "Rate Order",
      noOrders: "You haven't placed any orders yet",
      startShopping: "Start Shopping",
      ordersFound: "orders found",
      showingResults: "Showing",
      of: "of",
      clearFilters: "Clear Filters",
      quickActions: "Quick Actions",
      estimatedDelivery: "Est. Delivery",
      trackingNumber: "Tracking",
      paymentMethod: "Payment",
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      kg: "kg",
      piece: "pc",
      bundle: "bundle",
      riel: "KHR"
    }
  };

  const currentTexts = texts[currentLanguage];

  // Sample orders data
  const allOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-07-29",
      farmer: {
        name: currentLanguage === 'kh' ? "កសិករ ចាន់ សុភាព" : "Chan Sophea",
        phone: "+855 12 345 678",
        location: currentLanguage === 'kh' ? "ខេត្តកណ្តាល" : "Kandal Province",
        avatar: null,
        rating: 4.8
      },
      products: [
        { name: currentLanguage === 'kh' ? "ស្ពៃខ្ជុរ" : "Chinese Kale", quantity: 2, unit: currentTexts.kg, price: 3000 },
        { name: currentLanguage === 'kh' ? "ត្រកួន" : "Cucumber", quantity: 1, unit: currentTexts.kg, price: 2500 }
      ],
      subtotal: 8500,
      deliveryFee: 2500,
      total: 11000,
      status: "delivered",
      paymentMethod: "Credit Card",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-07-30",
      rating: 5,
      canReorder: true,
      canCancel: false
    },
    {
      id: "ORD-2024-002",
      date: "2024-07-28",
      farmer: {
        name: currentLanguage === 'kh' ? "កសិករ លី សុវណ្ណ" : "Lee Sovann",
        phone: "+855 97 654 321", 
        location: currentLanguage === 'kh' ? "ខេត្តតាកែវ" : "Takeo Province",
        avatar: null,
        rating: 4.9
      },
      products: [
        { name: currentLanguage === 'kh' ? "ទំពាំងបាយជូរ" : "Tomatoes", quantity: 3, unit: currentTexts.kg, price: 4000 }
      ],
      subtotal: 12000,
      deliveryFee: 3000,
      total: 15000,
      status: "shipped",
      paymentMethod: "Cash on Delivery",
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-07-30",
      rating: null,
      canReorder: true,
      canCancel: true
    },
    {
      id: "ORD-2024-003",
      date: "2024-07-27",
      farmer: {
        name: currentLanguage === 'kh' ? "កសិករ ពេជ្រ ស្រីមុំ" : "Pich Sreymom",
        phone: "+855 11 222 333",
        location: currentLanguage === 'kh' ? "ខេត្តកំពត" : "Kampot Province", 
        avatar: null,
        rating: 4.7
      },
      products: [
        { name: currentLanguage === 'kh' ? "ស្ពៃបៃតង" : "Lettuce", quantity: 2, unit: currentTexts.bundle, price: 2000 },
        { name: currentLanguage === 'kh' ? "កាឡែត" : "Cabbage", quantity: 1, unit: currentTexts.piece, price: 3500 }
      ],
      subtotal: 7500,
      deliveryFee: 2000,
      total: 9500,
      status: "confirmed",
      paymentMethod: "Mobile Payment",
      trackingNumber: "TRK456789123",
      estimatedDelivery: "2024-07-29",
      rating: null,
      canReorder: true,
      canCancel: true
    },
    {
      id: "ORD-2024-004",
      date: "2024-07-25",
      farmer: {
        name: currentLanguage === 'kh' ? "កសិករ ម៉ាក់ សុវណ្ណា" : "Mak Sovanna",
        phone: "+855 88 999 111",
        location: currentLanguage === 'kh' ? "ខេត្តកណ្តាល" : "Kandal Province",
        avatar: null,
        rating: 4.6
      },
      products: [
        { name: currentLanguage === 'kh' ? "ម្រេចកូរ" : "Chili", quantity: 0.5, unit: currentTexts.kg, price: 8000 }
      ],
      subtotal: 4000,
      deliveryFee: 2500,
      total: 6500,
      status: "pending",
      paymentMethod: "Credit Card",
      trackingNumber: null,
      estimatedDelivery: "2024-07-28",
      rating: null,
      canReorder: true,
      canCancel: true
    }
  ];

  // Filter and search logic
  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesDateRange = true;
    if (selectedDateRange !== 'all') {
      const orderDate = new Date(order.date);
      const today = new Date();
      const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
      
      switch (selectedDateRange) {
        case 'thisWeek':
          matchesDateRange = daysDiff <= 7;
          break;
        case 'thisMonth':
          matchesDateRange = daysDiff <= 30;
          break;
        case 'last3Months':
          matchesDateRange = daysDiff <= 90;
          break;
      }
    }
    
    return matchesStatus && matchesSearch && matchesDateRange;
  });

  // Sort logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'dateNewest':
        return new Date(b.date) - new Date(a.date);
      case 'dateOldest':
        return new Date(a.date) - new Date(b.date);
      case 'priceHighest':
        return b.total - a.total;
      case 'priceLowest':
        return a.total - b.total;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <Package className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statusCounts = {
    all: allOrders.length,
    pending: allOrders.filter(o => o.status === 'pending').length,
    confirmed: allOrders.filter(o => o.status === 'confirmed').length,
    shipped: allOrders.filter(o => o.status === 'shipped').length,
    delivered: allOrders.filter(o => o.status === 'delivered').length,
    cancelled: allOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentTexts.myOrders}</h1>
          <p className="text-gray-600">
            {currentTexts.showingResults} {sortedOrders.length} {currentTexts.of} {allOrders.length} {currentTexts.ordersFound}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`p-4 rounded-2xl text-center transition-all ${
                activeFilter === status
                  ? 'bg-white shadow-lg ring-2 ring-green-500'
                  : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-xs text-gray-600 capitalize">{currentTexts[status]}</div>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentTexts.searchOrders}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-10 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="dateNewest">{currentTexts.dateNewest}</option>
                <option value="dateOldest">{currentTexts.dateOldest}</option>
                <option value="priceHighest">{currentTexts.priceHighest}</option>
                <option value="priceLowest">{currentTexts.priceLowest}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-10 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="all">{currentTexts.all}</option>
                <option value="thisWeek">{currentTexts.thisWeek}</option>
                <option value="thisMonth">{currentTexts.thisMonth}</option>
                <option value="last3Months">{currentTexts.last3Months}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {(searchQuery || activeFilter !== 'all' || selectedDateRange !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  setSelectedDateRange('all');
                }}
                className="px-4 py-3 text-gray-600 hover:text-red-600 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span className="hidden md:block">{currentTexts.clearFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* Orders List */}
        {sortedOrders.length > 0 ? (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
                
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div>
                        <div className="text-lg font-bold text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-600">{order.date}</div>
                      </div>
                      
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{currentTexts[order.status]}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{order.total.toLocaleString()} {currentTexts.riel}</div>
                      <div className="text-sm text-gray-600">{order.products.length} {currentTexts.items}</div>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Farmer Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{currentTexts.farmer}</h4>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{order.farmer.name}</div>
                          <div className="flex items-center space-x-1 text-xs text-gray-600">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{order.farmer.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{order.farmer.location}</span>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{currentTexts.items}</h4>
                      <div className="space-y-2">
                        {order.products.slice(0, 2).map((product, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-900">{product.name}</span>
                            <span className="text-gray-600">{product.quantity} {product.unit}</span>
                          </div>
                        ))}
                        {order.products.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{order.products.length - 2} more items
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{currentTexts.subtotal}</span>
                          <span className="text-gray-900">{order.subtotal.toLocaleString()} {currentTexts.riel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{currentTexts.deliveryFee}</span>
                          <span className="text-gray-900">{order.deliveryFee.toLocaleString()} {currentTexts.riel}</span>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">{currentTexts.trackingNumber}</span>
                            <span className="text-gray-900 font-mono text-xs">{order.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-3xl">
                  <div className="flex flex-wrap gap-2">
                    
                    {/* Primary Actions */}
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{currentTexts.viewDetails}</span>
                    </button>

                    {order.status === 'shipped' && (
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                        <Truck className="w-4 h-4" />
                        <span>{currentTexts.trackOrder}</span>
                      </button>
                    )}

                    {/* Secondary Actions */}
                    {order.canReorder && (
                      <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                        <RefreshCw className="w-4 h-4" />
                        <span>{currentTexts.reorder}</span>
                      </button>
                    )}

                    <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" />
                      <span>{currentTexts.contactFarmer}</span>
                    </button>

                    <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      <span className="hidden md:block">{currentTexts.downloadInvoice}</span>
                    </button>

                    {/* Rate Order for delivered items */}
                    {order.status === 'delivered' && !order.rating && (
                      <button className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors text-sm">
                        <Star className="w-4 h-4" />
                        <span>{currentTexts.rateOrder}</span>
                      </button>
                    )}

                    {/* Show rating if already rated */}
                    {order.rating && (
                      <div className="flex items-center space-x-1 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{order.rating}/5</span>
                      </div>
                    )}

                    {/* Cancel order for pending/confirmed */}
                    {order.canCancel && (
                      <button className="flex items-center space-x-2 bg-white text-red-600 px-4 py-2 rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-sm ml-auto">
                        <X className="w-4 h-4" />
                        <span>{currentTexts.cancelOrder}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{currentTexts.noOrders}</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {currentLanguage === 'kh' 
                ? "ចាប់ផ្តើមស្វែងរកនិងទិញផលិតផលស្រស់ពីកសិករក្នុងតំបន់របស់យើង។"
                : "Start exploring and buying fresh products from our local farmers."}
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto">
              <ShoppingCart className="w-5 h-5" />
              <span>{currentTexts.startShopping}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;