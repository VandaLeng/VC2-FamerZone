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
  Globe,
  Clock,
  AlertCircle,
  Truck,
  DollarSign,
  Star
} from 'lucide-react';

const NotificationsPage = () => {
  const [language, setLanguage] = useState('en');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_order',
      priority: 'high',
      title: 'New Order Received',
      titleKh: 'បានទទួលការបញ្ជាទិញថ្មី',
      message: '🛒 New Order: 5 units of Fresh Tomatoes ordered! Check order details.',
      messageKh: '🛒 ការបញ្ជាទិញថ្មី៖ បានបញ្ជាទិញប៉េងប៉ោះស្រស់ 5 គ្រាប់! ពិនិត្យមើលសេចក្តីលម្អិតការបញ្ជាទិញ។',
      productName: 'Fresh Tomatoes',
      productNameKh: 'ប៉េងប៉ោះស្រស់',
      quantity: 5,
      orderId: 'ORD001',
      customerName: 'Sophea Chan',
      timestamp: '2025-01-28T10:30:00Z',
      isRead: false,
      actions: ['view_order']
    },
    {
      id: 2,
      type: 'order_update',
      priority: 'medium',
      title: 'Order Status Updated',
      titleKh: 'ស្ថានភាពការបញ្ជាទិញត្រូវបានធ្វើបច្ចុប្បន្នភាព',
      message: '📦 Order Update: Order #ORD002 for Organic Rice is now Processing.',
      messageKh: '📦 ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ៖ ការបញ្ជាទិញលេខ #ORD002 សម្រាប់អង្ករធម្មជាតិកំពុងដំណើរការ។',
      productName: 'Organic Rice',
      productNameKh: 'អង្ករធម្មជាតិ',
      orderId: 'ORD002',
      status: 'Processing',
      statusKh: 'កំពុងដំណើរការ',
      timestamp: '2025-01-28T09:15:00Z',
      isRead: false,
      actions: ['view_order']
    },
    {
      id: 3,
      type: 'new_order',
      priority: 'high',
      title: 'New Order Received',
      titleKh: 'បានទទួលការបញ្ជាទិញថ្មី',
      message: '🛒 New Order: 10 units of Green Vegetables ordered! Check order details.',
      messageKh: '🛒 ការបញ្ជាទិញថ្មី៖ បានបញ្ជាទិញបន្លែបៃតង 10 បាច់! ពិនិត្យមើលសេចក្តីលម្អិតការបញ្ជាទិញ។',
      productName: 'Green Vegetables',
      productNameKh: 'បន្លែបៃតង',
      quantity: 10,
      orderId: 'ORD003',
      customerName: 'David Kim',
      timestamp: '2025-01-28T08:45:00Z',
      isRead: true,
      actions: ['view_order']
    },
    {
      id: 4,
      type: 'order_update',
      priority: 'medium',
      title: 'Order Delivered',
      titleKh: 'ការបញ្ជាទិញត្រូវបានដឹកជញ្ជូន',
      message: '🚚 Order Update: Order #ORD001 for Fresh Tomatoes has been Delivered.',
      messageKh: '🚚 ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ៖ ការបញ្ជាទិញលេខ #ORD001 សម្រាប់ប៉េងប៉ោះស្រស់ត្រូវបានដឹកជញ្ជូន។',
      productName: 'Fresh Tomatoes',
      productNameKh: 'ប៉េងប៉ោះស្រស់',
      orderId: 'ORD001',
      status: 'Delivered',
      statusKh: 'បានដឹកជញ្ជូន',
      timestamp: '2025-01-27T16:20:00Z',
      isRead: true,
      actions: ['view_order', 'rate_customer']
    },
    {
      id: 5,
      type: 'payment',
      priority: 'high',
      title: 'Payment Received',
      titleKh: 'បានទទួលការទូទាត់',
      message: '💰 Payment Received: $45.00 for Order #ORD002 has been processed.',
      messageKh: '💰 បានទទួលការទូទាត់៖ ការទូទាត់ $45.00 សម្រាប់ការបញ្ជាទិញលេខ #ORD002 ត្រូវបានដំណើរការ។',
      orderId: 'ORD002',
      amount: 45.00,
      timestamp: '2025-01-27T14:10:00Z',
      isRead: false,
      actions: ['view_transaction']
    }
  ]);

  const content = {
    en: {
      title: "Notifications",
      subtitle: "Stay updated with your farm orders and activities",
      markAllRead: "Mark All as Read",
      filter: "Filter",
      search: "Search notifications...",
      viewOrder: "View Order",
      viewTransaction: "View Transaction",
      rateCustomer: "Rate Customer",
      markAsRead: "Mark as Read",
      delete: "Delete",
      noNotifications: "No notifications found",
      filters: {
        all: "All",
        new_order: "New Orders",
        order_update: "Order Updates",
        payment: "Payments",
        unread: "Unread"
      },
      timeAgo: {
        now: "Just now",
        minute: "minute ago",
        minutes: "minutes ago",
        hour: "hour ago",
        hours: "hours ago",
        day: "day ago",
        days: "days ago"
      },
      orderStatuses: {
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled"
      }
    },
    kh: {
      title: "ការជូនដំណឹង",
      subtitle: "ទទួលបានព័ត៌មានចុងក្រោយអំពីការបញ្ជាទិញ និងសកម្មភាពកសិដ្ឋានរបស់អ្នក",
      markAllRead: "សម្គាល់ទាំងអស់ថាបានអាន",
      filter: "តម្រង",
      search: "ស្វែងរកការជូនដំណឹង...",
      viewOrder: "មើលការបញ្ជាទិញ",
      viewTransaction: "មើលប្រតិបត្តិការ",
      rateCustomer: "វាយតម្លៃអតិថិជន",
      markAsRead: "សម្គាល់ថាបានអាន",
      delete: "លុប",
      noNotifications: "រកមិនឃើញការជូនដំណឹង",
      filters: {
        all: "ទាំងអស់",
        new_order: "ការបញ្ជាទិញថ្មី",
        order_update: "ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ",
        payment: "ការទូទាត់",
        unread: "មិនទាន់អាន"
      },
      timeAgo: {
        now: "ភ្លាមៗនេះ",
        minute: "នាទីមុន",
        minutes: "នាទីមុន",
        hour: "ម៉ោងមុន",
        hours: "ម៉ោងមុន",
        day: "ថ្ងៃមុន",
        days: "ថ្ងៃមុន"
      },
      orderStatuses: {
        pending: "កំពុងរង់ចាំ",
        processing: "កំពុងដំណើរការ",
        shipped: "បានដឹកជញ្ជូន",
        delivered: "បានដល់",
        cancelled: "បានបោះបង់"
      }
    }
  };

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

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    const t = content[language];
    
    if (diffInMinutes < 1) return t.timeAgo.now;
    if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? t.timeAgo.minute : t.timeAgo.minutes}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? t.timeAgo.hour : t.timeAgo.hours}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? t.timeAgo.day : t.timeAgo.days}`;
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
                         notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.titleKh.includes(searchTerm) ||
                         (notif.productName && notif.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (notif.productNameKh && notif.productNameKh.includes(searchTerm));
    
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
  const t = content[language];

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
                <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
                <p className="text-xl opacity-90">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'kh' : 'en')}
                className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'en' ? 'ខ្មែរ' : 'English'}</span>
              </button>
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
                  {t.filter}
                </h3>
                <button
                  onClick={markAllAsRead}
                  className="text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ color: '#8B4513' }}
                  disabled={unreadCount === 0}
                >
                  {t.markAllRead}
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Filter Options */}
              <div className="space-y-2">
                {Object.entries(t.filters).map(([key, label]) => (
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
                <h3 className="text-xl font-semibold text-dark mb-2">{t.noNotifications}</h3>
                <p className="text-gray-600">
                  {filterType === 'all' ? 
                    (language === 'en' ? 'You\'re all caught up!' : 'អ្នកបានអានអស់ហើយ!') :
                    (language === 'en' ? 'No notifications match your current filter.' : 'គ្មានការជូនដំណឹងដែលត្រូវនឹងតម្រងបច្ចុប្បន្នរបស់អ្នកទេ។')
                  }
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
                              {language === 'en' ? notification.title : notification.titleKh}
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

                          <p className="text-dark mb-4 leading-relaxed">
                            {language === 'en' ? notification.message : notification.messageKh}
                          </p>

                          {/* Order Details */}
                          {(notification.type === 'new_order' || notification.type === 'order_update') && (
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-600">
                                    {language === 'en' ? 'Order ID:' : 'លេខការបញ្ជាទិញ:'}
                                  </span>
                                  <p className="font-semibold" style={{ color: '#228B22' }}>
                                    #{notification.orderId}
                                  </p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">
                                    {language === 'en' ? 'Product:' : 'ផលិតផល:'}
                                  </span>
                                  <p className="font-semibold text-dark">
                                    {language === 'en' ? notification.productName : notification.productNameKh}
                                  </p>
                                </div>
                                {notification.quantity && (
                                  <div>
                                    <span className="font-medium text-gray-600">
                                      {language === 'en' ? 'Quantity:' : 'បរិមាណ:'}
                                    </span>
                                    <p className="font-semibold text-dark">{notification.quantity}</p>
                                  </div>
                                )}
                                {notification.status && (
                                  <div>
                                    <span className="font-medium text-gray-600">
                                      {language === 'en' ? 'Status:' : 'ស្ថានភាព:'}
                                    </span>
                                    <p className="font-semibold" style={{ color: '#8B4513' }}>
                                      {language === 'en' ? notification.status : notification.statusKh}
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
                                <span className="font-medium text-gray-600">
                                  {language === 'en' ? 'Amount Received:' : 'ចំនួនទឹកប្រាក់បានទទួល:'}
                                </span>
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
                                <span>{t.viewOrder}</span>
                              </button>
                            )}
                            {notification.actions.includes('view_transaction') && (
                              <button className="flex items-center space-x-2 px-4 py-2 accent-yellow text-black rounded-lg hover:opacity-90 transition-opacity">
                                <DollarSign className="w-4 h-4" />
                                <span>{t.viewTransaction}</span>
                              </button>
                            )}
                            {notification.actions.includes('rate_customer') && (
                              <button className="flex items-center space-x-2 px-4 py-2 secondary-brown text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Star className="w-4 h-4" />
                                <span>{t.rateCustomer}</span>
                              </button>
                            )}
                            
                            {/* Mark as Read / Delete */}
                            <div className="ml-auto flex items-center space-x-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                                  title={t.markAsRead}
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                title={t.delete}
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