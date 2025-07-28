import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Filter, X } from 'lucide-react';

const CategoryManagement = ({ currentLanguage = 'en', setCurrentLanguage }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: { en: 'Vegetables', kh: 'បន្លែ' },
      description: { 
        en: 'Fresh organic vegetables from local farms', 
        kh: 'បន្លែធម្មជាតិស្រស់ៗពីកសិដ្ឋានក្នុងស្រុក' 
      },
      productCount: 15,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: { en: 'Fruits', kh: 'ផ្លែឈើ' },
      description: { 
        en: 'Seasonal fresh fruits directly from orchards', 
        kh: 'ផ្លែឈើស្រស់តាមរដូវកាលពីចម្ការរបស់យើង' 
      },
      productCount: 8,
      createdAt: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      name: { en: 'Grains & Rice', kh: 'ស្រូវ និងគ្រាប់ធញ្ញជាតិ' },
      description: { 
        en: 'Premium quality rice and various grains', 
        kh: 'បាយ និងគ្រាប់ធញ្ញជាតិគុណភាពល្អ' 
      },
      productCount: 12,
      createdAt: '2024-01-08',
      status: 'inactive'
    },
    {
      id: 4,
      name: { en: 'Herbs & Spices', kh: 'ឱសថ និងគ្រឿងទេស' },
      description: { 
        en: 'Fresh herbs and traditional spices', 
        kh: 'ឱសថស្រស់ និងគ្រឿងទេសប្រពៃណី' 
      },
      productCount: 6,
      createdAt: '2024-01-05',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const actionsMenuRef = useRef(null);

  const texts = {
    kh: {
      categoryManagement: 'ការគ្រប់គ្រងប្រភេទ',
      searchCategories: 'ស្វែងរកប្រភេទ...',
      addNewCategory: 'បន្ថែមប្រភេទថ្មី',
      filterByStatus: 'តម្រងតាមស្ថានភាព',
      allCategories: 'ប្រភេទទាំងអស់',
      activeCategories: 'ប្រភេទសកម្ម',
      inactiveCategories: 'ប្រភេទមិនសកម្ម',
      categoryName: 'ឈ្មោះប្រភេទ',
      description: 'ការពិពណ៌នា',
      products: 'ផលិតផល',
      createdDate: 'កាលបរិច្ឆេទបង្កើត',
      status: 'ស្ថានភាព',
      actions: 'សកម្មភាព',
      active: 'សកម្ម',
      inactive: 'មិនសកម្ម',
      view: 'មើល',
      edit: 'កែប្រែ',
      delete: 'លុប',
      addCategory: 'បន្ថែមប្រភេទ',
      editCategory: 'កែប្រែប្រភេទ',
      viewCategory: 'មើលប្រភេទ',
      categoryNameEn: 'ឈ្មោះប្រភេទ (ភាសាអង់គ្លេស)',
      categoryNameKh: 'ឈ្មោះប្រភេទ (ភាសាខ្មែរ)',
      descriptionEn: 'ការពិពណ៌នា (ភាសាអង់គ្លេស)',
      descriptionKh: 'ការពិពណ៌នា (ភាសាខ្មែរ)',
      save: 'រក្សាទុក',
      cancel: 'បោះបង់',
      close: 'បិទ',
      confirmDelete: 'បញ្ជាក់ការលុប',
      deleteConfirmText: 'តើអ្នកប្រាកដថាចង់លុបប្រភេទនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។',
      confirmDeleteBtn: 'បាទ, លុប',
      cancelDelete: 'បោះបង់',
      noCategories: 'រកមិនឃើញប្រភេទ',
      categoryDeleted: 'ប្រភេទត្រូវបានលុបដោយជោគជ័យ',
      categorySaved: 'ប្រភេទត្រូវបានរក្សាទុកដោយជោគជ័យ'
    },
    en: {
      categoryManagement: 'Category Management',
      searchCategories: 'Search categories...',
      addNewCategory: 'Add New Category',
      filterByStatus: 'Filter by Status',
      allCategories: 'All Categories',
      activeCategories: 'Active Categories',
      inactiveCategories: 'Inactive Categories',
      categoryName: 'Category Name',
      description: 'Description',
      products: 'Products',
      createdDate: 'Created Date',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      addCategory: 'Add Category',
      editCategory: 'Edit Category',
      viewCategory: 'View Category',
      categoryNameEn: 'Category Name (English)',
      categoryNameKh: 'Category Name (Khmer)',
      descriptionEn: 'Description (English)',
      descriptionKh: 'Description (Khmer)',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      confirmDelete: 'Confirm Delete',
      deleteConfirmText: 'Are you sure you want to delete this category? This action cannot be undone.',
      confirmDeleteBtn: 'Yes, Delete',
      cancelDelete: 'Cancel',
      noCategories: 'No categories found',
      categoryDeleted: 'Category deleted successfully',
      categorySaved: 'Category saved successfully'
    }
  };

  const currentTexts = texts[currentLanguage];

  const [formData, setFormData] = useState({
    name: { en: '', kh: '' },
    description: { en: '', kh: '' },
    status: 'active'
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase());
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
        status: category.status
      });
    } else {
      setFormData({
        name: { en: '', kh: '' },
        description: { en: '', kh: '' },
        status: 'active'
      });
    }
    setShowModal(true);
    setDropdownOpen(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setFormData({
      name: { en: '', kh: '' },
      description: { en: '', kh: '' },
      status: 'active'
    });
  };

  const handleSave = () => {
    if (modalMode === 'edit') {
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else if (modalMode === 'add') {
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([newCategory, ...categories]);
    }
    handleCloseModal();
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
    setDropdownOpen(null);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  const toggleDropdown = (categoryId) => {
    setDropdownOpen(dropdownOpen === categoryId ? null : categoryId);
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

  return (
    <div className="min-h-screen bg-white p-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#333333] mb-2">
                {currentTexts.categoryManagement}
              </h1>
              <p className="text-[#8B4513] text-sm">
                {currentLanguage === 'en' 
                  ? 'Manage your product categories efficiently' 
                  : 'គ្រប់គ្រងប្រភេទផលិតផលរបស់អ្នកយ៉ាងមានប្រសិទ្ធភាព'
                }
              </p>
            </div>
            <button
              onClick={() => handleOpenModal('add')}
              className="flex items-center gap-2 px-4 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#2D5016] transition-colors font-medium"
            >
              <Plus size={18} />
              {currentTexts.addNewCategory}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]" size={18} />
              <input
                type="text"
                placeholder={currentTexts.searchCategories}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-[#F5F5DC] rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none"
              >
                <option value="all">{currentTexts.allCategories}</option>
                <option value="active">{currentTexts.activeCategories}</option>
                <option value="inactive">{currentTexts.inactiveCategories}</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8B4513] pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#EAF8E7]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                    {currentTexts.categoryName}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                    {currentTexts.description}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                    {currentTexts.products}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                    {currentTexts.createdDate}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                    {currentTexts.status}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#333333]">
                    {currentTexts.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5DC]">
                {filteredCategories.length > 0 ? filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#F5F5DC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#333333]">
                        {category.name[currentLanguage]}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#8B4513] text-sm line-clamp-2 max-w-xs">
                        {category.description[currentLanguage]}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FFD700] text-[#333333]">
                        {category.productCount} {currentTexts.products}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8B4513] text-sm">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.status === 'active' ? currentTexts.active : currentTexts.inactive}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(category.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#F5F5DC] transition-colors"
                      >
                        <MoreVertical size={16} className="text-[#333333]" />
                      </button>
                      {dropdownOpen === category.id && (
                        <div ref={actionsMenuRef} className="absolute right-6 top-12 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <button
                            onClick={() => handleOpenModal('view', category)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#228B22] hover:bg-[#228B22] hover:bg-opacity-10 transition-colors rounded-t-lg"
                          >
                            <Eye size={14} />
                            {currentTexts.view}
                          </button>
                          <button
                            onClick={() => handleOpenModal('edit', category)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#FFD700] hover:bg-[#FFD700] hover:bg-opacity-20 transition-colors"
                          >
                            <Edit size={14} />
                            {currentTexts.edit}
                          </button>
                          <button
                            onClick={() => handleDelete(category)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-b-lg"
                          >
                            <Trash2 size={14} />
                            {currentTexts.delete}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#8B4513]">
                      {currentTexts.noCategories}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#F5F5DC]">
              <h2 className="text-xl font-bold text-[#333333]">
                {modalMode === 'add' ? currentTexts.addCategory : 
                 modalMode === 'edit' ? currentTexts.editCategory : currentTexts.viewCategory}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-[#8B4513] hover:text-[#333333] transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      {currentTexts.categoryNameEn}
                    </label>
                    <input
                      type="text"
                      value={formData.name.en}
                      onChange={(e) => setFormData({
                        ...formData,
                        name: { ...formData.name, en: e.target.value }
                      })}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6]"
                      placeholder="Enter category name in English"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      {currentTexts.categoryNameKh}
                    </label>
                    <input
                      type="text"
                      value={formData.name.kh}
                      onChange={(e) => setFormData({
                        ...formData,
                        name: { ...formData.name, kh: e.target.value }
                      })}
                      disabled={modalMode === 'view'}
                      className="w-full px-3 py-2 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6]"
                      placeholder="បញ្ចូលឈ្មោះប្រភេទជាភាសាខ្មែរ"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      {currentTexts.descriptionEn}
                    </label>
                    <textarea
                      value={formData.description.en}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description, en: e.target.value }
                      })}
                      disabled={modalMode === 'view'}
                      rows={4}
                      className="w-full px-3 py-2 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6] resize-none"
                      placeholder="Enter description in English"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      {currentTexts.descriptionKh}
                    </label>
                    <textarea
                      value={formData.description.kh}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description, kh: e.target.value }
                      })}
                      disabled={modalMode === 'view'}
                      rows={4}
                      className="w-full px-3 py-2 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6] resize-none"
                      placeholder="បញ្ចូលការពិពណ៌នាជាភាសាខ្មែរ"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    {currentTexts.status}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({
                      ...formData,
                      status: e.target.value
                    })}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6]"
                  >
                    <option value="active">{currentTexts.active}</option>
                    <option value="inactive">{currentTexts.inactive}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-[#F5F5DC]">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#FAF0E6] transition-colors"
              >
                {modalMode === 'view' ? currentTexts.close : currentTexts.cancel}
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#2D5016] transition-colors"
                >
                  {currentTexts.save}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-4">
                {currentTexts.confirmDelete}
              </h3>
              <p className="text-[#8B4513] mb-6">
                {currentTexts.deleteConfirmText}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#FAF0E6] transition-colors"
                >
                  {currentTexts.cancelDelete}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {currentTexts.confirmDeleteBtn}
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