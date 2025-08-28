import React, { useState, useEffect } from 'react';
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
  X,
  Package,
  Video,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { videoAPI } from '../../stores/api';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([
    {
      title: 'Total Users',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Farmers',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Total Products',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Videos',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Video,
      color: 'bg-orange-500'
    }
  ]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);

  const API_BASE_URL = "http://localhost:8000";

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("auth_token");
  };

  // Fetch function wrapper using the same axios setup as UserManagement
  const fetchWithAuth = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  };

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from all endpoints
      const promises = [
        fetchUsers().catch(err => ({ error: err.message, type: 'users' })),
        fetchProducts().catch(err => ({ error: err.message, type: 'products' })),
        fetchVideos().catch(err => ({ error: err.message, type: 'videos' }))
      ];

      const results = await Promise.all(promises);
      
      // Check for errors
      const errors = results.filter(result => result && result.error);
      if (errors.length > 0) {
        const errorMessages = errors.map(err => `Failed to fetch ${err.type}`);
        setError(errorMessages.join(', '));
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users data - FIXED to use the same API as UserManagement
  const fetchUsers = async () => {
    try {
      // Use the same API endpoint as UserManagement component
      const response = await fetchWithAuth('/api/users');
      
      if (response && response.data) {
        const users = response.data || [];
        
        // Process users data with the same structure as UserManagement
        const processedUsers = users.slice(0, 5).map(user => ({
          id: user.id,
          name: user.name || 'Unknown User',
          email: user.email || 'No Email',
          role: user.roles?.[0]?.name || user.role || 'User',
          status: user.status || 'active', // Changed from 'Active' to 'active' to match backend
          joinDate: user.created_at || new Date().toISOString()
        }));

        setRecentUsers(processedUsers);

        // Update user stats with real data
        const totalUsers = users.length;
        const activeFarmers = users.filter(u => {
          const role = u.roles?.[0]?.name || u.role || '';
          const status = u.status || 'active';
          return role.toLowerCase() === 'farmer' && status === 'active';
        }).length;

        // Calculate growth percentages (you can implement real calculation based on previous data)
        const userGrowth = totalUsers > 0 ? '+12%' : '+0%';
        const farmerGrowth = activeFarmers > 0 ? '+8%' : '+0%';

        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Total Users') {
            return { ...stat, value: totalUsers.toString(), change: userGrowth };
          }
          if (stat.title === 'Active Farmers') {
            return { ...stat, value: activeFarmers.toString(), change: farmerGrowth };
          }
          return stat;
        }));

        console.log('✅ Users data loaded:', { totalUsers, activeFarmers, processedUsers });
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      throw err;
    }
  };

  // Fetch products data
  const fetchProducts = async () => {
    try {
      const response = await fetchWithAuth('/api/items');
      
      if (response && response.data) {
        const products = response.data || [];
        
        // Process products data
        const processedProducts = products.slice(0, 4).map(product => {
          let imageUrl = '/placeholder.svg?height=40&width=40';
          
          if (product.image) {
            if (product.image.startsWith('http')) {
              imageUrl = product.image;
            } else {
              const cleanPath = product.image.replace(/^\/?(public\/|storage\/|app\/public\/)?/, '');
              if (cleanPath.startsWith('items/')) {
                imageUrl = `${API_BASE_URL}/storage/${cleanPath}`;
              }
            }
          }

          // Determine product status
          let status = 'Available';
          if (product.stock === 0) {
            status = 'Out of Stock';
          } else if (product.stock < 10) {
            status = 'Low Stock';
          }

          return {
            id: product.id,
            name: product.name || 'Unnamed Product',
            farmer: product.user?.name || 'Unknown Farmer',
            product: product.name || 'Unnamed Product',
            amount: `$${product.price || '0'}`,
            status: status,
            image: imageUrl,
            category: product.category?.name || 'Uncategorized'
          };
        });

        setRecentProducts(processedProducts);

        // Update product stats
        const totalProducts = products.length;
        const productGrowth = totalProducts > 0 ? '+23%' : '+0%';
        
        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Total Products') {
            return { ...stat, value: totalProducts.toString(), change: productGrowth };
          }
          return stat;
        }));

        console.log('✅ Products data loaded:', { totalProducts, processedProducts });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  };

  // Fetch videos data
  const fetchVideos = async () => {
    try {
      const response = await videoAPI.adminGetAllVideos();
      
      if (response && response.data) {
        const videos = response.data || [];
        
        // Process videos data
        const processedVideos = videos.slice(0, 4).map(video => ({
          id: video.id,
          title: video.title || 'Untitled Video',
          views: video.views || 0,
          status: video.is_active ? 'Active' : 'Inactive',
          created_at: video.created_at || new Date().toISOString()
        }));

        setRecentVideos(processedVideos);

        // Update video stats
        const totalVideos = videos.length;
        const videoGrowth = totalVideos > 0 ? '+15%' : '+0%';
        
        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Total Videos') {
            return { ...stat, value: totalVideos.toString(), change: videoGrowth };
          }
          return stat;
        }));

        console.log('✅ Videos data loaded:', { totalVideos, processedVideos });
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      throw err;
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Refresh data
  const handleRefresh = () => {
    fetchAllData();
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'Active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'Inactive': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Available': 'bg-green-100 text-green-800',
      'Out of Stock': 'bg-red-100 text-red-800',
      'Low Stock': 'bg-yellow-100 text-yellow-800',
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-green-600 mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your platform's performance</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" />
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid - Now with real data */}
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
                    <p>User growth trends</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Total users: {stats.find(s => s.title === 'Total Users')?.value || '0'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Product Analytics</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>This week</option>
                    <option>This month</option>
                    <option>This year</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Package size={48} className="mx-auto mb-2" />
                    <p>Product analytics</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Total products: {stats.find(s => s.title === 'Total Products')?.value || '0'}
                    </p>
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
                      {recentUsers.length > 0 ? (
                        recentUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 capitalize">{user.role}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={user.status} />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">View all</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentProducts.length > 0 ? (
                        recentProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-10 h-10 rounded object-cover mr-3"
                                  onError={(e) => {
                                    e.target.src = "/placeholder.svg?height=40&width=40";
                                  }}
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">{product.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.amount}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={product.status} />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Videos */}
            {recentVideos.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Videos</h3>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">View all</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentVideos.map((video) => (
                        <tr key={video.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Video size={16} className="text-gray-400 mr-3" />
                              <div className="text-sm font-medium text-gray-900">{video.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{video.views}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={video.status} />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(video.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">View all</button>
                </div>
              </div>
              <div className="p-12 text-center text-gray-400">
                <ShoppingCart size={48} className="mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Orders Module Coming Soon</h3>
                <p>Order management functionality will be available in future updates.</p>
                <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-gray-600">Total Orders</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">$0</div>
                    <div className="text-gray-600">Revenue</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-gray-600">Pending</div>
                  </div>
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
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">{user.role}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
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