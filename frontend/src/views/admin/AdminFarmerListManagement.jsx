import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, MapPin, Package, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Configure axios with base URL and auth headers
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
  }
});

const FarmerListManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch farmers from backend
  const fetchFarmers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users', {
        params: {
          search: searchTerm,
          role: 'farmer', // Filter for farmers
          page
        }
      });
      const fetchedFarmers = response.data.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || 'N/A',
        location: user.province?.province_name || 'N/A',
        joinDate: user.created_at,
        status: user.status || 'active', // Adjust based on backend status field
        totalProducts: user.totalProducts || 0, // Add to backend if needed
        totalSales: user.totalSales ? `$${user.totalSales}` : '$0', // Format as string
        rating: user.rating || 0,
        specialties: user.specialties || ['N/A'], // Add to backend if needed
        lastLogin: user.updated_at
      }));
      setFarmers(fetchedFarmers);
      setTotalPages(response.data.last_page);
      setCurrentPage(response.data.current_page);
    } catch (err) {
      setError('Failed to fetch farmers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch farmers on mount, search, or page change
  useEffect(() => {
    fetchFarmers(currentPage);
  }, [searchTerm, currentPage]);

  // Handle delete farmer
  const handleDelete = async (farmerId) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      try {
        await api.delete(`/users/${farmerId}`);
        setFarmers(farmers.filter(farmer => farmer.id !== farmerId));
        alert('Farmer deleted successfully');
      } catch (err) {
        setError('Failed to delete farmer.');
        console.error(err);
      }
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll('.relative');
      let shouldCloseAll = true;
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) shouldCloseAll = false;
      });
      if (shouldCloseAll) setDropdownStates({});
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter and sort farmers
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || farmer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'joinDate': return new Date(b.joinDate) - new Date(a.joinDate);
      case 'sales': return parseInt(b.totalSales.replace(/[$,]/g, '')) - parseInt(a.totalSales.replace(/[$,]/g, ''));
      case 'products': return b.totalProducts - a.totalProducts;
      default: return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

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
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Add Farmer</button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
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
        </div>

        {/* Table View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <svg className="animate-spin h-12 w-12 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500 mt-4">Loading farmers...</p>
              </div>
            ) : sortedFarmers.length === 0 ? (
              <div className="text-center py-12">
                <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No farmers found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Farmer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Products</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Sales</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Join Date</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedFarmers.map((farmer) => (
                    <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {farmer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {farmer.specialties.map((specialty, index) => (
                                <span key={index} className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">{specialty}</span>
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
                              <button className="w-full text-left p-2 text-gray-600 hover:bg-gray-100 rounded-t-md transition-colors flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                              </button>
                              <button className="w-full text-left p-2 text-gray-600 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(farmer.id)}
                                className="w-full text-left p-2 text-red-600 hover:bg-red-100 rounded-b-md transition-colors flex items-center space-x-2"
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
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center text-sm text-gray-600">
            Showing <span className="font-medium mx-1">{(currentPage - 1) * 10 + 1}</span> to{' '}
            <span className="font-medium mx-1">{Math.min(currentPage * 10, farmers.length)}</span> of{' '}
            <span className="font-medium mx-1">{farmers.length}</span> farmers
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
              {currentPage}
            </button>
            <button
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerListManagement;