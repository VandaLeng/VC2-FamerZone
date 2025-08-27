import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye,
  Users, UserCheck, UserX, UserPlus, AlertCircle, CheckCircle, Clock,
  Download, Upload, RefreshCw, Star, Archive, X,
  Mail, Phone, MapPin, Calendar, Shield, Ban, Unlock,
  TrendingUp, Activity, Award, Settings, Send, MessageSquare
} from 'lucide-react';

// Configure axios with base URL and auth headers
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
  }
});

const AdminUserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortBy, setSortBy] = useState('joinDate');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [stats, setStats] = useState([
    { title: 'Total Users', value: '0', change: '+0%', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Users },
    { title: 'Active Farmers', value: '0', change: '+0%', color: 'text-green-600', bgColor: 'bg-green-50', icon: UserCheck },
    { title: 'Active Buyers', value: '0', change: '+0%', color: 'text-purple-600', bgColor: 'bg-purple-50', icon: Users },
    { title: 'Pending Approval', value: '0', change: '+0', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: Clock }
  ]);

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users', {
        params: { search: searchQuery }
      });
      const fetchedUsers = response.data.data.map(user => ({
        id: user.id,
        name: user.name, // Khmer name
        nameEn: user.name, // English name (assuming same as name for simplicity)
        email: user.email,
        phone: user.phone || 'N/A',
        role: user.roles?.[0]?.name || 'N/A',
        status: user.status || 'active', // Adjust based on your backend status field
        location: user.province?.province_name || 'N/A',
        locationEn: user.province?.province_name || 'N/A',
        avatar: user.image_url || 'https://via.placeholder.com/150', // Fallback image
        joinDate: user.created_at,
        lastActive: user.updated_at,
        totalProducts: user.totalProducts || 0, // Add these fields to backend if needed
        totalSales: user.totalSales || 0,
        rating: user.rating || 0,
        verified: user.verified || false,
        completedOrders: user.completedOrders || 0,
        responseTime: user.responseTime || 'N/A',
        businessName: user.businessName || 'N/A'
      }));
      setUsers(fetchedUsers);

      // Update stats (you may need a separate endpoint for this)
      setStats([
        { ...stats[0], value: response.data.total.toString(), change: '+12%' },
        { ...stats[1], value: fetchedUsers.filter(u => u.role === 'farmer' && u.status === 'active').length.toString(), change: '+8%' },
        { ...stats[2], value: fetchedUsers.filter(u => u.role === 'buyer' && u.status === 'active').length.toString(), change: '+15%' },
        { ...stats[3], value: fetchedUsers.filter(u => u.status === 'pending').length.toString(), change: '+5' }
      ]);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on mount and when searchQuery changes
  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  // Handle user view - fetch detailed user info
  const handleView = async (userId) => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}`);
      const userData = response.data;
      
      // Format the user data for viewing
      const formattedUser = {
        id: userData.id,
        name: userData.name,
        nameEn: userData.name,
        email: userData.email,
        phone: userData.phone || 'N/A',
        role: userData.roles?.[0]?.name || 'N/A',
        status: userData.status || 'active',
        location: userData.province?.province_name || 'N/A',
        locationEn: userData.province?.province_name || 'N/A',
        avatar: userData.image_url || 'https://via.placeholder.com/150',
        joinDate: userData.created_at,
        lastActive: userData.updated_at,
        totalProducts: userData.totalProducts || 0,
        totalSales: userData.totalSales || 0,
        rating: userData.rating || 0,
        verified: userData.verified || false,
        completedOrders: userData.completedOrders || 0,
        responseTime: userData.responseTime || 'N/A',
        businessName: userData.businessName || 'N/A',
        // Add additional fields that might be available in detailed view
        address: userData.address || 'N/A',
        dateOfBirth: userData.date_of_birth || 'N/A',
        bio: userData.bio || 'No bio available',
        socialMedia: userData.social_media || {},
        preferences: userData.preferences || {}
      };
      
      setViewingUser(formattedUser);
      setShowViewModal(true);
    } catch (err) {
      setError('Failed to fetch user details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (userId) => {
    const user = users.find(user => user.id === userId);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Handle user deletion with confirmation
  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      setDeleteLoading(true);
      await api.delete(`/users/${userToDelete.id}`);
      
      // Remove user from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      
      // Update stats
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setStats(prevStats => [
        { ...prevStats[0], value: updatedUsers.length.toString() },
        { ...prevStats[1], value: updatedUsers.filter(u => u.role === 'farmer' && u.status === 'active').length.toString() },
        { ...prevStats[2], value: updatedUsers.filter(u => u.role === 'buyer' && u.status === 'active').length.toString() },
        { ...prevStats[3], value: updatedUsers.filter(u => u.status === 'pending').length.toString() }
      ]);
      
      // Close view modal if the deleted user was being viewed
      if (viewingUser && viewingUser.id === userToDelete.id) {
        setShowViewModal(false);
        setViewingUser(null);
      }
      
      // Close delete modal
      setShowDeleteModal(false);
      setUserToDelete(null);
      
    } catch (err) {
      let errorMessage = 'Failed to delete user.';
      
      // Handle specific error responses
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'User not found. They may have already been deleted.';
          // Remove from local state anyway
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
        } else if (err.response.status === 403) {
          errorMessage = 'You do not have permission to delete this user.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
      console.error('Delete error:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle user suspension (assuming you add a status field and endpoint)
  const handleSuspend = async (userId) => {
    try {
      await api.put(`/users/${userId}`, { status: 'suspended' }); // Add endpoint to update status
      fetchUsers();
      alert('User suspended successfully');
    } catch (err) {
      setError('Failed to suspend user.');
      console.error(err);
    }
  };

  // Handle user activation
  const handleActivate = async (userId) => {
    try {
      await api.put(`/users/${userId}`, { status: 'active' });
      fetchUsers();
      alert('User activated successfully');
    } catch (err) {
      setError('Failed to activate user.');
      console.error(err);
    }
  };

  // Filter and sort users
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

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800', dot: 'bg-green-400' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-400' },
    suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800', dot: 'bg-red-400' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' }
  };

  const roleConfig = {
    farmer: { label: 'Farmer', color: 'bg-green-100 text-green-800', icon: '🌾' },
    buyer: { label: 'Buyer', color: 'bg-blue-100 text-blue-800', icon: '👤' },
    admin: { label: 'Admin', color: 'bg-purple-100 text-purple-800', icon: '⚡' }
  };

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, user, loading }) => {
    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="mb-4">
              <p className="text-gray-700 mb-3">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{user.nameEn}</span>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="text-red-600 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-800 font-medium text-sm mb-1">Warning</h4>
                    <p className="text-red-700 text-sm">
                      This will permanently remove all user data including:
                    </p>
                    <ul className="text-red-700 text-sm mt-2 space-y-1">
                      <li>• Profile information and account details</li>
                      <li>• All associated products and listings</li>
                      <li>• Order history and transaction records</li>
                      <li>• Messages and communication history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user.nameEn.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.nameEn}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleConfig[user.role]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {roleConfig[user.role]?.icon || '👤'} {roleConfig[user.role]?.label || user.role}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[user.status]?.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${statusConfig[user.status]?.dot}`}></span>
                      {statusConfig[user.status]?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete User</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // User View Modal Component
  const UserViewModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Eye className="text-blue-600" size={24} />
              <span>User Details</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - User Profile */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {user.nameEn.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{user.nameEn}</h3>
                  <p className="text-gray-600 mb-2">{user.name}</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleConfig[user.role]?.color || 'bg-gray-100 text-gray-800'}`}>
                      <span className="mr-1">{roleConfig[user.role]?.icon || '👤'}</span>
                      {roleConfig[user.role]?.label || user.role}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[user.status].color}`}>
                      <span className={`w-2 h-2 rounded-full mr-1 ${statusConfig[user.status].dot}`}></span>
                      {statusConfig[user.status].label}
                    </span>
                  </div>
                  {user.verified && (
                    <div className="flex items-center justify-center text-blue-600 mb-4">
                      <Shield size={16} className="mr-1" />
                      <span className="text-sm font-medium">Verified User</span>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => showDeleteConfirmation(user.id)}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Delete User</span>
                  </button>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => handleSuspend(user.id)}
                      className="w-full flex items-center justify-center space-x-2 bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      <Ban size={16} />
                      <span>Suspend User</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user.id)}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <UserCheck size={16} />
                      <span>Activate User</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Columns - User Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Mail size={20} className="mr-2 text-blue-600" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <p className="text-gray-900">{user.locationEn}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-gray-900">{user.address}</p>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar size={20} className="mr-2 text-green-600" />
                    Account Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Join Date</label>
                      <p className="text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Active</label>
                      <p className="text-gray-900">{new Date(user.lastActive).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="text-gray-900">{user.dateOfBirth !== 'N/A' ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Business Name</label>
                      <p className="text-gray-900">{user.businessName}</p>
                    </div>
                  </div>
                </div>

                {/* Statistics (if user is farmer) */}
                {user.role === 'farmer' && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Activity size={20} className="mr-2 text-purple-600" />
                      Farmer Statistics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{user.totalProducts}</p>
                        <p className="text-sm text-gray-600">Products</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">${user.totalSales}</p>
                        <p className="text-sm text-gray-600">Total Sales</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{user.rating}/5</p>
                        <p className="text-sm text-gray-600">Rating</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{user.completedOrders}</p>
                        <p className="text-sm text-gray-600">Orders</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bio Section */}
                {user.bio && user.bio !== 'No bio available' && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Bio</h4>
                    <p className="text-gray-700">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TableRow = ({ user }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <tr className="hover:bg-gray-50 transition-colors relative">
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user.nameEn.split(' ').map(n => n[0]).join('')}
              </div>
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
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleConfig[user.role]?.color || 'bg-gray-100 text-gray-800'}`}>
            <span className="mr-1">{roleConfig[user.role]?.icon || '👤'}</span>
            {roleConfig[user.role]?.label || user.role}
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
              <button 
                onClick={() => {
                  handleView(user.id);
                  setOpenMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-700"
              >
                <Eye size={16} /> <span>View</span>
              </button>
              <button
                onClick={() => {
                  showDeleteConfirmation(user.id);
                  setOpenMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
              >
                <Trash2 size={16} /> <span>Delete</span>
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
              <p className="text-gray-600 mt-1">Manage farmers, buyers and all platform users</p>
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
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}
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
                <option value="buyer">Buyers</option>
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
              <button
                onClick={fetchUsers}
                className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
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
                  <button
                    onClick={() => selectedUsers.forEach(id => handleActivate(id))}
                    className="flex items-center space-x-2 px-3 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <UserCheck size={16} />
                    <span>Activate</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Send size={16} />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => selectedUsers.forEach(id => handleSuspend(id))}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Ban size={16} />
                    <span>Suspend</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw size={48} className="mx-auto text-gray-300 animate-spin" />
                <p className="text-gray-500 mt-4">Loading users...</p>
              </div>
            ) : sortedUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <UserPlus size={16} />
                  <span>Invite Users</span>
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>

      {/* User View Modal */}
      <UserViewModal 
        user={viewingUser} 
        isOpen={showViewModal} 
        onClose={() => {
          setShowViewModal(false);
          setViewingUser(null);
        }} 
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDelete}
        user={userToDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdminUserManagement;