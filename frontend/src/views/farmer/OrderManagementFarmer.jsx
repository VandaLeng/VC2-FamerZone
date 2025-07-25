import React, { useState, useEffect } from 'react';
import { MoreVertical, Package, Calendar, User, MapPin, Phone, Mail, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const FarmerOrderManagement = ({ currentLanguage = 'en' }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Translations
  const texts = {
    kh: {
      title: 'ការគ្រប់គ្រងការបញ្ជាទិញ',
      searchPlaceholder: 'ស្វែងរកការបញ្ជាទិញ...',
      filterByStatus: 'តម្រងតាមស្ថានភាព',
      all: 'ទាំងអស់',
      pending: 'កំពុងរង់ចាំ',
      confirmed: 'បានបញ្ជាក់',
      delivered: 'បានដឹកជញ្ជូន',
      cancelled: 'បានលុបចោល',
      orderID: 'លេខបញ្ជាទិញ',
      product: 'ផលិតផល',
      customer: 'អតិថិជន',
      quantity: 'បរិមាណ',
      total: 'សរុប',
      status: 'ស្ថានភាព',
      orderDate: 'កាលបរិច្ឆេទបញ្ជាទិញ',
      actions: 'សកម្មភាព',
      viewDetails: 'មើលព័ត៌មានលម្អិត',
      confirmOrder: 'បញ្ជាក់ការបញ្ជាទិញ',
      markDelivered: 'សម្គាល់ថាបានដឹកជញ្ជូន',
      cancelOrder: 'លុបចោលការបញ្ជាទិញ',
      customerInfo: 'ព័ត៌មានអតិថិជន',
      deliveryAddress: 'អាសយដ្ឋានដឹកជញ្ជូន',
      noOrders: 'មិនមានការបញ្ជាទិញ',
      contactCustomer: 'ទាក់ទងអតិថិជន',
      orderSummary: 'សរុបការបញ្ជាទិញ'
    },
    en: {
      title: 'Order Management',
      searchPlaceholder: 'Search orders...',
      filterByStatus: 'Filter by Status',
      all: 'All',
      pending: 'Pending',
      confirmed: 'Confirmed',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      orderID: 'Order ID',
      product: 'Product',
      customer: 'Customer',
      quantity: 'Quantity',
      total: 'Total',
      status: 'Status',
      orderDate: 'Order Date',
      actions: 'Actions',
      viewDetails: 'View Details',
      confirmOrder: 'Confirm Order',
      markDelivered: 'Mark as Delivered',
      cancelOrder: 'Cancel Order',
      customerInfo: 'Customer Information',
      deliveryAddress: 'Delivery Address',
      noOrders: 'No orders found',
      contactCustomer: 'Contact Customer',
      orderSummary: 'Order Summary'
    }
  };

  const currentTexts = texts[currentLanguage];

  // Sample order data
  const sampleOrders = [
    {
      id: 'ORD-001',
      productName: 'Fresh Tomatoes',
      productImage: '/api/placeholder/60/60',
      customerName: 'Sophea Chan',
      customerPhone: '+855 12 345 678',
      customerEmail: 'sophea@email.com',
      quantity: 5,
      unit: 'kg',
      price: 2.50,
      total: 12.50,
      status: 'pending',
      orderDate: '2024-01-15',
      deliveryAddress: 'Phnom Penh, Cambodia'
    },
    {
      id: 'ORD-002',
      productName: 'Organic Lettuce',
      productImage: '/api/placeholder/60/60',
      customerName: 'David Kim',
      customerPhone: '+855 87 654 321',
      customerEmail: 'david@email.com',
      quantity: 3,
      unit: 'bunches',
      price: 1.80,
      total: 5.40,
      status: 'confirmed',
      orderDate: '2024-01-14',
      deliveryAddress: 'Siem Reap, Cambodia'
    },
    {
      id: 'ORD-003',
      productName: 'Fresh Carrots',
      productImage: '/api/placeholder/60/60',
      customerName: 'Maria Santos',
      customerPhone: '+855 96 789 012',
      customerEmail: 'maria@email.com',
      quantity: 2,
      unit: 'kg',
      price: 3.00,
      total: 6.00,
      status: 'delivered',
      orderDate: '2024-01-13',
      deliveryAddress: 'Battambang, Cambodia'
    }
  ];

  useEffect(() => {
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = orders;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      delivered: <Package className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setActiveDropdown(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'kh' ? 'km-KH' : 'en-US');
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentTexts.title}</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={currentTexts.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">{currentTexts.all}</option>
              <option value="pending">{currentTexts.pending}</option>
              <option value="confirmed">{currentTexts.confirmed}</option>
              <option value="delivered">{currentTexts.delivered}</option>
              <option value="cancelled">{currentTexts.cancelled}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-2">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{currentTexts.noOrders}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table Header */}
            <div className="bg-[#EAF8E7] px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 text-sm">
                <div className="col-span-2">{currentTexts.orderID}</div>
                <div className="col-span-3">{currentTexts.product}</div>
                <div className="col-span-2">{currentTexts.customer}</div>
                <div className="col-span-1">{currentTexts.quantity}</div>
                <div className="col-span-1">{currentTexts.total}</div>
                <div className="col-span-2">{currentTexts.status}</div>
                <div className="col-span-1">{currentTexts.actions}</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Order ID */}
                    <div className="col-span-2">
                      <div className="font-semibold text-[#2D5016]">{order.id}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(order.orderDate)}
                      </div>
                    </div>

                    {/* Product */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{order.productName}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(order.price)} per {order.unit}</div>
                        </div>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerPhone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1">
                      <span className="text-gray-900 font-medium">{order.quantity}</span>
                      <span className="text-gray-500 text-sm ml-1">{order.unit}</span>
                    </div>

                    {/* Total */}
                    <div className="col-span-1">
                      <span className="font-semibold text-[#2D5016]">{formatCurrency(order.total)}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{currentTexts[order.status]}</span>
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>

                        {activeDropdown === order.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <div className="py-1">
                              <button
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                {currentTexts.viewDetails}
                              </button>
                              
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                                  className="flex items-center w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  {currentTexts.confirmOrder}
                                </button>
                              )}
                              
                              {order.status === 'confirmed' && (
                                <button
                                  onClick={() => handleStatusUpdate(order.id, 'delivered')}
                                  className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                >
                                  <Package className="w-4 h-4 mr-2" />
                                  {currentTexts.markDelivered}
                                </button>
                              )}
                              
                              {(order.status === 'pending' || order.status === 'confirmed') && (
                                <button
                                  onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  {currentTexts.cancelOrder}
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerOrderManagement;