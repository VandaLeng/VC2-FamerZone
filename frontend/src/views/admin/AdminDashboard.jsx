import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  ShoppingCart, 
  TrendingUp, 
  MapPin, 
  AlertTriangle, 
  Bell, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Sample data
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Farmers',
      value: '426',
      change: '+8%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '8,921',
      change: '+23%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '$45,267',
      change: '-2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentUsers = [
    { id: 1, name: 'Sophea Chhan', email: 'sophea@gmail.com', role: 'Buyer', status: 'Active', joinDate: '2025-08-20' },
    { id: 2, name: 'Pisach Kim', email: 'pisach@gmail.com', role: 'Farmer', status: 'Active', joinDate: '2025-08-19' },
    { id: 3, name: 'Dara Nen', email: 'dara@gmail.com', role: 'Buyer', status: 'Inactive', joinDate: '2025-08-18' },
    { id: 4, name: 'Channary Sok', email: 'channary@gmail.com', role: 'Farmer', status: 'Pending', joinDate: '2025-08-17' },
    { id: 5, name: 'Vanna Ly', email: 'vanna@gmail.com', role: 'Buyer', status: 'Active', joinDate: '2025-08-16' }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Sophea Chhan', farmer: 'Pisach Kim', product: 'Fresh Rice 10kg', amount: '$25.00', status: 'Completed' },
    { id: '#ORD-002', customer: 'Dara Nen', farmer: 'Channary Sok', product: 'Organic Vegetables', amount: '$18.50', status: 'Processing' },
    { id: '#ORD-003', customer: 'Vanna Ly', farmer: 'Pisach Kim', product: 'Fresh Fish 2kg', amount: '$32.00', status: 'Shipped' },
    { id: '#ORD-004', customer: 'Sophea Chhan', farmer: 'Channary Sok', product: 'Mixed Fruits', amount: '$15.75', status: 'Pending' }
  ];

  const StatusBadge = ({ status }) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="text-green-500 mr-1" size={16} />
                    ) : (
                      <ArrowDownRight className="text-red-500 mr-1" size={16} />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Users Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                  </div>
                </div>
              </div>

              {/* Orders Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Order Analytics</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>This week</option>
                    <option>This month</option>
                    <option>This year</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ShoppingCart size={48} className="mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">View all</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentUsers.slice(0, 4).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={user.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">View all</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{order.id}</div>
                              <div className="text-sm text-gray-500">{order.product}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={order.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900">Users Management</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <Download size={16} className="mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                            <span className="text-sm font-medium text-gray-700">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.joinDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Eye size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab !== 'overview' && selectedTab !== 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Section Under Development</h3>
              <p>This section is currently being developed and will be available soon.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;