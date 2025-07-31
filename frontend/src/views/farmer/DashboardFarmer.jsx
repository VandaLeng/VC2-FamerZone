import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, ShoppingCart, DollarSign, Users, Bell, Calendar, Eye, ArrowUpRight, Star } from 'lucide-react';

const FarmerDashboard = () => {
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

  const recentOrders = [
    { id: '#ORD-001', customer: 'សុភា ចាន់', product: 'ប៉េងប៉ោះធម្មជាតិ', quantity: 5, total: 25.00, status: 'pending', date: '2025-01-20' },
    { id: '#ORD-002', customer: 'សរិទ្ធ សុខ', product: 'សាឡាត់ស្រស់', quantity: 3, total: 15.00, status: 'confirmed', date: '2025-01-20' },
    { id: '#ORD-003', customer: 'វិចិត្រ គឹម', product: 'ម្ទេសប្លោក', quantity: 8, total: 40.00, status: 'delivered', date: '2025-01-19' },
    { id: '#ORD-004', customer: 'សុវណ្ណ លី', product: 'ការ៉ុត', quantity: 10, total: 20.00, status: 'confirmed', date: '2025-01-19' },
    { id: '#ORD-005', customer: 'សុជាតិ សេង', product: 'ប៉េងប៉ោះធម្មជាតិ', quantity: 12, total: 60.00, status: 'pending', date: '2025-01-18' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'text-green-600', bgGradient = 'from-green-500 to-emerald-500' }) => (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${bgGradient} opacity-5 rounded-full -translate-y-4 translate-x-4 group-hover:opacity-10 transition-opacity`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${bgGradient} shadow-md`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          {trend && (
            <div className="flex items-center text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
              +{trend}%
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-0.5 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">ផ្ទាំងគ្រប់គ្រង</h1>
              <p className="text-gray-600 text-lg">ស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងរបស់អ្នក</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700 font-medium">
                  {new Date().toLocaleDateString('km-KH')}
                </span>
              </div>
              <div className="relative">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">ស្ថិតិរហ័ស</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={DollarSign}
              title="ចំណូលសរុប"
              value={`$${dashboardData.totalEarnings.toLocaleString()}`}
              subtitle={`ចំណូលប្រចាំខែ: $${dashboardData.monthlyEarnings}`}
              trend={12.5}
              color="text-green-600"
              bgGradient="from-green-500 to-emerald-500"
            />
            <StatCard
              icon={ShoppingCart}
              title="ការបញ្ជាទិញសរុប"
              value={dashboardData.totalOrders}
              subtitle={`ការបញ្ជាទិញកំពុងរង់ចាំ: ${dashboardData.pendingOrders}`}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Overview Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">ទិដ្ឋភាពលក់ដូរ</h3>
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${timeRange === 'weekly'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
                >
                  ប្រចាំសប្តាហ៍
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${timeRange === 'monthly'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
                >
                  ប្រចាំខែ
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={salesData[timeRange]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px'
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#colorGradient)"
                  radius={[6, 6, 0, 0]}
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">ផលិតផលល្អបំផុត</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-modern-green transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: product.color }}
                      ></div>
                      <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-green-800 transition-colors">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} ការលក់</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-lg">${product.revenue}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-3 h-3 mr-1 fill-current text-amber-400" />
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
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">ការបញ្ជាទិញថ្មីៗ</h3>
            <button className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors flex items-center bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100">
              មើលទាំងអស់
              <Eye className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">លេខរៀងការបញ្ជាទិញ</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">អតិថិជន</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">ផលិតផល</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">បរិមាណ</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">សរុប</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">ស្ថានភាព</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">កាលបរិច្ឆេទ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-modern-green transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm text-green-600 font-semibold">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-white">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900 font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{order.product}</td>
                    <td className="p-4 text-sm text-gray-700 font-medium">{order.quantity}</td>
                    <td className="p-4 text-sm font-bold text-green-600">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status === 'pending' ? 'កំពុងរង់ចាំ' : 
                         order.status === 'confirmed' ? 'បានបញ្ជាក់' : 
                         order.status === 'delivered' ? 'បានដឹកជញ្ជូន' : order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date().toLocaleDateString('km-KH')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom CSS for modern colors */}
      <style jsx>{`
        .bg-modern-green { 
          background-color: #DCFCE7; 
        }
        .hover\\:bg-modern-green:hover { 
          background-color: #DCFCE7; 
        }
      `}</style>
    </div>
  );
};

export default FarmerDashboard;