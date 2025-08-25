import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit, Trash2, Eye, Package, CheckCircle, Clock, AlertCircle, RefreshCw, Star, X
} from 'lucide-react';

const FarmerProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [categoryMap, setCategoryMap] = useState({});
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  const statusConfig = {
    active: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    out_of_stock: { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    low_stock: { label: 'Low Stock', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    rejected: { label: 'Rejected', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&status=${filterStatus}&category=${filterCategory}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        const text = await response.text();
        console.error('Response:', response.status, text);
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data.products || []);
      setCategories(data.categories || ['all']);
      setStats(data.stats || []);

      // Fetch categories with IDs
      const categoryResponse = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      if (!categoryResponse.ok) {
        const text = await categoryResponse.text();
        console.error('Category Response:', categoryResponse.status, text);
        throw new Error(`Failed to fetch categories: ${categoryResponse.statusText}`);
      }
      const categoriesData = await categoryResponse.json();
      const map = {};
      categoriesData.forEach(cat => {
        map[cat.name] = cat.id;
      });
      setCategoryMap(map);
    } catch (err) {
      setError(err.message);
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, filterStatus, filterCategory]);

  const handleAddEditProduct = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          category_id: categoryMap[formData.category_id] || formData.category_id
        })
      });
      if (!response.ok) {
        const text = await response.text();
        console.error('Response:', response.status, text);
        throw new Error(editingProduct ? 'Failed to update product' : 'Failed to add product');
      }
      setIsModalOpen(false);
      setFormData({ name: '', category_id: '', price: '', stock: '', description: '', image: '' });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          const text = await response.text();
          console.error('Response:', response.status, text);
          throw new Error('Failed to delete product');
        }
        fetchProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      image: product.image
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', category_id: '', price: '', stock: '', description: '', image: '' });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Package className={`${stat.color} w-6 h-6`} />
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
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
                <option value="active">Approved</option>
                <option value="pending">Pending Review</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={fetchProducts}
                className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
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
              {products.map((product) => {
                const StatusIcon = statusConfig[product.status].icon;
                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">Rating: {product.rating} ⭐</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.price.toLocaleString()}៛</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[product.status].color} flex items-center`}>
                        <StatusIcon size={14} className="mr-1" />
                        {statusConfig[product.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center"
                      >
                        <Edit size={14} className="mr-1" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!loading && products.length === 0 && (
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

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddEditProduct} className="space-y-4">
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
                  {categories.filter(cat => cat !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
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
                />
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
                <label className="block text-sm font-medium text-gray-600">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter image URL..."
                />
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
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProductManagement;