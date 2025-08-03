"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Package, ShoppingCart, DollarSign, Users, Bell, Calendar, Eye, ArrowUpRight, Star } from "lucide-react"

const FarmerDashboard = ({ currentLanguage = "en" }) => {
  const [timeRange, setTimeRange] = useState("weekly")
  const [loading, setLoading] = useState(false)

  // Language texts
  const texts = {
    kh: {
      dashboard: "ផ្ទាំងគ្រប់គ្រង",
      welcome: "ស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងរបស់អ្នក",
      quickStats: "ស្ថិតិរហ័ស",
      totalEarnings: "ចំណូលសរុប",
      monthlyEarnings: "ចំណូលប្រចាំខែ",
      totalOrders: "ការបញ្ជាទិញសរុប",
      pendingOrders: "ការបញ្ជាទិញកំពុងរង់ចាំ",
      totalProducts: "ផលិតផលសរុប",
      activeProducts: "ផលិតផលដែលមាន",
      totalCustomers: "អតិថិជនសរុប",
      newCustomers: "អតិថិជនថ្មី",
      salesOverview: "ទិដ្ឋភាពលក់ដូរ",
      weekly: "ប្រចាំសប្តាហ៍",
      monthly: "ប្រចាំខែ",
      topProducts: "ផលិតផលល្អបំផុត",
      sales: "ការលក់",
      recentOrders: "ការបញ្ជាទិញថ្មីៗ",
      viewAll: "មើលទាំងអស់",
      orderNumber: "លេខរៀងការបញ្ជាទិញ",
      customer: "អតិថិជន",
      product: "ផលិតផល",
      quantity: "បរិមាណ",
      total: "សរុប",
      status: "ស្ថានភាព",
      date: "កាលបរិច្ឆេទ",
      pending: "កំពុងរង់ចាំ",
      confirmed: "បានបញ្ជាក់",
      delivered: "បានដឹកជញ្ជូន",
      cancelled: "បានលុបចោល",
    },
    en: {
      dashboard: "Dashboard",
      welcome: "Welcome to your management dashboard",
      quickStats: "Quick Stats",
      totalEarnings: "Total Earnings",
      monthlyEarnings: "Monthly Earnings",
      totalOrders: "Total Orders",
      pendingOrders: "Pending Orders",
      totalProducts: "Total Products",
      activeProducts: "Active Products",
      totalCustomers: "Total Customers",
      newCustomers: "New Customers",
      salesOverview: "Sales Overview",
      weekly: "Weekly",
      monthly: "Monthly",
      topProducts: "Top Products",
      sales: "Sales",
      recentOrders: "Recent Orders",
      viewAll: "View All",
      orderNumber: "Order ID",
      customer: "Customer",
      product: "Product",
      quantity: "Quantity",
      total: "Total",
      status: "Status",
      date: "Date",
      pending: "Pending",
      confirmed: "Confirmed",
      delivered: "Delivered",
      cancelled: "Cancelled",
    },
  }

  const currentTexts = texts[currentLanguage]

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 2850.75,
    monthlyEarnings: 1200.5,
    weeklyEarnings: 380.25,
    totalOrders: 142,
    pendingOrders: 8,
    completedOrders: 134,
    totalProducts: 24,
    activeProducts: 22,
    totalCustomers: 89,
    newCustomers: 12,
  })

  const salesData = {
    weekly:
      currentLanguage === "kh"
        ? [
            { name: "ច័ន្ទ", sales: 120, orders: 5 },
            { name: "អង្គារ", sales: 190, orders: 8 },
            { name: "ពុធ", sales: 250, orders: 12 },
            { name: "ព្រហស្បតិ៍", sales: 180, orders: 7 },
            { name: "សុក្រ", sales: 300, orders: 15 },
            { name: "សៅរ៍", sales: 420, orders: 18 },
            { name: "អាទិត្យ", sales: 350, orders: 14 },
          ]
        : [
            { name: "Mon", sales: 120, orders: 5 },
            { name: "Tue", sales: 190, orders: 8 },
            { name: "Wed", sales: 250, orders: 12 },
            { name: "Thu", sales: 180, orders: 7 },
            { name: "Fri", sales: 300, orders: 15 },
            { name: "Sat", sales: 420, orders: 18 },
            { name: "Sun", sales: 350, orders: 14 },
          ],
    monthly:
      currentLanguage === "kh"
        ? [
            { name: "សប្តាហ៍ ១", sales: 850, orders: 35 },
            { name: "សប្តាហ៍ ២", sales: 1200, orders: 48 },
            { name: "សប្តាហ៍ ៣", sales: 950, orders: 38 },
            { name: "សប្តាហ៍ ៤", sales: 1100, orders: 42 },
          ]
        : [
            { name: "Week 1", sales: 850, orders: 35 },
            { name: "Week 2", sales: 1200, orders: 48 },
            { name: "Week 3", sales: 950, orders: 38 },
            { name: "Week 4", sales: 1100, orders: 42 },
          ],
  }

  const topProducts =
    currentLanguage === "kh"
      ? [
          { name: "ប៉េងប៉ោះធម្មជាតិ", sales: 45, revenue: 450, color: "#22c55e" },
          { name: "សាឡាត់ស្រស់", sales: 38, revenue: 380, color: "#16a34a" },
          { name: "ម្ទេសប្លោក", sales: 32, revenue: 640, color: "#15803d" },
          { name: "ការ៉ុត", sales: 28, revenue: 280, color: "#166534" },
        ]
      : [
          { name: "Organic Tomatoes", sales: 45, revenue: 450, color: "#22c55e" },
          { name: "Fresh Lettuce", sales: 38, revenue: 380, color: "#16a34a" },
          { name: "Bell Peppers", sales: 32, revenue: 640, color: "#15803d" },
          { name: "Carrots", sales: 28, revenue: 280, color: "#166534" },
        ]

  const recentOrders =
    currentLanguage === "kh"
      ? [
          {
            id: "#ORD-001",
            customer: "សុភា ចាន់",
            product: "ប៉េងប៉ោះធម្មជាតិ",
            quantity: 5,
            total: 25.0,
            status: "pending",
            date: "2025-01-20",
          },
          {
            id: "#ORD-002",
            customer: "សរិទ្ធ សុខ",
            product: "សាឡាត់ស្រស់",
            quantity: 3,
            total: 15.0,
            status: "confirmed",
            date: "2025-01-20",
          },
          {
            id: "#ORD-003",
            customer: "វិចិត្រ គឹម",
            product: "ម្ទេសប្លោក",
            quantity: 8,
            total: 40.0,
            status: "delivered",
            date: "2025-01-19",
          },
          {
            id: "#ORD-004",
            customer: "សុវណ្ណ លី",
            product: "ការ៉ុត",
            quantity: 10,
            total: 20.0,
            status: "confirmed",
            date: "2025-01-19",
          },
          {
            id: "#ORD-005",
            customer: "សុជាតិ សេង",
            product: "ប៉េងប៉ោះធម្មជាតិ",
            quantity: 12,
            total: 60.0,
            status: "pending",
            date: "2025-01-18",
          },
        ]
      : [
          {
            id: "#ORD-001",
            customer: "Sophea Chan",
            product: "Organic Tomatoes",
            quantity: 5,
            total: 25.0,
            status: "pending",
            date: "2025-01-20",
          },
          {
            id: "#ORD-002",
            customer: "Sarith Sok",
            product: "Fresh Lettuce",
            quantity: 3,
            total: 15.0,
            status: "confirmed",
            date: "2025-01-20",
          },
          {
            id: "#ORD-003",
            customer: "Vichit Kim",
            product: "Bell Peppers",
            quantity: 8,
            total: 40.0,
            status: "delivered",
            date: "2025-01-19",
          },
          {
            id: "#ORD-004",
            customer: "Sovann Lee",
            product: "Carrots",
            quantity: 10,
            total: 20.0,
            status: "confirmed",
            date: "2025-01-19",
          },
          {
            id: "#ORD-005",
            customer: "Socheata Seng",
            product: "Organic Tomatoes",
            quantity: 12,
            total: 60.0,
            status: "pending",
            date: "2025-01-18",
          },
        ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusText = (status) => {
    return currentTexts[status] || status
  }

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    color = "text-green-600",
    bgGradient = "from-green-500 to-emerald-500",
  }) => (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${bgGradient} opacity-5 rounded-full -translate-y-4 translate-x-4 group-hover:opacity-10 transition-opacity`}
      ></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${bgGradient} shadow-md`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          {trend && (
            <div className="flex items-center text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />+{trend}%
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
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{currentTexts.dashboard}</h1>
              <p className="text-gray-600 text-lg">{currentTexts.welcome}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700 font-medium">
                  {new Date().toLocaleDateString(currentLanguage === "kh" ? "km-KH" : "en-US")}
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{currentTexts.quickStats}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={DollarSign}
              title={currentTexts.totalEarnings}
              value={`$${dashboardData.totalEarnings.toLocaleString()}`}
              subtitle={`${currentTexts.monthlyEarnings}: $${dashboardData.monthlyEarnings}`}
              trend={12.5}
              color="text-green-600"
              bgGradient="from-green-500 to-emerald-500"
            />
            <StatCard
              icon={ShoppingCart}
              title={currentTexts.totalOrders}
              value={dashboardData.totalOrders}
              subtitle={`${currentTexts.pendingOrders}: ${dashboardData.pendingOrders}`}
              trend={8.2}
              color="text-blue-600"
              bgGradient="from-blue-500 to-cyan-500"
            />
            <StatCard
              icon={Package}
              title={currentTexts.totalProducts}
              value={dashboardData.totalProducts}
              subtitle={`${currentTexts.activeProducts}: ${dashboardData.activeProducts}`}
              trend={5.1}
              color="text-purple-600"
              bgGradient="from-purple-500 to-indigo-500"
            />
            <StatCard
              icon={Users}
              title={currentTexts.totalCustomers}
              value={dashboardData.totalCustomers}
              subtitle={`${currentTexts.newCustomers}: ${dashboardData.newCustomers}`}
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
              <h3 className="text-xl font-semibold text-gray-900">{currentTexts.salesOverview}</h3>
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setTimeRange("weekly")}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                    timeRange === "weekly"
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  {currentTexts.weekly}
                </button>
                <button
                  onClick={() => setTimeRange("monthly")}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                    timeRange === "monthly"
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  {currentTexts.monthly}
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={salesData[timeRange]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    fontSize: "14px",
                  }}
                />
                <Bar dataKey="sales" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentTexts.topProducts}</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-modern-green transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: product.color }}></div>
                      <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.sales} {currentTexts.sales}
                      </p>
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
            <h3 className="text-xl font-semibold text-gray-900">{currentTexts.recentOrders}</h3>
            <button className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors flex items-center bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100">
              {currentTexts.viewAll}
              <Eye className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.orderNumber}</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.customer}</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.product}</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.quantity}</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.total}</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.status}</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">{currentTexts.date}</th>
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
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900 font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{order.product}</td>
                    <td className="p-4 text-sm text-gray-700 font-medium">{order.quantity}</td>
                    <td className="p-4 text-sm font-bold text-green-600">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString(currentLanguage === "kh" ? "km-KH" : "en-US")}
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
  )
}

export default FarmerDashboard
