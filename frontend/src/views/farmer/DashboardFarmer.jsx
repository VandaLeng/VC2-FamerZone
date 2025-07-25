import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, ShoppingCart, DollarSign, Users, Bell, Calendar, MapPin, Star, Eye } from 'lucide-react';

const FarmerDashboard = ({ currentLanguage = 'en' }) => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 2850.75,
    monthlyEarnings: 1200.50,
    weeklyEarnings: 380.25,
    totalOrders: 142,
    pendingOrders: 8,
    completedOrders: 134,
    totalProducts: 24,
    activeProducts: 22,
    totalCustomers: 89,
    newCustomers: 12
  });

  const salesData = {
    weekly: [
      { name: 'Mon', sales: 120, orders: 5 },
      { name: 'Tue', sales: 190, orders: 8 },
      { name: 'Wed', sales: 250, orders: 12 },
      { name: 'Thu', sales: 180, orders: 7 },
      { name: 'Fri', sales: 300, orders: 15 },
      { name: 'Sat', sales: 420, orders: 18 },
      { name: 'Sun', sales: 350, orders: 14 }
    ],
    monthly: [
      { name: 'Week 1', sales: 850, orders: 35 },
      { name: 'Week 2', sales: 1200, orders: 48 },
      { name: 'Week 3', sales: 950, orders: 38 },
      { name: 'Week 4', sales: 1100, orders: 42 }
    ]
  };

  const topProducts = [
    { name: 'Organic Tomatoes', sales: 45, revenue: 450, color: '#228B22' },
    { name: 'Fresh Lettuce', sales: 38, revenue: 380, color: '#8B4513' },
    { name: 'Bell Peppers', sales: 32, revenue: 640, color: '#FFD700' },
    { name: 'Carrots', sales: 28, revenue: 280, color: '#2D5016' }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Organic Tomatoes', quantity: 5, total: 25.00, status: 'pending', date: '2025-01-20' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Fresh Lettuce', quantity: 3, total: 15.00, status: 'confirmed', date: '2025-01-20' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Bell Peppers', quantity: 8, total: 40.00, status: 'delivered', date: '2025-01-19' },
    { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Carrots', quantity: 10, total: 20.00, status: 'confirmed', date: '2025-01-19' },
    { id: '#ORD-005', customer: 'David Brown', product: 'Organic Tomatoes', quantity: 12, total: 60.00, status: 'pending', date: '2025-01-18' }
  ];

  const texts = {
    kh: {
      dashboard: 'ផ្ទាំងគ្រប់គ្រង',
      totalEarnings: 'ចំណូលសរុប',
      monthlyEarnings: 'ចំណូលប្រចាំខែ',
      weeklyEarnings: 'ចំណូលប្រចាំសប្តាហ៍',
      totalOrders: 'ការបញ្ជាទិញសរុប',
      pendingOrders: 'ការបញ្ជាទិញកំពុងរង់ចាំ',
      completedOrders: 'ការបញ្ជាទិញបានបញ្ចប់',
      totalProducts: 'ផលិតផលសរុប',
      activeProducts: 'ផលិតផលដែលមាន',
      totalCustomers: 'អតិថិជនសរុប',
      newCustomers: 'អតិថិជនថ្មី',
      salesOverview: 'ទិដ្ឋភាពលក់ដូរ',
      weekly: 'ប្រចាំសប្តាហ៍',
      monthly: 'ប្រចាំខែ',
      recentOrders: 'ការបញ្ជាទិញថ្មីៗ',
      topProducts: 'ផលិតផលល្អបំផុត',
      orderId: 'លេខរៀងការបញ្ជាទិញ',
      customer: 'អតិថិជន',
      product: 'ផលិតផល',
      quantity: 'បរិមាណ',
      total: 'សរុប',
      status: 'ស្ថានភាព',
      date: 'កាលបរិច្ឆេទ',
      pending: 'កំពុងរង់ចាំ',
      confirmed: 'បានបញ្ជាក់',
      delivered: 'បានដឹកជញ្ជូន',
      viewAll: 'មើលទាំងអស់',
      sales: 'ការលក់',
      revenue: 'ចំណូល',
      orders: 'ការបញ្ជាទិញ',
      performance: 'ការអនុវត្ត',
      quickStats: 'ស្ថិតិរហ័ស'
    },
    en: {
      dashboard: 'Dashboard',
      totalEarnings: 'Total Earnings',
      monthlyEarnings: 'Monthly Earnings',
      weeklyEarnings: 'Weekly Earnings',
      totalOrders: 'Total Orders',
      pendingOrders: 'Pending Orders',
      completedOrders: 'Completed Orders',
      totalProducts: 'Total Products',
      activeProducts: 'Active Products',
      totalCustomers: 'Total Customers',
      newCustomers: 'New Customers',
      salesOverview: 'Sales Overview',
      weekly: 'Weekly',
      monthly: 'Monthly',
      recentOrders: 'Recent Orders',
      topProducts: 'Top Products',
      orderId: 'Order ID',
      customer: 'Customer',
      product: 'Product',
      quantity: 'Quantity',
      total: 'Total',
      status: 'Status',
      date: 'Date',
      pending: 'Pending',
      confirmed: 'Confirmed',
      delivered: 'Delivered',
      viewAll: 'View All',
      sales: 'Sales',
      revenue: 'Revenue',
      orders: 'Orders',
      performance: 'Performance',
      quickStats: 'Quick Stats'
    }
  };

  const currentTexts = texts[currentLanguage];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'text-forest-green' }) => (
    <div className="bg-cream rounded-xl shadow-lg p-6 border border-warm-brown/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full bg-white shadow-md ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-charcoal/70 mb-1">{title}</p>
        <p className="text-2xl font-bold text-charcoal mb-1">{value}</p>
        {subtitle && <p className="text-xs text-charcoal/60">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                {currentTexts.dashboard}
              </h1>
              <p className="text-charcoal/70">
                {currentLanguage === 'kh' ? 'ស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងរបស់អ្នក' : 'Welcome to your farmer dashboard'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
                <Calendar className="w-4 h-4 text-forest-green" />
                <span className="text-sm text-charcoal">
                  {new Date().toLocaleDateString(currentLanguage === 'kh' ? 'km-KH' : 'en-US')}
                </span>
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-forest-green cursor-pointer hover:text-warm-brown transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-golden-yellow rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-charcoal mb-4">{currentTexts.quickStats}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={DollarSign}
              title={currentTexts.totalEarnings}
              value={`$${dashboardData.totalEarnings.toLocaleString()}`}
              subtitle={currentTexts.monthlyEarnings + `: $${dashboardData.monthlyEarnings}`}
              trend={12.5}
              color="text-forest-green"
            />
            <StatCard
              icon={ShoppingCart}
              title={currentTexts.totalOrders}
              value={dashboardData.totalOrders}
              subtitle={currentTexts.pendingOrders + `: ${dashboardData.pendingOrders}`}
              trend={8.2}
              color="text-warm-brown"
            />
            <StatCard
              icon={Package}
              title={currentTexts.totalProducts}
              value={dashboardData.totalProducts}
              subtitle={currentTexts.activeProducts + `: ${dashboardData.activeProducts}`}
              trend={5.1}
              color="text-golden-yellow"
            />
            <StatCard
              icon={Users}
              title={currentTexts.totalCustomers}
              value={dashboardData.totalCustomers}
              subtitle={currentTexts.newCustomers + `: ${dashboardData.newCustomers}`}
              trend={15.3}
              color="text-forest-green"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Overview Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-warm-brown/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-charcoal">{currentTexts.salesOverview}</h3>
              <div className="flex bg-cream rounded-lg p-1">
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 text-sm rounded-md transition-all ${
                    timeRange === 'weekly'
                      ? 'bg-forest-green text-white shadow-md'
                      : 'text-charcoal hover:bg-white'
                  }`}
                >
                  {currentTexts.weekly}
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 text-sm rounded-md transition-all ${
                    timeRange === 'monthly'
                      ? 'bg-forest-green text-white shadow-md'
                      : 'text-charcoal hover:bg-white'
                  }`}
                >
                  {currentTexts.monthly}
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData[timeRange]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FAF0E6',
                    border: '1px solid #8B4513',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="#228B22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-warm-brown/10">
            <h3 className="text-lg font-semibold text-charcoal mb-6">{currentTexts.topProducts}</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-cream rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: product.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-charcoal">{product.name}</p>
                      <p className="text-sm text-charcoal/60">{product.sales} {currentTexts.sales.toLowerCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-forest-green">${product.revenue}</p>
                    <div className="flex items-center text-sm text-charcoal/60">
                      <Star className="w-3 h-3 mr-1 fill-current text-golden-yellow" />
                      4.8
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-lg border border-warm-brown/10">
          <div className="flex items-center justify-between p-6 border-b border-cream">
            <h3 className="text-lg font-semibold text-charcoal">{currentTexts.recentOrders}</h3>
            <button className="text-forest-green hover:text-warm-brown font-medium text-sm transition-colors flex items-center">
              {currentTexts.viewAll}
              <Eye className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/50">
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.orderId}</th>
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.customer}</th>
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.product}</th>
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.quantity}</th>
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.total}</th>
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.status}</th>
                  <th className="text-left p-4 text-sm font-semibold text-charcoal">{currentTexts.date}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-cream/50 hover:bg-cream/30 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm text-forest-green font-medium">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-forest-green/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-forest-green">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-charcoal">{order.customer}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-charcoal">{order.product}</td>
                    <td className="p-4 text-sm text-charcoal">{order.quantity}</td>
                    <td className="p-4 text-sm font-semibold text-forest-green">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {currentTexts[order.status]}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-charcoal/70">
                      {new Date(order.date).toLocaleDateString(currentLanguage === 'kh' ? 'km-KH' : 'en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom CSS for colors */}
      <style jsx>{`
        .text-forest-green { color: #228B22; }
        .text-warm-brown { color: #8B4513; }
        .text-golden-yellow { color: #FFD700; }
        .text-charcoal { color: #333333; }
        .bg-cream { background-color: #FAF0E6; }
        .bg-forest-green { background-color: #228B22; }
        .bg-warm-brown { background-color: #8B4513; }
        .bg-golden-yellow { background-color: #FFD700; }
        .border-warm-brown { border-color: #8B4513; }
        .border-cream { border-color: #FAF0E6; }
        .hover\\:text-warm-brown:hover { color: #8B4513; }
        .hover\\:bg-cream\\/30:hover { background-color: rgba(250, 240, 230, 0.3); }
        .bg-cream\\/50 { background-color: rgba(250, 240, 230, 0.5); }
        .border-cream\\/50 { border-color: rgba(250, 240, 230, 0.5); }
      `}</style>
    </div>
  );
};

export default FarmerDashboard;