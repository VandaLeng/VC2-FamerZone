import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye, 
  Package, TrendingUp, AlertCircle, CheckCircle, Clock,
  Download, Upload, RefreshCw, Star, MapPin, User
} from 'lucide-react';

const AdminProductManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // changed default to table

  // Mock data for products
  const products = [
    {
      id: 1,
      name: 'ម្លូបោះ​ជើងពាក់ (Cucumber)',
      category: 'បន្លែ',
      farmer: 'សម រត្ន',
      farmerLocation: 'កំពត',
      price: 2500,
      stock: 150,
      status: 'active',
      rating: 4.8,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=300&h=200&fit=crop',
      lastUpdated: '2024-08-20',
      totalSold: 89
    },
    {
      id: 2,
      name: 'ស្ពៃបៃតងស្រស់ (Fresh Spinach)',
      category: 'បន្លែ',
      farmer: 'មាលី ពេជ្រ',
      farmerLocation: 'សៀមរាប',
      price: 1800,
      stock: 0,
      status: 'out_of_stock',
      rating: 4.5,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop',
      lastUpdated: '2024-08-18',
      totalSold: 67
    },
    {
      id: 3,
      name: 'ស្វាយចេក (Ripe Mango)',
      category: 'ផ្លែឈើ',
      farmer: 'ឈុន សុភា',
      farmerLocation: 'បាត់ដំបង',
      price: 4500,
      stock: 75,
      status: 'pending',
      rating: 4.9,
      reviews: 41,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=200&fit=crop',
      lastUpdated: '2024-08-22',
      totalSold: 128
    },
    {
      id: 4,
      name: 'អង្ករជាស្មីដុំ (Jasmine Rice)',
      category: 'អង្ករ',
      farmer: 'ពេជ្រ មករា',
      farmerLocation: 'ព្រះវិហារ',
      price: 3200,
      stock: 500,
      status: 'active',
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
      lastUpdated: '2024-08-21',
      totalSold: 234
    },
    {
      id: 5,
      name: 'ត្រីកំពុងស្រស់ (Fresh Fish)',
      category: 'សាច់ និង​ត្រី',
      farmer: 'រតន៍ សុវណ្ណ',
      farmerLocation: 'កំពង់ចាម',
      price: 8500,
      stock: 25,
      status: 'low_stock',
      rating: 4.6,
      reviews: 19,
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop',
      lastUpdated: '2024-08-23',
      totalSold: 45
    },
    {
      id: 6,
      name: 'ម្រេចសស្រស់ (Fresh Chili)',
      category: 'បន្លែ',
      farmer: 'លី ចន្ទា',
      farmerLocation: 'កណ្ដាល',
      price: 6500,
      stock: 80,
      status: 'active',
      rating: 4.4,
      reviews: 28,
      image: 'https://images.unsplash.com/photo-1583286503919-9c780a0754eb?w=300&h=200&fit=crop',
      lastUpdated: '2024-08-19',
      totalSold: 92
    }
  ];

  const categories = ['all', 'បន្លែ', 'ផ្លែឈើ', 'អង្ករ', 'សាច់ និង​ត្រី'];
  
  const statusConfig = {
    active: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    out_of_stock: { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    low_stock: { label: 'Low Stock', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    rejected: { label: 'Rejected', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
  };

  const stats = [
    { title: 'Total Products', value: '892', change: '+12%', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Approved Products', value: '645', change: '+5%', color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Pending Review', value: '23', change: '+8%', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { title: 'Need Attention', value: '15', change: '-15%', color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length 
        ? [] 
        : filteredProducts.map(p => p.id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farmer Product Management</h1>
              <p className="text-gray-600 mt-1">Review, approve and manage farmers' product listings</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
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

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products or farmers..."
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
              <button className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">Rating: {product.rating} ⭐</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.farmer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.price.toLocaleString()}៛</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[product.status].color}`}>
                      {statusConfig[product.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex items-center">
                      <Eye size={14} className="mr-1" /> Review
                    </button>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center">
                      <Edit size={14} className="mr-1" /> Manage
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    No products found. Try using different keywords or adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;
