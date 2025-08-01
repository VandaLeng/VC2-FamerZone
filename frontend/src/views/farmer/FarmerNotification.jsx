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

  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_order',
      priority: 'high',
      title: 'បានទទួលការបញ្ជាទិញថ្មី',
      message: 'ការបញ្ជាទិញថ្មី៖ បានបញ្ជាទិញប៉េងប៉ោះស្រស់ 5 គ្រាប់! ពិនិត្យមើលសេចក្តីលម្អិតការបញ្ជាទិញ។',
      productName: 'ប៉េងប៉ោះស្រស់',
      quantity: 5,
      orderId: 'ORD001',
      customerName: 'Sophea Chan',
      timestamp: '2025-01-28T10:30:00Z',
      isRead: false,
      actions: ['view_order'],
      messageIcon: 'shopping_cart'
    },
    {
      id: 2,
      type: 'order_update',
      priority: 'medium',
      title: 'ស្ថានភាពការបញ្ជាទិញត្រូវបានធ្វើបច្ចុប្បន្នភាព',
      message: 'ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ៖ ការបញ្ជាទិញលេខ #ORD002 សម្រាប់អង្ករធម្មជាតិកំពុងដំណើរការ។',
      productName: 'អង្ករធម្មជាតិ',
      orderId: 'ORD002',
      status: 'កំពុងដំណើរការ',
      timestamp: '2025-01-28T09:15:00Z',
      isRead: false,
      actions: ['view_order'],
      messageIcon: 'package'
    },
    {
      id: 3,
      type: 'new_order',
      priority: 'high',
      title: 'បានទទួលការបញ្ជាទិញថ្មី',
      message: 'ការបញ្ជាទិញថ្មី៖ បានបញ្ជាទិញបន្លែបៃតង 10 បាច់! ពិនិត្យមើលសេចក្តីលម្អិតការបញ្ជាទិញ។',
      productName: 'បន្លែបៃតង',
      quantity: 10,
      orderId: 'ORD003',
      customerName: 'David Kim',
      timestamp: '2025-01-28T08:45:00Z',
      isRead: true,
      actions: ['view_order'],
      messageIcon: 'shopping_cart'
    },
    {
      id: 4,
      type: 'order_update',
      priority: 'medium',
      title: 'ការបញ្ជាទិញត្រូវបានដឹកជញ្ជូន',
      message: 'ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ៖ ការបញ្ជាទិញលេខ #ORD001 សម្រាប់ប៉េងប៉ោះស្រស់ត្រូវបានដឹកជញ្ជូន។',
      productName: 'ប៉េងប៉ោះស្រស់',
      orderId: 'ORD001',
      status: 'បានដឹកជញ្ជូន',
      timestamp: '2025-01-27T16:20:00Z',
      isRead: true,
      actions: ['view_order', 'rate_customer'],
      messageIcon: 'truck'
    },
    {
      id: 5,
      type: 'payment',
      priority: 'high',
      title: 'បានទទួលការទូទាត់',
      message: 'បានទទួលការទូទាត់៖ ការទូទាត់ $45.00 សម្រាប់ការបញ្ជាទិញលេខ #ORD002 ត្រូវបានដំណើរការ។',
      orderId: 'ORD002',
      amount: 45.00,
      timestamp: '2025-01-27T14:10:00Z',
      isRead: false,
      actions: ['view_transaction'],
      messageIcon: 'credit_card'
    }
  ]);

  const getNotificationIcon = (type) => {
    const iconProps = { className: "w-6 h-6" };
    
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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filterType === 'all' || 
                         filterType === 'unread' ? !notif.isRead : 
                         notif.type === filterType;
    
    const matchesSearch = searchTerm === '' || 
                         notif.title.includes(searchTerm) ||
                         (notif.productName && notif.productName.includes(searchTerm)) ||
                         (notif.message && notif.message.includes(searchTerm));
    
    return matchesFilter && matchesSearch;
  });

  // Sort by priority and timestamp (unread first, then by time)
  const sortedNotifications = filteredNotifications.sort((a, b) => {
    if (a.isRead !== b.isRead) return a.isRead - b.isRead;
    if (a.priority !== b.priority) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
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
                <p className="text-xl opacity-90">ទទួលបានព័ត៌មានចុងក្រោយអំពីការបញ្ជាទិញ និងសកម្មភាពកសិដ្ឋានរបស់អ្នក</p>
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
                                {getTimeAgo(notification.timestamp)}
                              </span>
                            </div>
                          </div>

                          <p className="text-dark mb-4 leading-relaxed flex items-start">
                            {getMessageIcon(notification.messageIcon)}
                            <span>{notification.message}</span>
                          </p>

                          {/* Order Details */}
                          {(notification.type === 'new_order' || notification.type === 'order_update') && (
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                                {notification.quantity && (
                                  <div>
                                    <span className="font-medium text-gray-600">បរិមាណ:</span>
                                    <p className="font-semibold text-dark">{notification.quantity}</p>
                                  </div>
                                )}
                                {notification.status && (
                                  <div>
                                    <span className="font-medium text-gray-600">ស្ថានភាព:</span>
                                    <p className="font-semibold" style={{ color: '#8B4513' }}>
                                      {notification.status}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Payment Details */}
                          {notification.type === 'payment' && notification.amount && (
                            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">ចំនួនទឹកប្រាក់បានទទួល:</span>
                                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>
                                  ${notification.amount.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            {notification.actions.includes('view_order') && (
                              <button className="flex items-center space-x-2 px-4 py-2 primary-green text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Eye className="w-4 h-4" />
                                <span>មើលការបញ្ជាទិញ</span>
                              </button>
                            )}
                            {notification.actions.includes('view_transaction') && (
                              <button className="flex items-center space-x-2 px-4 py-2 accent-yellow text-black rounded-lg hover:opacity-90 transition-opacity">
                                <DollarSign className="w-4 h-4" />
                                <span>មើលប្រតិបត្តិការ</span>
                              </button>
                            )}
                            {notification.actions.includes('rate_customer') && (
                              <button className="flex items-center space-x-2 px-4 py-2 secondary-brown text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Star className="w-4 h-4" />
                                <span>វាយតម្លៃអតិថិជន</span>
                              </button>
                            )}
                            
                            {/* Mark as Read / Delete */}
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