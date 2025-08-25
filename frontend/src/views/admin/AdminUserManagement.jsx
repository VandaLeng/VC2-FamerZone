import React, { useState } from 'react';
import {
  Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye,
  Users, UserCheck, UserX, UserPlus, AlertCircle, CheckCircle, Clock,
  Download, Upload, RefreshCw, Star, Archive,
  Mail, Phone, MapPin, Calendar, Shield, Ban, Unlock,
  TrendingUp, Activity, Award, Settings, Send, MessageSquare
} from 'lucide-react';

const AdminUserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortBy, setSortBy] = useState('joinDate');

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'សម រត្ន',
      nameEn: 'Som Ratana',
      email: 'som.ratana@gmail.com',
      phone: '+855 12 345 678',
      role: 'farmer',
      status: 'active',
      location: 'កំពត',
      locationEn: 'Kampot',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinDate: '2024-01-15',
      lastActive: '2024-08-25',
      totalProducts: 12,
      totalSales: 2500000,
      rating: 4.8,
      verified: true,
      completedOrders: 89,
      responseTime: '2 hours',
      businessName: 'រត្នកសិដ្ឋាន'
    },
    {
      id: 2,
      name: 'មាលី ពេជ្រ',
      nameEn: 'Mali Pich',
      email: 'mali.pich@gmail.com',
      phone: '+855 17 789 012',
      role: 'farmer',
      status: 'active',
      location: 'សៀមរាប',
      locationEn: 'Siem Reap',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b988?w=150&h=150&fit=crop&crop=face',
      joinDate: '2024-02-10',
      lastActive: '2024-08-24',
      totalProducts: 8,
      totalSales: 1800000,
      rating: 4.5,
      verified: true,
      completedOrders: 67,
      responseTime: '3 hours',
      businessName: 'ពេជ្រអាហារ'
    },
    {
      id: 3,
      name: 'លី សុភា',
      nameEn: 'Lee Sophea',
      email: 'lee.sophea@gmail.com',
      phone: '+855 98 456 789',
      role: 'customer',
      status: 'active',
      location: 'ភ្នំពេញ',
      locationEn: 'Phnom Penh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      joinDate: '2024-03-05',
      lastActive: '2024-08-25',
      totalOrders: 24,
      totalSpent: 750000,
      favoriteProducts: 15,
      verified: false,
      loyaltyPoints: 1250,
      avgOrderValue: 31250
    },
    {
      id: 4,
      name: 'ឈុន មករា',
      nameEn: 'Chun Makara',
      email: 'chun.makara@gmail.com',
      phone: '+855 11 234 567',
      role: 'farmer',
      status: 'pending',
      location: 'បាត់ដំបង',
      locationEn: 'Battambang',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      joinDate: '2024-08-20',
      lastActive: '2024-08-23',
      totalProducts: 0,
      totalSales: 0,
      rating: 0,
      verified: false,
      completedOrders: 0,
      responseTime: 'N/A',
      businessName: 'មការាកសិកម្ម'
    },
    {
      id: 5,
      name: 'ច័ន្ទ រស្មី',
      nameEn: 'Chan Rasmey',
      email: 'chan.rasmey@gmail.com',
      phone: '+855 77 890 123',
      role: 'customer',
      status: 'suspended',
      location: 'កណ្ដាល',
      locationEn: 'Kandal',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinDate: '2024-04-12',
      lastActive: '2024-08-15',
      totalOrders: 8,
      totalSpent: 320000,
      favoriteProducts: 5,
      verified: true,
      loyaltyPoints: 480,
      avgOrderValue: 40000
    },
    {
      id: 6,
      name: 'វី ចិន្តា',
      nameEn: 'Vey Chinta',
      email: 'vey.chinta@gmail.com',
      phone: '+855 95 678 901',
      role: 'customer',
      status: 'active',
      location: 'ព្រះសីហនុ',
      locationEn: 'Preah Sihanouk',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      joinDate: '2024-05-20',
      lastActive: '2024-08-25',
      totalOrders: 16,
      totalSpent: 580000,
      favoriteProducts: 12,
      verified: true,
      loyaltyPoints: 870,
      avgOrderValue: 36250
    }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Users
    },
    {
      title: 'Active Farmers',
      value: '203',
      change: '+8%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: UserCheck
    },
    {
      title: 'Active Customers',
      value: '1,044',
      change: '+15%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Users
    },
    {
      title: 'Pending Approval',
      value: '23',
      change: '+5',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: Clock
    }
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800', dot: 'bg-green-400' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-400' },
    suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800', dot: 'bg-red-400' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' }
  };

  const roleConfig = {
    farmer: { label: 'Farmer', color: 'bg-green-100 text-green-800', icon: '🌾' },
    customer: { label: 'Customer', color: 'bg-blue-100 text-blue-800', icon: '👤' },
    admin: { label: 'Admin', color: 'bg-purple-100 text-purple-800', icon: '⚡' }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.nameEn.localeCompare(b.nameEn);
      case 'joinDate':
        return new Date(b.joinDate) - new Date(a.joinDate);
      case 'lastActive':
        return new Date(b.lastActive) - new Date(a.lastActive);
      case 'location':
        return a.locationEn.localeCompare(b.locationEn);
      default:
        return 0;
    }
  });

  const TableRow = ({ user }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <tr className="hover:bg-gray-50 transition-colors relative">
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${statusConfig[user.status].dot}`}></span>
            </div>
            <div>
              <div className="font-medium text-gray-900 flex items-center space-x-2">
                <span>{user.nameEn}</span>
                {user.verified && <Shield size={14} className="text-blue-500" />}
              </div>
              <div className="text-sm text-gray-500">{user.name}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleConfig[user.role].color}`}>
            <span className="mr-1">{roleConfig[user.role].icon}</span>
            {roleConfig[user.role].label}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[user.status].color}`}>
            <span className={`w-2 h-2 rounded-full mr-1 ${statusConfig[user.status].dot}`}></span>
            {statusConfig[user.status].label}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.locationEn}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{new Date(user.lastActive).toLocaleDateString()}</td>
        <td className="px-6 py-4 relative">
          <button
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MoreVertical size={16} className="text-gray-400" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
                <Eye size={16} /> <span>View</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
                <MessageSquare size={16} /> <span>Message</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
                <Edit size={16} /> <span>Edit</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600">
                <Ban size={16} /> <span>Suspend</span>
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage farmers, customers and all platform users</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Download size={20} />
                <span>Export Users</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className={`${stat.color} w-6 h-6`} />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-full sm:w-80"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Roles</option>
                <option value="farmer">Farmers</option>
                <option value="customer">Customers</option>
                <option value="admin">Admins</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="joinDate">Sort by Join Date</option>
                <option value="name">Sort by Name</option>
                <option value="lastActive">Sort by Last Active</option>
                <option value="location">Sort by Location</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Users Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Users size={20} />
                  <span>Platform Users ({sortedUsers.length})</span>
                </h2>
                {selectedUsers.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedUsers.length} users selected
                  </span>
                )}
              </div>

              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <UserCheck size={16} />
                    <span>Activate</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Send size={16} />
                    <span>Message</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <Ban size={16} />
                    <span>Suspend</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>

            {sortedUsers.length === 0 && (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <UserPlus size={16} />
                  <span>Invite Users</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;