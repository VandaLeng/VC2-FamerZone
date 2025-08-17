import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bell, 
  ShoppingCart, 
  Package, 
  Eye, 
  Check, 
  X, 
  Filter, 
  Search,
  Clock,
  DollarSign,
  Truck,
  CreditCard,
  AlertCircle,
  Download
} from 'lucide-react';

const NotificationsPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Fetch notifications from API
  // Helper for image URL
  const getImageUrl = (rawImage) => {
    if (!rawImage) return '/assets/fallback.png'; // Local fallback image
    if (rawImage.startsWith('http')) return rawImage;
    if (rawImage.startsWith('storage/')) return `http://127.0.0.1:8000/${rawImage}`;
    return `http://127.0.0.1:8000/storage/${rawImage.replace(/^storage[\\/]/, '')}`;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/order-items', {
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
        const mappedNotifications = Array.isArray(response.data)
          ? response.data.map(item => {
              return {
                id: item.id || 0,
                type: item.order?.status === 'pending' ? 'new_order' : 'order_update',
                priority: item.quantity > 10 ? 'high' : 'low',
                title: item.item?.name || `Order Item #${item.id}`,
                message: `Order ${item.order_id} updated with ${item.quantity} items.`,
                orderId: item.order_id || '',
                productName: item.item?.name || '',
                quantity: item.quantity || 0,
                price: item.price || '0.00',
                createdAt: item.created_at || new Date().toISOString(),
                updatedAt: item.updated_at || new Date().toISOString(),
                status: item.order?.status || 'pending',
                isRead: item.isRead || false,
                actions: item.actions || ['view_order'],
                messageIcon: item.quantity > 10 ? 'package' : 'shopping_cart',
                orderDetails: item.order || {},
                itemDetails: { ...item.item, image: getImageUrl(item.item?.image) },
              };
            })
          : [];
        setNotifications(mappedNotifications);
        setLoading(false);
      } catch (err) {
        setError('មិនអាចទាញយកការជូនដំណឹងបានទេ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។');
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Function to get notification icon based on type
  const getNotificationIcon = (type) => {
    const iconProps = { className: "w-12 h-12" };
    switch (type) {
      case 'new_order':
        return <ShoppingCart {...iconProps} style={{ color: '#228B22' }} />;
      case 'order_update':
        return <Package {...iconProps} style={{ color: '#1E90FF' }} />;
      case 'payment':
        return <DollarSign {...iconProps} style={{ color: '#FFD700' }} />;
      default:
        return <Bell {...iconProps} style={{ color: '#8B4513' }} />;
    }
  };

  // Function to get message icon based on icon type
  const getMessageIcon = (iconType) => {
    const iconProps = { className: "w-4 h-4 mr-2 inline" };
    switch (iconType) {
      case 'shopping_cart':
        return <ShoppingCart {...iconProps} style={{ color: '#228B22' }} />;
      case 'package':
        return <Package {...iconProps} style={{ color: '#1E90FF' }} />;
      case 'truck':
        return <Truck {...iconProps} style={{ color: '#8B4513' }} />;
      case 'credit_card':
        return <CreditCard {...iconProps} style={{ color: '#FFD700' }} />;
      default:
        return <AlertCircle {...iconProps} style={{ color: '#8B4513' }} />;
    }
  };

  // Function to calculate time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'ភ្លាមៗនេះ';
    if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? 'នាទីមុន' : 'នាទីមុន'}`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'ម៉ោងមុន' : 'ម៉ោងមុន'}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'ថ្ងៃមុន' : 'ថ្ងៃមុន'}`;
  };

  // Function to format status
  const formatStatus = (status) => ({
    text: {
      'confirmed': 'បានបញ្ជាក់',
      'delivered': 'បានដឹកជញ្ជូន',
      'cancelled': 'បានលុប',
      'pending': 'កំពុងរង់ចាំ',
    }[status] || status,
    className: {
      'confirmed': 'status-confirmed',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled',
      'pending': 'status-pending',
    }[status] || '',
  });

  // Action functions
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/order-items/${id}`, { isRead: true });
      setNotifications(prev => 
        prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch('http://127.0.0.1:8000/api/order-items/mark-all-read');
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/order-items/${id}`);
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' ? !notif.isRead : notif.type === filterType);
    const matchesSearch = searchTerm === '' || 
                         (notif.title?.includes(searchTerm) || '') ||
                         (notif.message?.includes(searchTerm) || '') ||
                         (notif.orderId?.includes(searchTerm) || '') ||
                         (notif.productName?.includes(searchTerm) || '');
    return matchesFilter && matchesSearch;
  });

  const sortedNotifications = filteredNotifications.sort((a, b) => {
    if (a.isRead !== b.isRead) return a.isRead - b.isRead;
    if (a.priority !== b.priority) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">កំពុងផ្ទុកការជូនដំណឹង...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="bg-white p-12 rounded-xl shadow-custom text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h3 className="text-xl font-semibold text-dark mb-2">កំហុស</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <style jsx>{`
        .primary-green { background-color: #228B22; }
        .secondary-brown { background-color: #8B4513; }
        .accent-yellow { background-color: #FFD700; }
        .text-dark { color: #333333; }
        .border-custom { border-color: #e0e0e0; }
        .shadow-custom { box-shadow: 0 4px 15px rgba(34, 139, 34, 0.1); }
        .gradient-header { background: linear-gradient(135deg, #228B22, #2D5016); }
        .notification-card:hover { transform: translateY(-2px); transition: all 0.3s ease; }
        .priority-high { border-left: 4px solid #dc3545; }
        .priority-medium { border-left: 4px solid #ffc107; }
        .priority-low { border-left: 4px solid #28a745; }
        .unread-indicator { background-color: #228B22; }
        .status-confirmed { color: #28a745; }
        .status-delivered { color: #17a2b8; }
        .status-cancelled { color: #dc3545; }
        .status-pending { color: #6c757d; }
        .modal { display: block; background: rgba(0, 0, 0, 0.5); }
        .modal-content { background: white; padding: 20px; border-radius: 8px; max-height: 80vh; overflow-y: auto; animation: slideIn 0.3s ease-out; }
        @keyframes slideIn { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .image-placeholder { width: 200px; height: 200px; object-fit: cover; border-radius: 8px; }
        .error-image { background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; }
      `}</style>

      <div className="max-w-6xl mx-auto p-6">
        <div className="gradient-header text-white p-8 rounded-xl mb-8 shadow-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-8 h-8" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">ការជូនដំណឹង</h1>
                <p className="text-xl opacity-90">ទទួលបានព័ត៌មានចុងក្រោយអំពីការបញ្ជាទិញ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-custom sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark flex items-center">
                  <Filter className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                  តម្រង
                </h3>
                <button
                  onClick={markAllAsRead}
                  className="text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ color: '#8B4513' }}
                  disabled={unreadCount === 0}
                >
                  សម្គាល់ទាំងអស់ថាបានអាន
                </button>
              </div>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ស្វែងរកការជូនដំណឹង..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { key: 'all', label: 'ទាំងអស់' },
                  { key: 'new_order', label: 'ការបញ្ជាទិញថ្មី' },
                  { key: 'order_update', label: 'ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ' },
                  { key: 'payment', label: 'ការទូទាត់' },
                  { key: 'unread', label: 'មិនទាន់អាន' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilterType(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                      filterType === key ? 'primary-green text-white' : 'hover:bg-gray-50 text-dark'
                    }`}
                  >
                    <span>{label}</span>
                    {key === 'unread' && unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {sortedNotifications.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-custom text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-dark mb-2">រកមិនឃើញការជូនដំណឹង</h3>
                <p className="text-gray-600">
                  {filterType === 'all' ? 'អ្នកបានអានអស់ហើយ!' : 'គ្មានការជូនដំណឹងដែលត្រូវនឹងតម្រងបច្ចុប្បន្នរបស់អ្នកទេ។'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-xl shadow-custom notification-card overflow-hidden ${
                      notification.priority === 'high' ? 'priority-high' :
                      notification.priority === 'medium' ? 'priority-medium' : 'priority-low'
                    } ${!notification.isRead ? 'ring-2 ring-green-200' : ''}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F5DC' }}>
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-dark">
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && <div className="w-3 h-3 rounded-full unread-indicator"></div>}
                              <span className="text-sm text-gray-500 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {getTimeAgo(notification.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="text-dark mb-4 leading-relaxed flex items-start">
                            {getMessageIcon(notification.messageIcon)}
                            <span>{notification.message}</span>
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">លេខការបញ្ជាទិញ:</span>
                                <p className="font-semibold" style={{ color: '#228B22' }}>#{notification.orderId}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">ផលិតផល:</span>
                                <p className="font-semibold text-dark">{notification.productName}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">បរិមាណ:</span>
                                <p className="font-semibold text-dark">{notification.quantity}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">តម្លៃ:</span>
                                <p className="font-semibold" style={{ color: '#8B4513' }}>${notification.price}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">ស្ថានភាព:</span>
                                <p className={`font-semibold ${formatStatus(notification.status).className}`}>
                                  {formatStatus(notification.status).text}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {notification.actions.includes('view_order') && (
                              <button
                                onClick={() => setSelectedNotification(notification)}
                                className="flex items-center space-x-2 px-4 py-2 primary-green text-white rounded-lg hover:opacity-90 transition-opacity"
                              >
                                <Eye className="w-4 h-4" />
                                <span>មើលការបញ្ជាទិញ</span>
                              </button>
                            )}
                            <div className="ml-auto flex items-center space-x-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                                  title="សម្គាល់ថាបានអាន"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                title="លុប"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detailed View Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 modal flex items-center justify-center z-50">
            <div className="modal-content w-full max-w-3xl p-6 bg-white rounded-lg shadow-custom">
              <div className="flex justify-between items-center mb-6 border-b border-custom pb-4">
                <h2 className="text-2xl font-bold text-dark">ព័ត៌មានលម្អិតនៃការបញ្ជាទិញ #{selectedNotification.orderId}</h2>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedNotification.itemDetails.image}
                    alt={selectedNotification.productName}
                    className="image-placeholder mb-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/fallback.png'; // Use local fallback
                      e.target.className += ' error-image';
                    }}
                  />
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600">ផលិតផល:</span>
                      <p className="font-semibold text-dark">{selectedNotification.productName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">បរិមាណ:</span>
                      <p className="font-semibold text-dark">{selectedNotification.quantity}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">តម្លៃធម្មតា:</span>
                      <p className="font-semibold" style={{ color: '#8B4513' }}>${selectedNotification.price}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600">លេខការបញ្ជាទិញ:</span>
                      <p className="font-semibold text-dark">#{selectedNotification.orderId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">តម្លៃសរុប:</span>
                      <p className="font-semibold" style={{ color: '#8B4513' }}>
                        ${selectedNotification.orderDetails.total_price || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">អាសយដ្ឋាន:</span>
                      <p className="font-semibold text-dark">{selectedNotification.orderDetails.address || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">កាលបរិច្ឆេទ:</span>
                      <p className="font-semibold text-dark">
                        {new Date(selectedNotification.orderDetails.date || selectedNotification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">ស្ថានភាព:</span>
                      <p className={`font-semibold ${formatStatus(selectedNotification.status).className}`}>
                        {formatStatus(selectedNotification.status).text}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">គុណភាព:</span>
                      <p className="font-semibold text-dark">{selectedNotification.itemDetails.rating || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className="px-4 py-2 primary-green text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      បិទ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;