import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MoreVertical, Search, Edit, Trash2, Eye, Package, DollarSign, X, Upload, Save, AlertCircle, Plus, Star } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const actionsMenuRef = useRef(null);

  const texts = {
    productManagement: 'ការគ្រប់គ្រងផលិតផល',
    manageProducts: 'គ្រប់គ្រងផលិតផលរបស់អ្នក',
    addNewProduct: 'បន្ថែមផលិតផលថ្មី',
    totalProducts: 'ផលិតផលសរុប',
    activeProducts: 'ផលិតផលសកម្ម',
    outOfStock: 'អស់ស្តុក',
    totalRevenue: 'ចំណូលសរុប',
    product: 'ផលិតផល',
    category: 'ប្រភេទ',
    price: 'តម្លៃ',
    stock: 'ស្តុក',
    status: 'ស្ថានភាព',
    orders: 'ការបញ្ជាទិញ',
    actions: 'សកម្មភាព',
    active: 'សកម្ម',
    inactive: 'អសកម្ម',
    searchProducts: 'ស្វែងរកផលិតផល...',
    filterByCategory: 'តម្រងតាមប្រភេទ',
    filterByStatus: 'តម្រងតាមស្ថានភាព',
    allCategories: 'ប្រភេទទាំងអស់',
    allStatus: 'ស្ថានភាពទាំងអស់',
    view: 'មើល',
    edit: 'កែសម្រួល',
    delete: 'លុប',
    save: 'រក្សាទុក',
    cancel: 'បោះបង់',
    productNameKh: 'ឈ្មោះផលិតផល',
    selectCategory: 'ជ្រើសរើសប្រភេទ',
    pricePerUnit: 'តម្លៃក្នុងមួយឯកតា',
    stockQuantity: 'បរិមាណស្តុក',
    unit: 'ឯកតា',
    productImage: 'រូបភាពផលិតផល',
    uploadImage: 'ផ្ទុករូបភាព',
    noProducts: 'មិនមានផលិតផលទេ',
    deleteConfirm: 'តើអ្នកពិតជាចង់លុបផលិតផលនេះមែនទេ?',
    productAdded: 'បានបន្ថែមផលិតផលដោយជោគជ័យ',
    productUpdated: 'បានកែប្រែផលិតផលដោយជោគជ័យ',
    productDeleted: 'បានលុបផលិតផលដោយជោគជ័យ',
    kg: 'គីឡូក្រាម',
    lb: 'ផោន',
    piece: 'ដុំ',
    dozen: 'ឌូស៊ិន',
    liter: 'លីត្រ',
    error: 'មានបញ្ហាកើតឡើង៖ ',
    validationError: 'សូមពិនិត្យមើលកំហុសនៅក្នុងទម្រង់៖'
  };

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/categories`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        });
        if (response.data.success) {
          const categoriesData = response.data.data.map(category => ({
            id: category.id,
            name: category.name.en || '',
            nameKh: category.name.kh || '',
            image_url: category.image_url || null,
            productCount: category.productCount || 0
          }));
          setCategories(categoriesData);
        } else {
          setError(texts.error + 'Failed to fetch categories');
          console.error('API Error:', response.data.message);
        }
      } catch (err) {
        setError(texts.error + (err.response?.data?.message || err.message));
        console.error('Fetch Categories Error:', err);
      }
    };

    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/items`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        });
        if (response.data.success) {
          const productsData = response.data.data.map(item => ({
            id: item.id,
            name: item.name || '',
            name_kh: item.name_kh || '',
            category_id: item.category_id,
            category: categories.find(cat => cat.id === item.category_id) || { name: '', nameKh: '' },
            price: item.price || 0,
            stock: item.stock || 0,
            unit: item.unit || 'piece',
            unit_kh: item.unit_kh || texts.piece,
            image: item.image || '',
            status: item.status || 'active',
            orders: item.orders || 0
          }));
          setProducts(productsData);
        } else {
          setError(texts.error + 'Failed to fetch items');
          console.error('API Error:', response.data.message);
        }
      } catch (err) {
        setError(texts.error + (err.response?.data?.message || err.message));
        console.error('Fetch Items Error:', err);
      }
    };

    fetchCategories();
    fetchItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setShowActionsMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name_kh?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category?.nameKh === filterCategory;
    const matchesStatus = filterStatus === '' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.orders), 0);

  const toggleActionsMenu = (productId) => {
    setShowActionsMenu(showActionsMenu === productId ? null : productId);
  };

  const handleDelete = async (productId) => {
    if (window.confirm(texts.deleteConfirm)) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_BASE_URL}/api/items/${productId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        });
        if (response.data.success) {
          setProducts(products.filter(p => p.id !== productId));
          setShowActionsMenu(null);
          alert(texts.productDeleted);
        } else {
          setError(texts.error + 'Failed to delete product');
          console.error('Delete Error:', response.data.message);
        }
      } catch (err) {
        setError(texts.error + (err.response?.data?.message || err.message));
        console.error('Delete Error:', err);
      }
    }
  };

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name_kh: product?.name_kh || '',
      category_id: product?.category_id ? String(product.category_id) : '',
      price: product?.price || '',
      stock: product?.stock || '',
      unit: product?.unit || 'piece',
      unit_kh: product?.unit_kh || texts.piece,
      image: null
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      setValidationErrors({});
      setError(null);

      const form = new FormData();
      form.append('name_kh', formData.name_kh);
      form.append('name', formData.name_kh); // Map name_kh to name for backend compatibility
      form.append('category_id', formData.category_id);
      form.append('price', formData.price);
      form.append('stock', formData.stock);
      form.append('unit', formData.unit);
      form.append('unit_kh', formData.unit_kh);
      if (formData.image) {
        form.append('image', formData.image);
      }

      if (product) {
        form.append('_method', 'PUT');
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          product ? `${API_BASE_URL}/api/items/${product.id}` : `${API_BASE_URL}/api/items`,
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token ? `Bearer ${token}` : undefined
            }
          }
        );

        if (response.data.success) {
          const updatedItems = await axios.get(`${API_BASE_URL}/api/items`, {
            headers: { Authorization: token ? `Bearer ${token}` : undefined }
          });
          const productsData = updatedItems.data.data.map(item => ({
            id: item.id,
            name: item.name || '',
            name_kh: item.name_kh || '',
            category_id: item.category_id,
            category: categories.find(cat => cat.id === item.category_id) || { name: '', nameKh: '' },
            price: item.price || 0,
            stock: item.stock || 0,
            unit: item.unit || 'piece',
            unit_kh: item.unit_kh || texts.piece,
            image: item.image || '',
            status: item.status || 'active',
            orders: item.orders || 0
          }));
          setProducts(productsData);
          onSave();
          alert(product ? texts.productUpdated : texts.productAdded);
        } else {
          setError(texts.error + 'Failed to save product');
          console.error('Save Error:', response.data.message);
        }
      } catch (err) {
        if (err.response?.status === 422) {
          setValidationErrors(err.response.data.errors || {});
          setError(texts.validationError);
        } else {
          setError(texts.error + (err.response?.data?.message || err.message));
        }
        console.error('Save Error:', err);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-2 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#333333]">
                {product ? texts.edit : texts.addNewProduct}
              </h3>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
                {Object.keys(validationErrors).length > 0 && (
                  <ul className="list-disc ml-5 mt-2">
                    {Object.values(validationErrors).flat().map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                {texts.productNameKh}
              </label>
              <input
                type="text"
                value={formData.name_kh}
                onChange={(e) => setFormData({...formData, name_kh: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors ${
                  validationErrors.name_kh ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                {texts.selectCategory}
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors ${
                  validationErrors.category_id ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">{texts.selectCategory}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameKh}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {texts.pricePerUnit}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors ${
                    validationErrors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {texts.stockQuantity}
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors ${
                    validationErrors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {texts.unit}
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({
                    ...formData,
                    unit: e.target.value,
                    unit_kh: e.target.value === 'piece' ? texts.piece : texts[e.target.value]
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors ${
                    validationErrors.unit ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="kg">{texts.kg}</option>
                  <option value="lb">{texts.lb}</option>
                  <option value="piece">{texts.piece}</option>
                  <option value="dozen">{texts.dozen}</option>
                  <option value="liter">{texts.liter}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                {texts.productImage}
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#228B22] transition-colors ${
                validationErrors.image ? 'border-red-500' : 'border-gray-300'
              }`}>
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">{texts.uploadImage}</p>
                {product?.image && (
                  <img src={product.image} alt="Current product" className="mx-auto h-24 object-cover mb-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-[#228B22] text-white px-4 py-2 rounded-lg hover:bg-[#2D5016] transition-colors"
                >
                  ជ្រើសរើសឯកសារ
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#228B22] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2D5016] transition-colors flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {texts.save}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                {texts.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-2">
      <div className="max-w-7xl mx-auto">
        {error && !validationErrors.length && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">
                {texts.productManagement}
              </h1>
              <p className="text-[#8B4513] text-sm md:text-base">
                {texts.manageProducts}
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#228B22] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2D5016] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus size={20} />
              {texts.addNewProduct}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8B4513] text-sm font-medium mb-1">
                  {texts.totalProducts}
                </p>
                <p className="text-2xl font-bold text-[#333333]">{totalProducts}</p>
              </div>
              <div className="bg-[#228B22] bg-opacity-10 p-3 rounded-full">
                <Package className="h-6 w-6 text-[#228B22]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8B4513] text-sm font-medium mb-1">
                  {texts.activeProducts}
                </p>
                <p className="text-2xl font-bold text-[#333333]">{activeProducts}</p>
              </div>
              <div className="bg-[#FFD700] bg-opacity-20 p-3 rounded-full">
                <Star className="h-6 w-6 text-[#FFD700]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8B4513] text-sm font-medium mb-1">
                  {texts.outOfStock}
                </p>
                <p className="text-2xl font-bold text-[#333333]">{outOfStockProducts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8B4513] text-sm font-medium mb-1">
                  {texts.totalRevenue}
                </p>
                <p className="text-2xl font-bold text-[#333333]">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-[#FFD700] bg-opacity-20 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-[#FFD700]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={texts.searchProducts}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors min-w-48"
              >
                <option value="">{texts.allCategories}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.nameKh}>
                    {cat.nameKh}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors min-w-48"
              >
                <option value="">{texts.allStatus}</option>
                <option value="active">{texts.active}</option>
                <option value="out_of_stock">{texts.outOfStock}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#EAF8E7] border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {texts.product}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {texts.category}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {texts.price}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {texts.stock}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {texts.status}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {texts.orders}
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-[#333333]">
                    {texts.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-[#F5F5DC] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image || 'https://via.placeholder.com/300x200'}
                            alt={product.name_kh}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-[#333333]">
                              {product.name_kh}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#333333]">
                        {product.category?.nameKh}
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#333333]">
                        ${product.price}/{product.unit_kh}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} {product.unit_kh}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          product.status === 'active' 
                            ? 'bg-[#228B22] bg-opacity-10 text-[#228B22]' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? texts.active : texts.outOfStock}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-[#333333]">
                          {product.orders} {texts.orders}
                        </span>
                      </td>
                      <td className="py-4 px-6 relative">
                        <button
                          onClick={() => toggleActionsMenu(product.id)}
                          className="p-2 text-[#333333] hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {showActionsMenu === product.id && (
                          <div ref={actionsMenuRef} className="absolute right-6 top-12 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <button
                              onClick={() => {
                                setShowActionsMenu(null);
                                // View product logic
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#228B22] hover:bg-[#228B22] hover:bg-opacity-10 transition-colors"
                            >
                              <Eye size={16} />
                              {texts.view}
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowEditModal(true);
                                setShowActionsMenu(null);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#FFD700] hover:bg-[#FFD700] hover:bg-opacity-20 transition-colors"
                            >
                              <Edit size={16} />
                              {texts.edit}
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
                    <td colSpan="7" className="py-12 px-6 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Package className="h-16 w-16 text-gray-300" />
                        <p className="text-[#8B4513] text-lg font-medium">
                          {texts.noProducts}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#8B4513]">
                បង្ហាញ {filteredProducts.length} នៃ {totalProducts} ផលិតផល
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-[#333333] border border-gray-300 rounded-lg hover:bg-[#F5F5DC] transition-colors">
                  មុន
                </button>
                <span className="px-4 py-2 bg-[#228B22] text-white rounded-lg font-medium">
                  1
                </span>
                <button className="px-4 py-2 text-[#333333] border border-gray-300 rounded-lg hover:bg-[#F5F5DC] transition-colors">
                  បន្ទាប់
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <ProductForm
          onSave={() => setShowAddModal(false)}
          onCancel={() => setShowAddModal(false)}
        />
      )}

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
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;