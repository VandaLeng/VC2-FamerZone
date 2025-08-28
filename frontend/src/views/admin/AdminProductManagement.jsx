import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, MoreVertical, Edit, Trash2, Eye, 
  Package, TrendingUp, AlertCircle, CheckCircle, Clock,
  Download, Upload, RefreshCw, Star, MapPin, User, Loader2,
  ExternalLink, Save, X, DollarSign
} from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterProvince, setFilterProvince] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const actionsMenuRef = useRef(null);

  const API_BASE_URL = "http://localhost:8000";

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    out_of_stock: { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    low_stock: { label: 'Low Stock', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
  };

  // Initialize current user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userData = localStorage.getItem("user_data");
    
    if (token && (userId || userData)) {
      let user = null;
      if (userData) {
        try {
          user = JSON.parse(userData);
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }
      
      setCurrentUser({
        id: userId || user?.id,
        name: userName || user?.name || "Admin",
        token: token,
        role: 'admin' // Admin role
      });
    }
  }, []);

  // Fetch all data when component mounts
  useEffect(() => {
    if (currentUser) {
      fetchAllData();
    }
  }, [refreshTrigger, currentUser]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchProvinces(),
        fetchUsers()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      const response = await axios.get(`${API_BASE_URL}/api/items`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      
      if (response.data.success) {
        // Process products to ensure proper image URLs and add status logic
        const processedProducts = response.data.data.map(product => {
          let imageUrl = null;
          if (product.image) {
            if (/^https?:\/\//.test(product.image) && product.image.includes('/items/')) {
              imageUrl = product.image;
            } else {
              let cleanPath = product.image.replace(/^\/?(public\/|storage\/|app\/public\/)?/, '');
              if (cleanPath.startsWith('items/')) {
                imageUrl = `${API_BASE_URL}/storage/${cleanPath}`;
              }
            }
          }
          if (!imageUrl) {
            imageUrl = '/placeholder.svg?height=40&width=40';
          }

          // Determine product status based on stock
          let status = product.status || 'active';
          if (product.stock === 0) {
            status = 'out_of_stock';
          } else if (product.stock < 10) {
            status = 'low_stock';
          }

          return {
            ...product,
            image: imageUrl,
            status: status,
            farmer: product.user?.name || 'Unknown Farmer',
            farmerLocation: product.province?.province_name || 'Unknown Location',
            category: product.category?.name || 'Uncategorized',
            rating: product.rating || (3.5 + Math.random() * 1.5),
            reviews: product.orders || Math.floor(Math.random() * 100),
            totalSold: product.orders || Math.floor(Math.random() * 200),
            lastUpdated: product.updated_at || product.created_at
          };
        });
        
        setProducts(processedProducts);
      }
    } catch (err) {
      console.error("Fetch Products Error:", err);
      toast.error("Failed to fetch products: " + (err.response?.data?.message || err.message));
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      const response = await axios.get(`${API_BASE_URL}/api/categories`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error("Fetch Categories Error:", err);
    }
  };

  const fetchProvinces = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      // You might need to create a provinces endpoint, for now using static data
      const provincesData = [
        { id: '01', province_name: 'Banteay Meanchey' },
        { id: '02', province_name: 'Battambang' },
        { id: '03', province_name: 'Kampong Cham' },
        { id: '04', province_name: 'Kampong Chhnang' },
        { id: '05', province_name: 'Kampong Speu' },
        { id: '06', province_name: 'Kampong Thom' },
        { id: '07', province_name: 'Kampot' },
        { id: '08', province_name: 'Kandal' },
        { id: '09', province_name: 'Koh Kong' },
        { id: '10', province_name: 'Kep' },
        { id: '11', province_name: 'Kratie' },
        { id: '12', province_name: 'Mondulkiri' },
        { id: '13', province_name: 'Phnom Penh' },
        { id: '14', province_name: 'Preah Vihear' },
        { id: '15', province_name: 'Prey Veng' },
        { id: '16', province_name: 'Pursat' },
        { id: '17', province_name: 'Ratanakiri' },
        { id: '18', province_name: 'Siem Reap' },
        { id: '19', province_name: 'Preah Sihanouk' },
        { id: '20', province_name: 'Stung Treng' },
        { id: '21', province_name: 'Svay Rieng' },
        { id: '22', province_name: 'Takeo' },
        { id: '23', province_name: 'Oddar Meanchey' },
        { id: '24', province_name: 'Pailin' },
        { id: '25', province_name: 'Tboung Khmum' }
      ];
      setProvinces(provincesData);
    } catch (err) {
      console.error("Fetch Provinces Error:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Fetch Users Error:", err);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmerLocation?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category_id?.toString() === filterCategory;
    const matchesProvince = filterProvince === 'all' || product.province_id === filterProvince;
    const matchesUser = filterUser === 'all' || product.user_id?.toString() === filterUser;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesProvince && matchesUser;
  }).sort((a, b) => new Date(b.created_at || b.lastUpdated) - new Date(a.created_at || a.lastUpdated));

  // Calculate statistics
  const stats = [
    { 
      title: 'Total Products', 
      value: products.length.toString(), 
      change: '+12%', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      icon: Package
    },
    { 
      title: 'Active Products', 
      value: products.filter(p => p.status === 'active').length.toString(), 
      change: '+5%', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      icon: CheckCircle
    },
    { 
      title: 'Pending Review', 
      value: products.filter(p => p.status === 'pending').length.toString(), 
      change: '+8%', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50',
      icon: Clock
    },
    { 
      title: 'Need Attention', 
      value: products.filter(p => p.status === 'out_of_stock' || p.status === 'low_stock').length.toString(), 
      change: '-15%', 
      color: 'text-red-600', 
      bgColor: 'bg-red-50',
      icon: AlertCircle
    }
  ];

  const toggleActionsMenu = (productId) => {
    setShowActionsMenu(showActionsMenu === productId ? null : productId);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
    setShowActionsMenu(null);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
    setShowActionsMenu(null);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
    setShowActionsMenu(null);
  };

  const handleApprove = async (product) => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      await axios.put(`${API_BASE_URL}/api/items/${product.id}`, 
        { status: 'active' },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, status: 'active' } : p));
      toast.success('Product approved successfully');
    } catch (err) {
      console.error("Approve Error:", err);
      toast.error("Failed to approve product");
    }
    setShowActionsMenu(null);
  };

  const handleReject = async (product) => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      await axios.put(`${API_BASE_URL}/api/items/${product.id}`, 
        { status: 'inactive' },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, status: 'inactive' } : p));
      toast.success('Product rejected');
    } catch (err) {
      console.error("Reject Error:", err);
      toast.error("Failed to reject product");
    }
    setShowActionsMenu(null);
  };

  const handleDeleteConfirm = async (productId) => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      
      const response = await axios.delete(`${API_BASE_URL}/api/items/${productId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        toast.success('Product deleted successfully');
      }
    } catch (err) {
      console.error("Delete Error:", err);
      if (err.response?.status !== 404) {
        toast.error("Failed to delete product: " + (err.response?.data?.message || err.message));
      }
    } finally {
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.info("Refreshing products...");
  };

  const handleImageError = (e, productName) => {
    console.error(`Failed to load image for product: ${productName}`);
    e.target.src = "/placeholder.svg?height=40&width=40";
  };

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setShowActionsMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Product Form Component
  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product?.name || "",
      category_id: product?.category_id ? String(product.category_id) : "",
      province_id: product?.province_id || "",
      price: product?.price || "",
      stock: product?.stock || "",
      unit: product?.unit || "piece",
      image: null,
      description: product?.description || "",
      user_id: product?.user_id || currentUser?.id || "",
      status: product?.status || "active"
    });

    const [imagePreview, setImagePreview] = useState(product?.image || null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error("Image size should be less than 2MB");
          return;
        }

        if (!file.type.startsWith('image/')) {
          toast.error("Please select a valid image file");
          return;
        }

        setFormData({ ...formData, image: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        toast.success("Image uploaded successfully");
      }
    };

    const validateForm = () => {
      const errors = {};
      
      if (!formData.name.trim()) errors.name = "Product name is required";
      if (!formData.category_id) errors.category_id = "Category is required";
      if (!formData.province_id) errors.province_id = "Province is required";
      if (!formData.price || formData.price <= 0) errors.price = "Valid price is required";
      if (!formData.stock || formData.stock < 0) errors.stock = "Valid stock quantity is required";
      if (!formData.unit) errors.unit = "Unit is required";
      if (!formData.user_id) errors.user_id = "User selection is required";

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        toast.error("Please correct the validation errors");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      const form = new FormData();
      form.append("name", formData.name.trim());
      form.append("category_id", formData.category_id);
      form.append("province_id", formData.province_id);
      form.append("price", parseFloat(formData.price));
      form.append("stock", parseInt(formData.stock));
      form.append("unit", formData.unit);
      form.append("description", formData.description.trim() || "");
      form.append("user_id", formData.user_id);
      form.append("status", formData.status);

      if (formData.image) {
        form.append("image", formData.image);
      }

      try {
        const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
        let response;
        
        if (product) {
          response = await axios.post(`${API_BASE_URL}/api/items/${product.id}?_method=PUT`, form, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          toast.success("Product updated successfully");
        }

        await fetchProducts();
        onSave();
        setRefreshTrigger(prev => prev + 1);
      } catch (err) {
        console.error("Product Submit Error:", err);
        if (err.response?.status === 422) {
          const errors = err.response.data.errors || {};
          setValidationErrors(errors);
          toast.error("Validation failed");
        } else {
          const message = err.response?.data?.message || err.message;
          toast.error("Error: " + message);
          setError(message);
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                Edit Product
              </h3>
              <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={28} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error:</span>
                </div>
                <p className="mt-1">{error}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="mx-auto h-40 w-40 object-cover rounded border"
                          onError={(e) => {
                            console.error('Failed to load image preview');
                            e.target.src = "/placeholder.svg?height=160&width=160";
                          }}
                        />
                        <p className="text-sm text-gray-600">
                          Current Image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-gray-600">Upload an image for the product</p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block mt-4"
                    >
                      {imagePreview ? "Change Image" : "Select File"}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // View Product Modal
  const ViewProductModal = ({ product, onClose, onEdit }) => {
    if (!product) return null;

    const getStatusBadge = (status) => {
      const config = statusConfig[status] || statusConfig.active;
      return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Product Details</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={28} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.image || "/placeholder.svg?height=300&width=300"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg border"
                  onError={(e) => handleImageError(e, product.name)}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-gray-600">{product.description || "No description available"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Price</span>
                    <p className="text-lg font-semibold text-green-600">${product.price}/{product.unit}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Stock</span>
                    <p className="text-lg font-semibold">{product.stock} {product.unit}s</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <div className="mt-1">{getStatusBadge(product.status)}</div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="text-base">{product.category}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Farmer</span>
                  <p className="text-base">{product.farmer}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Location</span>
                  <p className="text-base">{product.farmerLocation}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Rating</span>
                    <p className="text-base">{product.rating?.toFixed(1)} ⭐</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Total Sold</span>
                    <p className="text-base">{product.totalSold || 0}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Last Updated</span>
                  <p className="text-base">{new Date(product.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={20} />
                Edit Product
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmModal = ({ product, onConfirm, onCancel }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Delete Product</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "<strong>{product.name}</strong>"? This will permanently remove the product from the system.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => onConfirm(product.id)}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the admin dashboard</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Product Management</h1>
              <p className="text-gray-600 mt-1">Review, approve and manage all product listings</p>
              <p className="text-sm text-green-600 mt-1">Welcome back, {currentUser.name}!</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRefresh}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
                <span>Refresh</span>
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
                <stat.icon className={`${stat.color} w-6 h-6`} />
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
                  placeholder="Search products, farmers, locations..."
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
                <option value="pending">Pending Review</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="inactive">Inactive</option>
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

              <select
                value={filterProvince}
                onChange={(e) => setFilterProvince(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Provinces</option>
                {provinces.map(prov => (
                  <option key={prov.id} value={prov.id}>{prov.province_name}</option>
                ))}
              </select>

              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Farmers</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                      <img 
                        src={product.image || "/placeholder.svg?height=40&width=40"} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded" 
                        onError={(e) => handleImageError(e, product.name)}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">Rating: {product.rating?.toFixed(1)} ⭐ ({product.reviews} reviews)</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{product.farmer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{product.farmerLocation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price}/{product.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-gray-700'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[product.status]?.color || statusConfig.active.color}`}>
                        {statusConfig[product.status]?.label || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <div className="flex space-x-2" ref={showActionsMenu === product.id ? actionsMenuRef : null}>
                        <button
                          onClick={() => toggleActionsMenu(product.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                        >
                          <MoreVertical size={16} />
                        </button>
                        
                        {showActionsMenu === product.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <div className="py-1">
                              <button
                                onClick={() => handleView(product)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Eye size={14} />
                                View Details
                              </button>
                              <button
                                onClick={() => handleEdit(product)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Edit size={14} />
                                Edit Product
                              </button>
                              {product.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(product)}
                                    className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <CheckCircle size={14} />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleReject(product)}
                                    className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <AlertCircle size={14} />
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleDelete(product)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                              <a
                                href={`/products/${product.id}`}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                onClick={() => setShowActionsMenu(null)}
                              >
                                <ExternalLink size={14} />
                                View on Site
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500">
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p>No products found. Try adjusting your filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      {showEditModal && selectedProduct && (
        <ProductForm
          product={selectedProduct}
          onSave={() => { 
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
            setValidationErrors({});
            setError(null);
          }}
        />
      )}

      {showViewModal && selectedProduct && (
        <ViewProductModal
          product={selectedProduct}
          onEdit={handleEdit}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteConfirmModal
          product={selectedProduct}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminProductManagement;