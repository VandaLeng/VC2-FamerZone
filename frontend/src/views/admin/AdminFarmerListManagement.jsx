import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, MapPin, Phone, Mail, Calendar, Package, TrendingUp, AlertCircle, CheckCircle, Clock, Download } from 'lucide-react';

const FarmerListManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [dropdownStates, setDropdownStates] = useState({}); // Object to track dropdown states per farmer ID

  // Mock data for farmers
  const farmers = [
    {
      id: 1,
      name: 'Sophea Chen',
      email: 'sophea.chen@email.com',
      phone: '+855 12 345 678',
      location: 'Battambang Province',
      joinDate: '2024-01-15',
      status: 'active',
      totalProducts: 24,
      totalSales: '$2,450',
      rating: 4.8,
      avatar: null,
      specialties: ['Rice', 'Vegetables'],
      lastLogin: '2024-08-20'
    },
    {
      id: 2,
      name: 'Virak Phan',
      email: 'virak.phan@email.com',
      phone: '+855 17 456 789',
      location: 'Siem Reap Province',
      joinDate: '2024-02-20',
      status: 'active',
      totalProducts: 18,
      totalSales: '$1,890',
      rating: 4.6,
      avatar: null,
      specialties: ['Fruits', 'Herbs'],
      lastLogin: '2024-08-22'
    },
    {
      id: 3,
      name: 'Dara Kong',
      email: 'dara.kong@email.com',
      phone: '+855 96 789 012',
      location: 'Kampong Cham Province',
      joinDate: '2024-03-10',
      status: 'pending',
      totalProducts: 12,
      totalSales: '$980',
      rating: 4.3,
      avatar: null,
      specialties: ['Livestock', 'Dairy'],
      lastLogin: '2024-08-19'
    },
    {
      id: 4,
      name: 'Sreynich Lim',
      email: 'sreynich.lim@email.com',
      phone: '+855 78 234 567',
      location: 'Kandal Province',
      joinDate: '2024-04-05',
      status: 'inactive',
      totalProducts: 8,
      totalSales: '$650',
      rating: 4.1,
      avatar: null,
      specialties: ['Vegetables', 'Spices'],
      lastLogin: '2024-08-15'
    },
    {
      id: 5,
      name: 'Pisach Mao',
      email: 'pisach.mao@email.com',
      phone: '+855 89 345 678',
      location: 'Takeo Province',
      joinDate: '2024-05-12',
      status: 'active',
      totalProducts: 31,
      totalSales: '$3,120',
      rating: 4.9,
      avatar: null,
      specialties: ['Rice', 'Fruits', 'Vegetables'],
      lastLogin: '2024-08-23'
    },
    {
      id: 6,
      name: 'Chenda Sok',
      email: 'chenda.sok@email.com',
      phone: '+855 11 567 890',
      location: 'Prey Veng Province',
      joinDate: '2024-06-18',
      status: 'active',
      totalProducts: 15,
      totalSales: '$1,340',
      rating: 4.4,
      avatar: null,
      specialties: ['Fish', 'Aquaculture'],
      lastLogin: '2024-08-21'
    }
  ];

  // Filter and search logic
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || farmer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort logic
  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'joinDate':
        return new Date(b.joinDate) - new Date(a.joinDate);
      case 'sales':
        return parseInt(b.totalSales.replace(/[$,]/g, '')) - parseInt(a.totalSales.replace(/[$,]/g, ''));
      case 'products':
        return b.totalProducts - a.totalProducts;
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSelectFarmer = (farmerId) => {
    setSelectedFarmers(prev => 
      prev.includes(farmerId) 
        ? prev.filter(id => id !== farmerId)
        : [...prev, farmerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedFarmers(
      selectedFarmers.length === sortedFarmers.length 
        ? [] 
        : sortedFarmers.map(farmer => farmer.id)
    );
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll('.relative');
      let shouldCloseAll = true;
      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
          shouldCloseAll = false;
        }
      });
      if (shouldCloseAll) {
        setDropdownStates({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Farmer Management</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all registered farmers on FramerZone</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Add Farmer
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-2xl font-bold text-gray-900">{farmers.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Farmers</p>
                  <p className="text-2xl font-bold text-green-600">{farmers.filter(f => f.status === 'active').length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{farmers.filter(f => f.status === 'pending').length}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-purple-600">$10,430</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search farmers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Sort By */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="joinDate">Sort by Join Date</option>
                <option value="sales">Sort by Sales</option>
                <option value="products">Sort by Products</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              {selectedFarmers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{selectedFarmers.length} selected</span>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm">
                    Delete Selected
                  </button>
                </div>
              )}
              
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    viewMode === 'table' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Farmers List */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFarmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      checked={selectedFarmers.includes(farmer.id)}
                      onChange={() => handleSelectFarmer(farmer.id)}
                    />
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {farmer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(farmer.status)}`}>
                      {getStatusIcon(farmer.status)}
                      <span className="capitalize">{farmer.status}</span>
                    </span>
                    <div className="relative">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{farmer.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {farmer.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3">
                    <div>
                      <p className="text-sm text-gray-600">Products</p>
                      <p className="text-lg font-semibold text-gray-900">{farmer.totalProducts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sales</p>
                      <p className="text-lg font-semibold text-gray-900">{farmer.totalSales}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map((star) => (
                          <span key={star} className={star <= farmer.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({farmer.rating})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        checked={selectedFarmers.length === sortedFarmers.length && sortedFarmers.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Farmer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Products</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Sales</th>
                    {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Rating</th> */}
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Join Date</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedFarmers.map((farmer) => (
                    <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={() => handleSelectFarmer(farmer.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {farmer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {farmer.specialties.map((specialty, index) => (
                                <span key={index} className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{farmer.email}</div>
                        <div className="text-sm text-gray-600">{farmer.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-900">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{farmer.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(farmer.status)}`}>
                          {getStatusIcon(farmer.status)}
                          <span className="capitalize">{farmer.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{farmer.totalProducts}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{farmer.totalSales}</div>
                      </td>
                      {/* <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <div className="flex text-yellow-400">
                            {[1,2,3,4,5].map((star) => (
                              <span key={star} className={`text-xs ${star <= farmer.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({farmer.rating})</span>
                        </div>
                      </td> */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{farmer.joinDate}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative">
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownStates(prev => ({ ...prev, [farmer.id]: !prev[farmer.id] }));
                            }}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {dropdownStates[farmer.id] && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <button
                                className="w-full text-left p-2 text-gray-600 hover:bg-gray-100 rounded-t-md transition-colors flex items-center space-x-2"
                                onClick={() => {
                                  // Handle View action
                                  setDropdownStates(prev => ({ ...prev, [farmer.id]: false }));
                                }}
                              >
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                              </button>
                              <button
                                className="w-full text-left p-2 text-gray-600 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                                onClick={() => {
                                  // Handle Edit action
                                  setDropdownStates(prev => ({ ...prev, [farmer.id]: false }));
                                }}
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <button
                                className="w-full text-left p-2 text-red-600 hover:bg-red-100 rounded-b-md transition-colors flex items-center space-x-2"
                                onClick={() => {
                                  // Handle Delete action
                                  setDropdownStates(prev => ({ ...prev, [farmer.id]: false }));
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center text-sm text-gray-600">
            Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">{sortedFarmers.length}</span> of <span className="font-medium mx-1">{farmers.length}</span> farmers
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerListManagement;