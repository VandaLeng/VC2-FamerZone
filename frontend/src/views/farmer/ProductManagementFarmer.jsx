import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Edit, Trash2, Package, CheckCircle, Clock, AlertCircle, RefreshCw, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import for redirection

const FarmerItemManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    stock: '',
    unit: 'kg',
    description: '',
    image: null, // Changed to null to support File uploads
    user_id: '', // Initialize user_id
    province_id: '' // Initialize province_id
  });
  const navigate = useNavigate(); // For redirecting to login

  const statusConfig = {
    active: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    out_of_stock: { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    low_stock: { label: 'Low Stock', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    rejected: { label: 'Rejected', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
  };

  const fetchItems = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your products.');
      navigate('/login'); // Redirect to login page
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Fetch items
      const itemResponse = await fetch(`/api/items?search=${encodeURIComponent(searchQuery)}&status=${filterStatus}&category=${filterCategory}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!itemResponse.ok) {
        const errorData = await itemResponse.json().catch(() => ({}));
        if (itemResponse.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error(errorData.message || `Failed to fetch items: ${itemResponse.statusText}`);
      }
      const itemData = await itemResponse.json();
      setItems(itemData.items || []);

      // Fetch categories
      const categoryResponse = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!categoryResponse.ok) {
        const errorData = await categoryResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch categories: ${categoryResponse.statusText}`);
      }
      const categoryData = await categoryResponse.json();
      setCategories(categoryData || []);

      // Fetch stats
      const statsResponse = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!statsResponse.ok) {
        const errorData = await statsResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch stats: ${statsResponse.statusText}`);
      }
      const statsData = await statsResponse.json();
      setStats(statsData || []);
    } catch (err) {
      setError(err.message);
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your products.');
      navigate('/login');
      return;
    }
    fetchItems();
  }, [searchQuery, filterStatus, filterCategory, navigate]);

  const handleAddEditItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to perform this action.');
        navigate('/login');
        return;
      }

      const data = new FormData();
      data.append('name', formData.name);
      data.append('category_id', formData.category_id);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('unit', formData.unit || 'kg');
      data.append('description', formData.description);
      data.append('user_id', formData.user_id || '1'); // Replace with actual user ID from auth context
      data.append('province_id', formData.province_id || '1'); // Replace with actual province ID
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      } else if (formData.image) {
        data.append('image', formData.image);
      }

      const url = editingItem ? `/api/items/${editingItem.id}` : '/api/items';
      const method = editingItem ? 'PUT' : 'POST'; // Use PUT for updates

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error(result.message || 'Failed to save product');
      }

      setIsModalOpen(false);
      setFormData({
        name: '',
        category_id: '',
        price: '',
        stock: '',
        unit: 'kg',
        description: '',
        image: null,
        user_id: '',
        province_id: ''
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      setError(err.message);
      console.error('Add/Edit Error:', err);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to perform this action.');
          navigate('/login');
          return;
        }

        const response = await fetch(`/api/items/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 401) {
            setError('Session expired. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error(errorData.message || 'Failed to delete item');
        }
        fetchItems();
      } catch (err) {
        setError(err.message);
        console.error('Delete Error:', err);
      }
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category_id: item.category_id,
      price: item.price,
      stock: item.stock,
      unit: item.unit || 'kg',
      description: item.description || '',
      image: item.image,
      user_id: item.user_id || '1', // Replace with actual user ID
      province_id: item.province_id || '1' // Replace with actual province ID
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      category_id: '',
      price: '',
      stock: '',
      unit: 'kg',
      description: '',
      image: null,
      user_id: '',
      province_id: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value // Handle file input
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Product Management</h1>
              <p className="text-gray-600 mt-1">Manage your product listings</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your products...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
            {error}
            {error.includes('log in') ? (
              <button
                onClick={() => navigate('/login')}
                className="ml-4 text-sm text-blue-600 hover:underline"
              >
                Go to Login
              </button>
            ) : (
              <button
                onClick={fetchItems}
                className="ml-4 text-sm text-blue-600 hover:underline"
              >
                Retry
              </button>
            )}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className={`w-12 h-12 ${stat.bgColor || 'bg-blue-100'} rounded-lg flex items-center justify-center mb-4`}>
                  <Package className={`${stat.color || 'text-blue-600'} w-6 h-6`} />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-sm font-medium ${stat.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change || '0%'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your products..."
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
                {Object.keys(statusConfig).map(status => (
                  <option key={status} value={status}>{statusConfig[status].label}</option>
                ))}
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchItems}
                className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => {
                const StatusIcon = statusConfig[item.status]?.icon || AlertCircle;
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                      <img
                        src={item.image || 'https://via.placeholder.com/50'}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">Rating: {item.rating || 0} ⭐</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {categories.find(cat => cat.id === item.category_id)?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {(item.price || 0).toLocaleString()}៛
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.stock || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[item.status]?.color || 'bg-gray-100 text-gray-800'} flex items-center`}>
                        <StatusIcon size={14} className="mr-1" />
                        {statusConfig[item.status]?.label || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center"
                      >
                        <Edit size={14} className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    No products found. Try adding some products or adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddEditItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter product name..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Price (៛)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter price..."
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter stock quantity..."
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="unit">Unit</option>
                  <option value="liter">Liter (L)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Describe your product..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Product Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
                {formData.image && typeof formData.image === 'string' && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                  />
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingItem ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerItemManagement;