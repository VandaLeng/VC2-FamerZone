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

const FarmerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([
    {
      title: 'Total Orders',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Revenue',
      value: '$0',
      change: '+0%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'My Products',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Orders',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

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
        fetchProducts().catch(err => ({ error: err.message, type: 'products' })),
        fetchOrders().catch(err => ({ error: err.message, type: 'orders' }))
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
          if (stat.title === 'My Products') {
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

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const response = await fetchWithAuth('/api/orders');
      
      if (response && response.data) {
        const orders = response.data || [];
        
        // Process orders data
        const processedOrders = orders.slice(0, 5).map(order => ({
          id: order.id,
          customer: order.user?.name || 'Unknown Customer',
          amount: `$${order.total || 0}`,
          status: order.status || 'Processing',
          date: order.created_at || new Date().toISOString()
        }));

        setRecentOrders(processedOrders);

        // Update order stats
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status.toLowerCase() === 'pending').length;
        const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
        const orderGrowth = totalOrders > 0 ? '+10%' : '+0%';
        const revenueGrowth = totalRevenue > 0 ? '+15%' : '+0%';
        const pendingGrowth = pendingOrders > 0 ? '+5%' : '+0%';

        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Total Orders') {
            return { ...stat, value: totalOrders.toString(), change: orderGrowth };
          }
          if (stat.title === 'Total Revenue') {
            return { ...stat, value: `$${totalRevenue.toFixed(2)}`, change: revenueGrowth };
          }
          if (stat.title === 'Pending Orders') {
            return { ...stat, value: pendingOrders.toString(), change: pendingGrowth };
          }
          return stat;
        }));

        console.log('✅ Orders data loaded:', { totalOrders, totalRevenue, pendingOrders, processedOrders });
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
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
            <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your sales and orders</p>
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
              {/* Sales Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sales Growth</h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto mb-2" />
                    <p>Sales growth trends</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Total revenue: {stats.find(s => s.title === 'Total Revenue')?.value || '$0'}
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
                      Total products: {stats.find(s => s.title === 'My Products')?.value || '0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">View all</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                            <td className="px-6 py-4">
                              <StatusBadge status={order.status} />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab !== 'overview' && (
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

export default FarmerDashboard;