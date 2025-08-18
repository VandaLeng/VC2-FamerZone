import React, { useState, useEffect } from 'react';
import { MoreVertical, User, Phone, Mail, MapPin, Calendar, ShoppingBag, Star, MessageCircle, Eye, UserX, Archive } from 'lucide-react';
import axios from 'axios';

const FarmerCustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [messageModal, setMessageModal] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/customers');
      const data = response.data.data.map(customer => ({
        ...customer,
        id: customer.id,
        joinDate: customer.join_date,
        totalOrders: customer.total_orders,
        totalSpent: customer.total_spent,
        lastOrderDate: customer.last_order_date,
        avatar: customer.avatar_url,
      }));
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      setError('Failed to fetch customers. Please try again.');
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    let filtered = customers;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        (customer.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.phone || '').includes(searchTerm) ||
        (customer.location || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  }, [statusFilter, searchTerm, customers]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleCustomerAction = async (customerId, action) => {
    try {
      setError(null);
      if (action === 'block' || action === 'unblock') {
        const status = action === 'block' ? 'blocked' : 'active';
        await axios.put(`/api/customers/${customerId}`, { status });
        fetchCustomers();
      } else if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this customer?')) {
          await axios.delete(`/api/customers/${customerId}`);
          fetchCustomers();
        }
      } else if (action === 'viewProfile') {
        const response = await axios.get(`/api/customers/${customerId}`);
        alert(`Profile for ${response.data.data.name}:\nEmail: ${response.data.data.email}\nPhone: ${response.data.data.phone}\nLocation: ${response.data.data.location || 'N/A'}\nJoined: ${formatDate(response.data.data.join_date)}\nStatus: ${response.data.data.status}`);
      } else if (action === 'viewOrders') {
        const response = await axios.get(`/api/customers/${customerId}/orders`);
        alert(`Orders for ${response.data.data.name}:\n${response.data.data.orders?.length || 0} orders found.`);
      } else if (action === 'sendMessage') {
        if (message) {
          await axios.post(`/api/customers/${customerId}/message`, { message });
          alert('Message sent successfully!');
          setMessage('');
          setMessageModal(null);
        } else {
          alert('Please enter a message before sending.');
        }
      }
      setActiveDropdown(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to perform action. Please try again.');
      console.error('Error performing action:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('km-KH');
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount || 0).toFixed(2)}`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">ការគ្រប់គ្រងអតិថិជន</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="ស្វែងរកអតិថិជន..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div className="w-full sm:w-40 md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="all">ទាំងអស់</option>
              <option value="active">សកម្ម</option>
              <option value="inactive">មិនសកម្ម</option>
              <option value="blocked">បានបិទ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {messageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">ផ្ញើសារ</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your message..."
              rows="4"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setMessageModal(null);
                  setMessage('');
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                បោះបង់
              </button>
              <button
                onClick={() => handleCustomerAction(messageModal, 'sendMessage')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                ផ្ញើ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-4 sm:mt-6">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">រកមិនឃើញអតិថិជន</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#EAF8E7] px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-2 sm:gap-4 font-semibold text-gray-700 text-xs sm:text-sm">
                <div className="col-span-3">ឈ្មោះអតិថិជន</div>
                <div className="col-span-2">ព័ត៌មានទាក់ទង</div>
                <div className="col-span-2">ទីតាំង</div>
                <div className="col-span-2 sm:col-span-1">បញ្ជាទិញ</div>
                <div className="col-span-2 sm:col-span-1">ចំណាយ</div>
                <div className="col-span-2">ស្ថានភាព</div>
                <div className="col-span-1">សកម្មភាព</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200 overflow-x-auto touch-auto">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 min-w-[640px]">
                  <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    {/* Customer Name */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={customer.avatar || '/api/placeholder/40/40'}
                          alt={customer.name || 'Customer'}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200"
                        />
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{customer.name || 'N/A'}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500 flex items-center mt-1">
                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                            ចាប់ពី {formatDate(customer.joinDate)}
                          </div>
                          <div className="flex items-center mt-1">
                            {renderStars(customer.rating)}
                            <span className="text-[10px] sm:text-xs text-gray-500 ml-1">({customer.rating || 0})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center text-[10px] sm:text-sm text-gray-600">
                          <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-2" />
                          <span className="truncate">{customer.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-[10px] sm:text-sm text-gray-600">
                          <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-2" />
                          <span>{customer.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <div className="flex items-center text-[10px] sm:text-sm text-gray-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                        <span className="truncate">{customer.location || 'N/A'}</span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
                        បញ្ជាទិញចុងក្រោយ: {formatDate(customer.lastOrderDate)}
                      </div>
                    </div>

                    {/* Total Orders */}
                    <div className="col-span-2 sm:col-span-1">
                      <div className="flex items-center">
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                        <span className="font-medium text-[#2D5016] text-[10px] sm:text-sm">{customer.totalOrders || 0}</span>
                      </div>
                    </div>

                    {/* Total Spent */}
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-semibold text-[#2D5016] text-[10px] sm:text-sm">{formatCurrency(customer.totalSpent)}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status === 'active' ? 'សកម្ម' : customer.status === 'inactive' ? 'មិនសកម្ម' : 'បានបិទ'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === customer.id ? null : customer.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>

                        {activeDropdown === customer.id && (
                          <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleCustomerAction(customer.id, 'viewProfile');
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                មើលប្រវត្តិរូប
                              </button>
                              <button
                                onClick={() => {
                                  handleCustomerAction(customer.id, 'viewOrders');
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-700 hover:bg-blue-50"
                              >
                                <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                មើលបញ្ជាទិញ
                              </button>
                              <button
                                onClick={() => {
                                  setMessageModal(customer.id);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-green-700 hover:bg-green-50"
                              >
                                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                ផ្ញើសារ
                              </button>
                              {customer.status === 'blocked' ? (
                                <button
                                  onClick={() => {
                                    handleCustomerAction(customer.id, 'unblock');
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-green-700 hover:bg-green-50"
                                >
                                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                  បើកអតិថិជន
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    handleCustomerAction(customer.id, 'block');
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700 hover:bg-red-50"
                                >
                                  <UserX className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                  បិទអតិថិជន
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  handleCustomerAction(customer.id, 'delete');
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700 hover:bg-red-50"
                              >
                                <Archive className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                លុបអតិថិជន
                              </button>
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

      {/* Custom CSS */}
      <style jsx>{`
        .bg-modern-green { 
          background-color: #DCFCE7; 
        }
        .hover\\:bg-modern-green:hover { 
          background-color: #DCFCE7; 
        }
        .touch-auto {
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 640px) {
          .min-w-[640px] {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FarmerCustomerManagement;