import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Filter, X, Upload, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const actionsMenuRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    image: null,
  });

  const texts = {
    categoryManagement: 'ការគ្រប់គ្រងប្រភេទ',
    searchCategories: 'ស្វែងរកប្រភេទ...',
    addNewCategory: 'បន្ថែមប្រភេទថ្មី',
    filterByStatus: 'តម្រៀបតាមស្ថានភាព',
    allCategories: 'ប្រភេទទាំងអស់',
    activeCategories: 'ប្រភេទសកម្ម',
    inactiveCategories: 'ប្រភេទអសកម្ម',
    categoryName: 'ប្រភេទ',
    description: 'ការពិពណ៌នា',
    products: 'ផលិតផល',
    createdDate: 'ថ្ងៃបង្កើត',
    status: 'ស្ថានភាព',
    actions: 'សកម្មភាព',
    active: 'សកម្ម',
    inactive: 'អសកម្ម',
    view: 'មើល',
    edit: 'កែប្រែ',
    delete: 'លុប',
    addCategory: 'បន្ថែមប្រភេទ',
    editCategory: 'កែប្រែប្រភេទ',
    viewCategory: 'មើលប្រភេទ',
    categoryNameEn: 'ឈ្មោះប្រភេទ',
    descriptionEn: 'ការពិពណ៌នា',
    save: 'រក្សាទុក',
    cancel: 'បោះបង់',
    close: 'បិទ',
    confirmDelete: 'បញ្ជាក់ការលុប',
    deleteConfirmText: 'តើអ្នកប្រាកដជាចង់លុបប្រភេទនេះឬ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបាន។',
    confirmDeleteBtn: 'យល់ព្រម, លុប',
    cancelDelete: 'បោះបង់',
    noCategories: 'មិនមានប្រភេទទេ',
    categoryDeleted: 'បានលុបប្រភេទដោយជោគជ័យ',
    categorySaved: 'បានរក្សាប្រភេទដោយជោគជ័យ',
    image: 'រូបភាព',
    uploadImage: 'ផ្ទុករូបភាព',
    loading: 'កំពុងផ្ទុក...',
    nameRequired: 'ត្រូវការឈ្មោះប្រភេទ',
    loginFirst: 'សូមចូលគណនីជាមុនសិន',
    loginPrompt: 'អ្នកត្រូវតែចូលគណនីដើម្បីគ្រប់គ្រងប្រភេទ',
    loginButton: 'ទៅកាន់ការចូលគណនី',
    manageCategories: 'គ្រប់គ្រងប្រភេទផលិតផលរបស់អ្នក',
    totalCategories: 'ចំនួនប្រភេទសរុប',
    activeCount: 'សកម្ម',
    inactiveCount: 'អសកម្ម',
    refresh: 'ផ្ទុកឡើងវិញ',

  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  const CATEGORIES_ENDPOINT = `${API_BASE_URL}/categories`;

  // Check if user is logged in
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
        name: userName || user?.name || "User",
        token: token
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchCategories();
    }
  }, [currentUser]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(CATEGORIES_ENDPOINT);
      // Get all products/items for current user
      let myProducts = [];
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
        const itemsRes = await axios.get(`${API_BASE_URL.replace(/\/api$/, '')}/api/items`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        const userId = localStorage.getItem("user_id") || (localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")).id : null);
        myProducts = itemsRes.data.data.filter(item => String(item.user_id) === String(userId));
      } catch (e) {
        // If items fetch fails, fallback to zero counts
        myProducts = [];
      }
      const transformedCategories = response.data.data.map((category) => {
        // Count only current user's products for this category
        const count = myProducts.filter(item => String(item.category_id) === String(category.id)).length;
        return {
          id: category.id,
          name: category.name,
          description: category.description || '',
          productCount: count,
          createdAt: category.created_at,
          status: category.status,
          image_url: category.image_url,
        };
      });
      setCategories(transformedCategories);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch categories';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('AxiosError Details:', {
        message: err.message,
        code: err.code,
        response: err.response,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        status: category.status,
        image: null,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'active',
        image: null,
      });
    }
    setShowModal(true);
    setDropdownOpen(null);
    setError(null); // Clear error
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      description: '',
      status: 'active',
      image: null,
    });
    setError(null); // Clear error
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError(texts.nameRequired);
      toast.error(texts.nameRequired);
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('status', formData.status);

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      let response;
      if (modalMode === 'edit' && selectedCategory) {
        response = await axios.post(
          `${CATEGORIES_ENDPOINT}/${selectedCategory.id}?_method=PUT`,
          formDataToSend,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id
              ? {
                ...cat,
                name: response.data.data.name,
                description: response.data.data.description,
                status: response.data.data.status,
                image_url: response.data.data.image_url,
                productCount: response.data.data.productCount,
              }
              : cat
          )
        );
      } else if (modalMode === 'add') {
        response = await axios.post(CATEGORIES_ENDPOINT, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const newCategory = {
          id: response.data.data.id,
          name: response.data.data.name,
          description: response.data.data.description,
          productCount: response.data.data.productCount || 0,
          createdAt: response.data.data.created_at,
          status: response.data.data.status,
          image_url: response.data.data.image_url,
        };
        setCategories([newCategory, ...categories]);
      }

      handleCloseModal();
      setError(null);
      toast.success(texts.categorySaved);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save category';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Save Category Error:', {
        message: err.message,
        code: err.code,
        response: err.response,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
    setDropdownOpen(null);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${CATEGORIES_ENDPOINT}/${categoryToDelete.id}`);
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
      setError(null);
      toast.success(texts.categoryDeleted);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete category';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Delete Category Error:', {
        message: err.message,
        code: err.code,
        response: err.response,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      setFormData({ ...formData, image: file });
      toast.success("Image selected successfully");
    }
  };

  const toggleDropdown = (categoryId) => {
    setDropdownOpen(dropdownOpen === categoryId ? null : categoryId);
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleRefresh = () => {
    fetchCategories();
    toast.info("Refreshing categories...");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // If user is not logged in, show login prompt
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{texts.loginFirst}</h2>
          <p className="text-gray-600 mb-6">{texts.loginPrompt}</p>
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full"
          >
            {texts.loginButton}
          </button>
        </div>
      </div>
    );
  }

  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.status === 'active').length;
  const inactiveCategories = categories.filter(cat => cat.status === 'inactive').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            {error}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {texts.categoryManagement}
              </h1>
              <p className="text-gray-600">
                {texts.manageCategories}
              </p>
              {currentUser && (
                <p className="text-sm text-green-600 mt-1">សូមស្វាគមន៍ត្រឡប់មកវិញ, {currentUser.name}!</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Filter size={20} />}
                {texts.refresh}
              </button>
              <button
                onClick={() => handleOpenModal('add')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                {texts.addNewCategory}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.totalCategories}</p>
                <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Filter className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.activeCount}</p>
                <p className="text-2xl font-bold text-gray-800">{activeCategories}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.inactiveCount}</p>
                <p className="text-2xl font-bold text-gray-800">{inactiveCategories}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder={texts.searchCategories}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-6 py-3 pr-10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">{texts.allCategories}</option>
                <option value="active">{texts.activeCategories}</option>
                <option value="inactive">{texts.inactiveCategories}</option>
              </select>
              <Filter
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800">
                    {texts.categoryName}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800">
                    {texts.description}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800">
                    {texts.products}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800">
                    {texts.createdDate}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800">
                    {texts.status}
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-800">
                    {texts.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="animate-spin h-8 w-8 text-green-600" />
                        <span className="ml-2 text-gray-600">{texts.loading}</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {category.image_url ? (
                            <img
                              src={category.image_url || "/placeholder.svg"}
                              alt={category.name}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Filter className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div className="font-medium text-gray-800">
                            {category.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 line-clamp-2 max-w-xs">
                          {category.description || 'No description'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {category.productCount} {texts.products}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${category.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {category.status === 'active' ? texts.active : texts.inactive}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <button
                          onClick={() => toggleDropdown(category.id)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical size={18} className="text-gray-600" />
                        </button>
                        {dropdownOpen === category.id && (
                          <div
                            ref={actionsMenuRef}
                            className="absolute right-6 top-12 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                          >
                            <button
                              onClick={() => handleOpenModal('view', category)}
                              className="flex items-center gap-2 w-full px-4 py-3 text-green-600 hover:bg-green-50 transition-colors rounded-t-lg"
                            >
                              <Eye size={16} />
                              {texts.view}
                            </button>
                            <button
                              onClick={() => handleOpenModal('edit', category)}
                              className="flex items-center gap-2 w-full px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <Edit size={16} />
                              {texts.edit}
                            </button>
                            <button
                              onClick={() => handleDelete(category)}
                              className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition-colors rounded-b-lg"
                            >
                              <Trash2 size={16} />
                              {texts.delete}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">{texts.noCategories}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'add'
                  ? texts.addCategory
                  : modalMode === 'edit'
                    ? texts.editCategory
                    : texts.viewCategory}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium text-gray-800 mb-2">
                    {texts.categoryNameEn}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-2">
                    {texts.descriptionEn}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={modalMode === 'view'}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100 resize-none"
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-2">
                    {texts.image}
                  </label>
                  {modalMode !== 'view' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">{texts.uploadImage}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
                      >
                        Select File
                      </label>
                    </div>
                  )}
                  {selectedCategory?.image_url && (
                    <img
                      src={selectedCategory.image_url || "/placeholder.svg"}
                      alt={selectedCategory.name}
                      className="w-40 h-40 object-cover rounded-lg mt-2 border border-gray-200"
                    />
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-2">
                    {texts.status}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-100"
                  >
                    <option value="active">{texts.active}</option>
                    <option value="inactive">{texts.inactive}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {modalMode === 'view' ? texts.close : texts.cancel}
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {texts.loading}
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {texts.save}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {texts.confirmDelete}
              </h3>
              <p className="text-gray-600 mb-6">{texts.deleteConfirmText}</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {texts.cancelDelete}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {texts.loading}
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      {texts.confirmDeleteBtn}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;