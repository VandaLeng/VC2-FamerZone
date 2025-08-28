import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, ShoppingCart, DollarSign, Users, Bell, Calendar, Eye, ArrowUpRight, Star } from 'lucide-react';

const FarmerDashboard = () => {
  // Chart data states for daily and weekly orders
  const [dailyOrderChart, setDailyOrderChart] = useState([]);
  const [weeklyOrderChart, setWeeklyOrderChart] = useState([]);
  const [timeRange, setTimeRange] = useState('weekly');
  const [loading, setLoading] = useState(false);

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 0,
    monthlyEarnings: 1200.50,
    weeklyEarnings: 380.25,
    totalOrders: 0,
    pendingOrders: 8,
    completedOrders: 134,
    totalProducts: 24,
    activeProducts: 22,
    totalCustomers: 89,
    newCustomers: 12,
    ordersWithoutItems: 0
  });

  // ...existing code...

  useEffect(() => {
    // Fetch all orders and sum total_price for total earnings, count total orders, count orders with no order_items, and aggregate daily/weekly orders
    fetch("http://127.0.0.1:8000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        let totalEarnings = 0;
        let ordersWithoutItems = 0;
        let totalOrders = 0;
        // Aggregation objects
        const dailyCounts = {};
        const weeklyCounts = {};
        // Helper for week number
        function getWeekNumber(date) {
          const tempDate = new Date(date.getTime());
          tempDate.setHours(0, 0, 0, 0);
          tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
          const yearStart = new Date(tempDate.getFullYear(), 0, 1);
          const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
          return weekNo;
        }
        if (Array.isArray(data.data)) {
          totalOrders = data.data.length;
          data.data.forEach(order => {
            if (order.total_price) {
              totalEarnings += parseFloat(order.total_price) || 0;
            }
            // Count orders with no order_items (empty array or undefined)
            if (!order.items || (Array.isArray(order.items) && order.items.length === 0)) {
              ordersWithoutItems++;
            }
            // Aggregate by date field (not created_at)
            if (order.date) {
              // Use only date part (YYYY-MM-DD)
              const dayKey = order.date.split(' ')[0];
              dailyCounts[dayKey] = (dailyCounts[dayKey] || 0) + 1;
              // Aggregate by week using date field
              const dateObj = new Date(order.date);
              const weekYear = dateObj.getFullYear();
              const weekNum = getWeekNumber(dateObj);
              const weekKey = `${weekYear}-W${weekNum}`;
              weeklyCounts[weekKey] = (weeklyCounts[weekKey] || 0) + 1;
            }
          });
        }
        // Prepare chart data arrays
        const dailyOrderChart = Object.entries(dailyCounts).map(([date, count]) => ({ name: date, orders: count }));
        const weeklyOrderChart = Object.entries(weeklyCounts).map(([week, count]) => ({ name: week, orders: count }));
        setDailyOrderChart(dailyOrderChart);
        setWeeklyOrderChart(weeklyOrderChart);
        setDashboardData(prev => ({
          ...prev,
          totalEarnings: totalEarnings,
          totalOrders: totalOrders,
          ordersWithoutItems: ordersWithoutItems
        }));
      });
  }, []);
  const salesData = {
    weekly: [
      { name: 'ច័ន្ទ', sales: 120, orders: 5 },
      { name: 'អង្គារ', sales: 190, orders: 8 },
      { name: 'ពុធ', sales: 250, orders: 12 },
      { name: 'ព្រហស្បតិ៍', sales: 180, orders: 7 },
      { name: 'សុក្រ', sales: 300, orders: 15 },
      { name: 'សៅរ៍', sales: 420, orders: 18 },
      { name: 'អាទិត្យ', sales: 350, orders: 14 }
    ],
    monthly: [
      { name: 'សប្តាហ៍ ១', sales: 850, orders: 35 },
      { name: 'សប្តាហ៍ ២', sales: 1200, orders: 48 },
      { name: 'សប្តាហ៍ ៣', sales: 950, orders: 38 },
      { name: 'សប្តាហ៍ ៤', sales: 1100, orders: 42 }
    ]
  };

  const topProducts = [
    { name: 'ប៉េងប៉ោះធម្មជាតិ', sales: 45, revenue: 450, color: '#22c55e' },
    { name: 'សាឡាត់ស្រស់', sales: 38, revenue: 380, color: '#16a34a' },
    { name: 'ម្ទេសប្លោក', sales: 32, revenue: 640, color: '#15803d' },
    { name: 'ការ៉ុត', sales: 28, revenue: 280, color: '#166534' }
  ];

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          // Count unique users who placed orders
          const userIds = new Set();
          data.data.forEach(order => {
            if (order.user_id) userIds.add(order.user_id);
          });

          // Map API data to table format
          const orders = data.data.map(order => ({
            id: `#ORD-${order.id.toString().padStart(3, '0')}`,
            customer: order.user?.name || order.customer_name || `User ${order.user_id}`,
            product: Array.isArray(order.items) && order.items.length > 0
              ? order.items.map(item => item.name).join(', ')
              : order.product_name || '-',
            quantity: order.quantity || '-',
            total: order.total_price ? parseFloat(order.total_price) : 0,
            status: order.status,
            date: order.date
          }));
          setRecentOrders(orders);
          setDashboardData(prev => ({
            ...prev,
            totalCustomers: userIds.size
          }));
        }
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'text-green-600', bgGradient = 'from-green-500 to-emerald-500' }) => (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${bgGradient} opacity-5 rounded-full -translate-y-4 translate-x-4 group-hover:opacity-10 transition-opacity`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${bgGradient} shadow-md`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          {trend && (
            <div className="flex items-center text-xs sm:text-sm text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />
              +{trend}%
            </div>
          )}
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-0.5 font-medium">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight">ផ្ទាំងគ្រប់គ្រង</h1>
              <p className="text-sm sm:text-base text-gray-600">ស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងរបស់អ្នក</p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-sm border border-gray-100">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {new Date().toLocaleDateString('km-KH')}
                </span>
              </div>
              <div className="relative">
                <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">ស្ថិតិរហ័ស</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              icon={DollarSign}
              title="ចំណូលសរុប"
              value={`$${dashboardData.totalEarnings.toLocaleString()}`}
              subtitle={`សរុបតម្លៃការបញ្ជាទិញទាំងអស់`}
              trend={12.5}
              color="text-green-600"
              bgGradient="from-green-500 to-emerald-500"
            />
            <StatCard
              icon={ShoppingCart}
              title="ការបញ្ជាទិញសរុប"
              value={dashboardData.totalOrders}
              subtitle={`ចំនួនការបញ្ជាទិញសរុប: ${dashboardData.totalOrders}`}
              trend={8.2}
              color="text-blue-600"
              bgGradient="from-blue-500 to-cyan-500"
            />
            <StatCard
              icon={Package}
              title="ផលិតផលសរុប"
              value={dashboardData.totalProducts}
              subtitle={`ផលិតផលដែលមាន: ${dashboardData.activeProducts}`}
              trend={5.1}
              color="text-purple-600"
              bgGradient="from-purple-500 to-indigo-500"
            />
            <StatCard
              icon={Users}
              title="អតិថិជនសរុប"
              value={dashboardData.totalCustomers}
              subtitle={`អតិថិជនថ្មី: ${dashboardData.newCustomers}`}
              trend={15.3}
              color="text-orange-600"
              bgGradient="from-orange-500 to-red-500"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Sales Overview Chart (Order Tracking) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-0" style={{ fontFamily: 'Kantumruy, Khmer OS, Arial, sans-serif' }}>ទិដ្ឋភាពលក់ដូរ</h3>
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 text-sm rounded-lg font-bold transition-all ${timeRange === 'weekly'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  style={{ fontFamily: 'Kantumruy, Khmer OS, Arial, sans-serif' }}
                >
                  ប្រចាំសប្តាហ៍
                </button>
                <button
                  onClick={() => setTimeRange('daily')}
                  className={`px-4 py-2 text-sm rounded-lg font-bold transition-all ${timeRange === 'daily'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  style={{ fontFamily: 'Kantumruy, Khmer OS, Arial, sans-serif' }}
                >
                  ប្រចាំថ្ងៃ
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280} className="min-w-[200px]">
              <BarChart
                data={timeRange === 'weekly' ? weeklyOrderChart : dailyOrderChart}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                barCategoryGap="30%"
                barGap={5}
              >
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 14, fill: '#374151', fontFamily: 'Kantumruy, Khmer OS, Arial, sans-serif' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'Kantumruy, Khmer OS, Arial, sans-serif' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                  gridLine={{ stroke: '#e2e8f0', strokeDasharray: '3 3' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    fontFamily: 'Kantumruy, Khmer OS, Arial, sans-serif'
                  }}
                  formatter={(value) => [`${value} ការបញ្ជាទិញ`, 'orders']}
                />
                <Bar
                  dataKey="orders"
                  fill="url(#colorGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">ផលិតផលល្អបំផុត</h3>
            <div className="space-y-3 sm:space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="group flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-modern-green transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: product.color }}
                      ></div>
                      <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-green-800 transition-colors">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} ការលក់</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-base sm:text-lg">${product.revenue}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 fill-current text-amber-400" />
                      4.8
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-0">ការបញ្ជាទិញថ្មីៗ</h3>
          </div>
          <div className="overflow-x-auto touch-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">លេខរៀងការបញ្ជាទិញ</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">អតិថិជន</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">សរុប</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">ស្ថានភាព</th>
                  <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-700">កាលបរិច្ឆេទ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-modern-green transition-colors">
                    <td className="p-3 sm:p-4">
                      <span className="font-mono text-xs sm:text-sm text-green-600 font-semibold">{order.id}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-[10px] sm:text-xs font-bold text-white">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-900 font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-green-600">${order.total.toFixed(2)}</td>
                    <td className="p-3 sm:p-4">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status === 'pending' ? 'កំពុងរង់ចាំ' : 
                         order.status === 'confirmed' ? 'បានបញ្ជាក់' : 
                         order.status === 'delivered' ? 'បានដឹកជញ្ជូន' : order.status}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('km-KH')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom CSS for modern colors and mobile enhancements */}
      <style jsx>{`
        .bg-modern-green { 
          background-color: #DCFCE7; 
        }
        .hover\\:bg-modern-green:hover { 
          background-color: #DCFCE7; 
        }
        /* Ensure touch scrolling is smooth */
        .touch-auto {
          -webkit-overflow-scrolling: touch;
        }
        /* Prevent text from being too small on mobile */
        @media (max-width: 640px) {
          .min-w-[640px] {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FarmerDashboard;