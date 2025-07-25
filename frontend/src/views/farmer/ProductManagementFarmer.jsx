import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Search, Filter, Edit, Trash2, Eye, Package, MapPin, Calendar, DollarSign, X, Upload, Save, AlertCircle,  Plus, Star } from 'lucide-react';

const ProductManagement = ({ currentLanguage = 'en', setCurrentLanguage }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      nameKh: "ប៉េងប៉ោះធម្មជាតិ",
      category: "Vegetables",
      categoryKh: "បន្លែ",
      price: 4.99,
      stock: 150,
      unit: "lb",
      unitKh: "ផោន",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop",
      status: "active",
      orders: 23,
      createdAt: "2024-12-15"
    },
    {
      id: 2,
      name: "Fresh Carrots",
      nameKh: "ការ៉ុតស្រស់",
      category: "Vegetables",
      categoryKh: "បន្លែ",
      price: 2.49,
      stock: 89,
      unit: "lb",
      unitKh: "ផោន",
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=200&fit=crop",
      status: "active",
      orders: 18,
      createdAt: "2024-12-10"
    },
    {
      id: 3,
      name: "Farm Fresh Eggs",
      nameKh: "ស៊ុតស្រស់ពីកសិដ្ឋាន",
      category: "Dairy & Eggs",
      categoryKh: "ទឹកដោះគោ និង ស៊ុត",
      price: 6.99,
      stock: 0,
      unit: "dozen",
      unitKh: "ឌូស៊ិន",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=200&fit=crop",
      status: "out_of_stock",
      orders: 45,
      createdAt: "2024-12-08"
    }
  ]);

  const [categories] = useState([
    { id: 1, name: "Vegetables", nameKh: "បន្លែ" },
    { id: 2, name: "Fruits", nameKh: "ផ្លែឈើ" },
    { id: 3, name: "Dairy & Eggs", nameKh: "ទឹកដោះគោ និង ស៊ុត" },
    { id: 4, name: "Grains", nameKh: "គ្រាប់ធញ្ញជាតិ" },
    { id: 5, name: "Herbs", nameKh: "ឱសថបុរាណ" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const actionsMenuRef = useRef(null);

  const texts = {
    kh: {
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
      productName: 'ឈ្មោះផលិតផល',
      productNameKh: 'ឈ្មោះជាភាសាខ្មែរ',
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
      piece: 'កុំព្យូទ័រ',
      dozen: 'ឌូស៊ិន',
      liter: 'លីត្រ'
    },
    en: {
      productManagement: 'Product Management',
      manageProducts: 'Manage your farm products',
      addNewProduct: 'Add New Product',
      totalProducts: 'Total Products',
      activeProducts: 'Active Products',
      outOfStock: 'Out of Stock',
      totalRevenue: 'Total Revenue',
      product: 'Product',
      category: 'Category',
      price: 'Price',
      stock: 'Stock',
      status: 'Status',
      orders: 'Orders',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      searchProducts: 'Search products...',
      filterByCategory: 'Filter by Category',
      filterByStatus: 'Filter by Status',
      allCategories: 'All Categories',
      allStatus: 'All Status',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      productName: 'Product Name',
      productNameKh: 'Product Name (Khmer)',
      selectCategory: 'Select Category',
      pricePerUnit: 'Price per Unit',
      stockQuantity: 'Stock Quantity',
      unit: 'Unit',
      productImage: 'Product Image',
      uploadImage: 'Upload Image',
      noProducts: 'No products found',
      deleteConfirm: 'Are you sure you want to delete this product?',
      productAdded: 'Product added successfully',
      productUpdated: 'Product updated successfully',
      productDeleted: 'Product deleted successfully',
      kg: 'Kilogram',
      lb: 'Pound',
      piece: 'Piece',
      dozen: 'Dozen',
      liter: 'Liter'
    }
  };

  const currentTexts = texts[currentLanguage];

  const filteredProducts = products.filter(product => {
    const matchesSearch = currentLanguage === 'kh' 
      ? product.nameKh.toLowerCase().includes(searchTerm.toLowerCase())
      : product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setShowActionsMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      nameKh: product?.nameKh || '',
      category: product?.category || '',
      price: product?.price || '',
      stock: product?.stock || '',
      unit: product?.unit || 'lb',
      image: product?.image || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-2 rounded-t-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#333333]">
                {product ? currentTexts.edit : currentTexts.addNewProduct}
              </h3>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {currentTexts.productName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {currentTexts.productNameKh}
                </label>
                <input
                  type="text"
                  value={formData.nameKh}
                  onChange={(e) => setFormData({...formData, nameKh: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                {currentTexts.selectCategory}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                required
              >
                <option value="">{currentTexts.selectCategory}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {currentLanguage === 'kh' ? cat.nameKh : cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {currentTexts.pricePerUnit}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {currentTexts.stockQuantity}
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  {currentTexts.unit}
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors"
                >
                  <option value="kg">{currentTexts.kg}</option>
                  <option value="lb">{currentTexts.lb}</option>
                  <option value="piece">{currentTexts.piece}</option>
                  <option value="dozen">{currentTexts.dozen}</option>
                  <option value="liter">{currentTexts.liter}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                {currentTexts.productImage}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#228B22] transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">{currentTexts.uploadImage}</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-[#228B22] text-white px-4 py-2 rounded-lg hover:bg-[#2D5016] transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#228B22] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2D5016] transition-colors flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {currentTexts.save}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                {currentTexts.cancel}
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">
                {currentTexts.productManagement}
              </h1>
              <p className="text-[#8B4513] text-sm md:text-base">
                {currentTexts.manageProducts}
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#228B22] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2D5016] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus size={20} />
              {currentTexts.addNewProduct}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8B4513] text-sm font-medium mb-1">
                  {currentTexts.totalProducts}
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
                  {currentTexts.activeProducts}
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
                  {currentTexts.outOfStock}
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
                  {currentTexts.totalRevenue}
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
                  placeholder={currentTexts.searchProducts}
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
                <option value="">{currentTexts.allCategories}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {currentLanguage === 'kh' ? cat.nameKh : cat.name}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-colors min-w-48"
              >
                <option value="">{currentTexts.allStatus}</option>
                <option value="active">{currentTexts.active}</option>
                <option value="out_of_stock">{currentTexts.outOfStock}</option>
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
                    {currentTexts.product}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {currentTexts.category}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {currentTexts.price}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {currentTexts.stock}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {currentTexts.status}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-[#333333]">
                    {currentTexts.orders}
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-[#333333]">
                    {currentTexts.actions}
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
                            src={product.image}
                            alt={currentLanguage === 'kh' ? product.nameKh : product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-[#333333]">
                              {currentLanguage === 'kh' ? product.nameKh : product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#333333]">
                        {currentLanguage === 'kh' 
                          ? categories.find(c => c.name === product.category)?.nameKh || product.category
                          : product.category}
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#333333]">
                        ${product.price}/{currentLanguage === 'kh' ? product.unitKh : product.unit}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} {currentLanguage === 'kh' ? product.unitKh : product.unit}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          product.status === 'active' 
                            ? 'bg-[#228B22] bg-opacity-10 text-[#228B22]' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? currentTexts.active : currentTexts.outOfStock}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-[#333333]">
                          {product.orders} {currentTexts.orders}
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
                              {currentTexts.view}
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
                              {currentTexts.edit}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(currentTexts.deleteConfirm)) {
                                  setProducts(products.filter(p => p.id !== product.id));
                                  setShowActionsMenu(null);
                                }
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} />
                              {currentTexts.delete}
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
                          {currentTexts.noProducts}
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
                Showing {filteredProducts.length} of {totalProducts} products
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-[#333333] border border-gray-300 rounded-lg hover:bg-[#F5F5DC] transition-colors">
                  Previous
                </button>
                <span className="px-4 py-2 bg-[#228B22] text-white rounded-lg font-medium">
                  1
                </span>
                <button className="px-4 py-2 text-[#333333] border border-gray-300 rounded-lg hover:bg-[#F5F5DC] transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <ProductForm
          onSave={(formData) => {
            const newProduct = {
              ...formData,
              id: Date.now(),
              status: 'active',
              orders: 0,
              createdAt: new Date().toISOString().split('T')[0]
            };
            setProducts([...products, newProduct]);
            setShowAddModal(false);
          }}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && selectedProduct && (
        <ProductForm
          product={selectedProduct}
          onSave={(formData) => {
            setProducts(products.map(p => 
              p.id === selectedProduct.id 
                ? { ...selectedProduct, ...formData }
                : p
            ));
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