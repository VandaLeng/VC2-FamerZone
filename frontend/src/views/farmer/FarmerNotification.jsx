import React, { useState } from 'react';
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
  Star,
  Truck,
  CreditCard,
  AlertCircle
} from 'lucide-react';

const NotificationsPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample notification data integrated with order_item and orders tables, including product name
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_order',
      priority: 'high',
      title: 'បានទទួលការបញ្ជាទិញថ្មី',
      message: 'ការបញ្ជាទិញថ្មីសម្រាប់លេខការបញ្ជាទិញ #1 ត្រូវបានទទួល។',
      orderId: '1',
      productId: '1',
      productName: 'iPhone 13 Mini', // Added product name
      quantity: 2,
      price: 10.00,
      createdAt: '2025-08-16 16:18:38',
      updatedAt: '2025-08-16 16:18:38',
      status: 'confirmed',
      isRead: false,
      actions: ['view_order'],
      messageIcon: 'shopping_cart'
    },
    {
      id: 2,
      type: 'order_update',
      priority: 'high',
      title: 'ការបញ្ជាទិញត្រូវបានធ្វើបច្ចុប្បន្នភាព',
      message: 'ការបញ្ជាទិញលេខ #2 ត្រូវបានធ្វើបច្ចុប្បន្នភាព។',
      orderId: '2',
      productId: '2',
      productName: 'Banana', // Added product name
      quantity: 5,
      price: 8.75,
      createdAt: '2025-08-16 16:18:38',
      updatedAt: '2025-08-16 16:18:38',
      status: 'delivered',
      isRead: false,
      actions: ['view_order'],
      messageIcon: 'package'
    },
    {
      id: 3,
      type: 'order_update',
      priority: 'medium',
      title: 'ការបញ្ជាទិញត្រូវបានធ្វើបច្ចុប្បន្នភាព',
      message: 'ការបញ្ជាទិញលេខ #3 ត្រូវបានធ្វើបច្ចុប្បន្នភាព។',
      orderId: '3',
      productId: '2',
      productName: 'Banana', // Added product name
      quantity: 4,
      price: 1.00,
      createdAt: '2025-08-16 16:18:38',
      updatedAt: '2025-08-16 16:18:38',
      status: 'cancelled',
      isRead: true,
      actions: ['view_order'],
      messageIcon: 'package'
    }
  ]);

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

  // Function to mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // Function to delete a notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filterType === 'all' || 
                         filterType === 'unread' ? !notif.isRead : 
                         notif.type === filterType;
    
    const matchesSearch = searchTerm === '' || 
                         notif.title.includes(searchTerm) ||
                         notif.message.includes(searchTerm) ||
                         notif.orderId.includes(searchTerm) ||
                         notif.productName.includes(searchTerm); // Added productName to search
    
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Custom Styles */}
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
      `}</style>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
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
          {/* Filters Sidebar */}
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

              {/* Search */}
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

              {/* Filter Options */}
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
                      filterType === key 
                        ? 'primary-green text-white' 
                        : 'hover:bg-gray-50 text-dark'
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

          {/* Notifications List */}
          <div className="lg:col-span-3">
            {sortedNotifications.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-custom text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-dark mb-2">រកមិនឃើញការជូនដំណឹង</h3>
                <p className="text-gray-600">
                  {filterType === 'all' 
                    ? 'អ្នកបានអានអស់ហើយ!' 
                    : 'គ្មានការជូនដំណឹងដែលត្រូវនឹងតម្រងបច្ចុប្បន្នរបស់អ្នកទេ។'}
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
                        {/* Notification Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                               style={{ backgroundColor: '#F5F5DC' }}>
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>

                        {/* Notification Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-dark">
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <div className="w-3 h-3 rounded-full unread-indicator"></div>
                              )}
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

                          {/* Order Details from order_item and orders tables */}
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">លេខការបញ្ជាទិញ:</span>
                                <p className="font-semibold" style={{ color: '#228B22' }}>
                                  #{notification.orderId}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">ផលិតផល:</span>
                                <p className="font-semibold text-dark">
                                  {notification.productName}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">បរិមាណ:</span>
                                <p className="font-semibold text-dark">{notification.quantity}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">តម្លៃ:</span>
                                <p className="font-semibold" style={{ color: '#8B4513' }}>
                                  ${notification.price}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">ស្ថានភាព:</span>
                                <p className={`font-semibold ${
                                  notification.status === 'confirmed' ? 'status-confirmed' :
                                  notification.status === 'delivered' ? 'status-delivered' :
                                  notification.status === 'cancelled' ? 'status-cancelled' : ''
                                }`}>
                                  {notification.status === 'confirmed' ? 'បានបញ្ជាក់' :
                                   notification.status === 'delivered' ? 'បានដឹកជញ្ជូន' :
                                   notification.status === 'cancelled' ? 'បានលុប' : notification.status}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            {notification.actions.includes('view_order') && (
                              <button className="flex items-center space-x-2 px-4 py-2 primary-green text-white rounded-lg hover:opacity-90 transition-opacity">
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
      </div>
    </div>
  );
};

export default NotificationsPage;