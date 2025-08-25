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
  const [viewMode, setViewMode] = useState('grid'); // grid or table

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

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[product.status].color}`}>
            {statusConfig[product.status].label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button className="p-1 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
            <MoreVertical size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <User size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600 font-medium">Farmer: {product.farmer}</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-sm text-gray-500">Location: {product.farmerLocation}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600">{product.price.toLocaleString()}៛</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>Total Sold: {product.totalSold}</span>
          <span>Customer Reviews: {product.reviews}</span>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-700 transition-colors">
            <Eye size={14} className="inline mr-1" />
            Review
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            <Edit size={14} className="inline mr-1" />
            Manage
          </button>
        </div>
      </div>
    </div>
  );

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

        {/* Products Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Products ({filteredProducts.length})
                </h2>
                {selectedProducts.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedProducts.length} products selected
                  </span>
                )}
              </div>
              
              {selectedProducts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <CheckCircle size={16} />
                    <span>Bulk Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Edit size={16} />
                    <span>Bulk Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 size={16} />
                    <span>Bulk Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try using different keywords or adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;