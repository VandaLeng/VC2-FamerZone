import React, { useState } from 'react';
import {
  Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye,
  FolderOpen, TrendingUp, AlertCircle, CheckCircle, Clock,
  Download, Upload, RefreshCw, Star, Archive,
  Users, Package, Tag, ArrowUp, ArrowDown, BarChart3, Layers
} from 'lucide-react';

const AdminCategoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: 'បន្លែ',
      nameEn: 'Vegetables',
      description: 'Fresh vegetables and leafy greens from local farmers',
      icon: '🥬',
      status: 'active',
      productCount: 245,
      farmerCount: 67,
      totalSales: 1250000,
      subcategories: ['ស្លឹកបៃតង', 'ម្លូបោះ', 'ប៉េងប៉ោះ', 'ខ្ទឹមបារាំង'],
      createdDate: '2024-01-15',
      lastUpdated: '2024-08-20',
      trending: true,
      growth: '+15%'
    },
    {
      id: 2,
      name: 'ផ្លែឈើ',
      nameEn: 'Fruits',
      description: 'Fresh seasonal fruits directly from orchards',
      icon: '🥭',
      status: 'active',
      productCount: 189,
      farmerCount: 43,
      totalSales: 890000,
      subcategories: ['ស្វាយ', 'ល្ហុង', 'ទូរេន', 'ក្រូចថ្លុង'],
      createdDate: '2024-01-15',
      lastUpdated: '2024-08-18',
      trending: true,
      growth: '+22%'
    },
    {
      id: 3,
      name: 'អង្ករ',
      nameEn: 'Rice & Grains',
      description: 'Premium rice varieties and grain products',
      icon: '🌾',
      status: 'active',
      productCount: 56,
      farmerCount: 28,
      totalSales: 2100000,
      subcategories: ['អង្ករជាស្មី', 'អង្ករក្រហម', 'អង្ករស', 'ពោត'],
      createdDate: '2024-01-15',
      lastUpdated: '2024-08-22',
      trending: false,
      growth: '+8%'
    },
    {
      id: 4,
      name: 'សាច់ និងត្រី',
      nameEn: 'Meat & Fish',
      description: 'Fresh meat, poultry and fish products',
      icon: '🐟',
      status: 'active',
      productCount: 78,
      farmerCount: 22,
      totalSales: 1680000,
      subcategories: ['ត្រីស្រស់', 'មាន់ភូមិ', 'ជ្រូកព្រៃ', 'ពងមាន់'],
      createdDate: '2024-01-20',
      lastUpdated: '2024-08-19',
      trending: true,
      growth: '+18%'
    },
    {
      id: 5,
      name: 'ឱសថបង្អែម',
      nameEn: 'Herbs & Spices',
      description: 'Traditional herbs and aromatic spices',
      icon: '🌿',
      status: 'active',
      productCount: 92,
      farmerCount: 35,
      totalSales: 650000,
      subcategories: ['ម្រេចខ្ទិះ', 'ម្រេចបណ្ដុំ', 'ស្លឹកគ្រៃ', 'ខ្ទឹមស'],
      createdDate: '2024-02-01',
      lastUpdated: '2024-08-21',
      trending: false,
      growth: '+12%'
    },
    {
      id: 6,
      name: 'ផលិតផលកសិកម្ម',
      nameEn: 'Agricultural Products',
      description: 'Various agricultural and farm products',
      icon: '🚜',
      status: 'draft',
      productCount: 23,
      farmerCount: 8,
      totalSales: 180000,
      subcategories: ['ដំឡូងមី', 'ដំឡូងបារាំង', 'ល្ពៅ', 'ស្ពៃក្រញូង'],
      createdDate: '2024-07-15',
      lastUpdated: '2024-08-15',
      trending: false,
      growth: '+5%'
    }
  ];

  const stats = [
    {
      title: 'Total Categories',
      value: '6',
      change: '+2',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: FolderOpen
    },
    {
      title: 'Active Categories',
      value: '5',
      change: '+1',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: CheckCircle
    },
    {
      title: 'Total Products',
      value: '683',
      change: '+45',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Package
    },
    {
      title: 'Active Farmers',
      value: '203',
      change: '+12',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: Users
    }
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800', dot: 'bg-green-400' },
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' },
    archived: { label: 'Archived', color: 'bg-red-100 text-red-800', dot: 'bg-red-400' }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.nameEn.localeCompare(b.nameEn);
      case 'products':
        return b.productCount - a.productCount;
      case 'farmers':
        return b.farmerCount - a.farmerCount;
      case 'sales':
        return b.totalSales - a.totalSales;
      case 'created':
        return new Date(b.createdDate) - new Date(a.createdDate);
      default:
        return 0;
    }
  });

  const TableRow = ({ category }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <tr className="hover:bg-gray-50 transition-colors relative">
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center text-lg">
              {category.icon}
            </div>
            <div>
              <div className="font-medium text-gray-900">{category.nameEn}</div>
              <div className="text-sm text-gray-500">{category.name}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[category.status].color}`}>
            <span className={`w-2 h-2 rounded-full mr-1 ${statusConfig[category.status].dot}`}></span>
            {statusConfig[category.status].label}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{category.productCount}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{category.farmerCount}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{(category.totalSales / 1000000).toFixed(1)}M ៛</td>
        <td className="px-6 py-4">
          <div className={`flex items-center space-x-1 text-sm font-medium ${category.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {category.growth.startsWith('+') ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>{category.growth}</span>
          </div>
        </td>
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
                <Edit size={16} /> <span>Edit</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600">
                <Trash2 size={16} /> <span>Deactivate</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
              <p className="text-gray-600 mt-1">Organize and manage product categories for farmers</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add Category</span>
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
                    +{stat.change}
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
                  placeholder="Search categories..."
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
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="products">Sort by Products</option>
                <option value="farmers">Sort by Farmers</option>
                <option value="sales">Sort by Sales</option>
                <option value="created">Sort by Date</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Layers size={20} />
                  <span>Categories ({sortedCategories.length})</span>
                </h2>
                {selectedCategories.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedCategories.length} categories selected
                  </span>
                )}
              </div>

              {selectedCategories.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Edit size={16} />
                    <span>Bulk Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <Archive size={16} />
                    <span>Archive Selected</span>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCategories.map((category) => (
                    <TableRow key={category.id} category={category} />
                  ))}
                </tbody>
              </table>
            </div>

            {sortedCategories.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Create First Category</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryManagement;