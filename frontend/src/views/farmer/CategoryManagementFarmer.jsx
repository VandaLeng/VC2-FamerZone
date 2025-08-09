import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Filter, X } from 'lucide-react';
import axios from 'axios';

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
  const actionsMenuRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    description_kh: '',
    status: 'active',
    image: null,
  });

  const texts = {
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
    categoryNameKh: 'ឈ្មោះប្រភេទ',
    descriptionKh: 'ការពិពណ៌នា',
    save: 'រក្សាទុក',
    cancel: 'បោះបង់',
    close: 'បិទ',
    confirmDelete: 'បញ្ជាក់ការលុប',
    deleteConfirmText: 'តើអ្នកប្រាកដថាចង់លុបប្រភេទនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។',
    confirmDeleteBtn: 'បាទ, លុប',
    cancelDelete: 'បោះបង់',
    noCategories: 'រកមិនឃើញប្រភេទ',
    categoryDeleted: 'ប្រភេទត្រូវបានលុបដោយជោគជ័យ',
    categorySaved: 'ប្រភេទត្រូវបានរក្សាទុកដោយជោគជ័យ',
    image: 'រូបភាព',
    uploadImage: 'ផ្ទុករូបភាព',
    loading: 'កំពុងផ្ទុក...',
    nameRequired: 'ឈ្មោះប្រភេទត្រូវតែបញ្ចូល',
    nameEnRequired: 'ឈ្មោះប្រភេទត្រូវតែមានអក្សរអង់គ្លេស',
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
const CATEGORIES_ENDPOINT = `${API_BASE_URL}/categories`;

// Remove trailing '/api' from API base URL for image use
const BASE_IMAGE_URL = API_BASE_URL.replace('/api', '');

useEffect(() => {
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(CATEGORIES_ENDPOINT);

      const transformedCategories = response.data.data.map((category) => {
        // Normalize the image URL
        let imageUrl = category.image_url || '';
        
        // If it's a relative path (e.g. "uploads/image.jpg"), prefix it with server origin
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${BASE_IMAGE_URL}/category_image/${imageUrl}`;
        }


        return {
          id: category.id,
          name: category.name.kh || '',
          description: category.description.kh || '',
          productCount: category.productCount || 0,
          createdAt: category.created_at,
          status: category.status,
          image_url: imageUrl,
        };
      });

      setCategories(transformedCategories);
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'បរាជ័យក្នុងការទៅយកប្រភេទ';
      setError(errorMessage);
      console.error('AxiosError Details:', {
        message: err.message,
        code: err.code,
        response: err.response,
      });
    } finally {
      setIsLoading(false);
    }
  };

  fetchCategories();
}, []);

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
        description_kh: category.description,
        status: category.status,
        image: null,
      });
    } else {
      setFormData({
        name: '',
        description_kh: '',
        status: 'active',
        image: null,
      });
    }
    setShowModal(true);
    setDropdownOpen(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      description_kh: '',
      status: 'active',
      image: null,
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError(texts.nameRequired);
      return;
    }

    // Basic check for English (Latin) characters
    const hasEnglish = /[a-zA-Z]/.test(formData.name);
    if (!hasEnglish) {
      setError(texts.nameEnRequired);
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name[kh]', formData.name);
      formDataToSend.append('name[en]', formData.name);
      formDataToSend.append('description[kh]', formData.description_kh || '');
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
                  name: response.data.data.name.kh,
                  description: response.data.data.description.kh,
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
          name: response.data.data.name.kh,
          description: response.data.data.description.kh,
          productCount: response.data.data.productCount || 0,
          createdAt: response.data.data.created_at,
          status: response.data.data.status,
          image_url: response.data.data.image_url,
        };
        setCategories([newCategory, ...categories]);
      }

      handleCloseModal();
      setError(null);
      alert(texts.categorySaved);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'បរាជ័យក្នុងការរក្សាទុកប្រភេទ';
      setError(errorMessage);
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
      alert(texts.categoryDeleted);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'បរាជ័យក្នុងការលុបប្រភេទ';
      setError(errorMessage);
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
      setFormData({ ...formData, image: file });
    }
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
    <div className="min-h-screen bg-white p-4 font-khmer">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded flex items-center gap-2 text-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">
                {texts.categoryManagement}
              </h1>
              <p className="text-[#8B4513] text-base">
                {texts.categoryManagement}
              </p>
            </div>
            <button
              onClick={() => handleOpenModal('add')}
              className="flex items-center gap-2 px-6 py-3 bg-[#228B22] text-white rounded-lg hover:bg-[#2D5016] transition-colors font-medium text-lg"
            >
              <Plus size={20} />
              {texts.addNewCategory}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]"
                size={20}
              />
              <input
                type="text"
                placeholder={texts.searchCategories}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none text-base"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-[#F5F5DC] rounded-lg px-6 py-3 pr-10 focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none text-base"
              >
                <option value="all">{texts.allCategories}</option>
                <option value="active">{texts.activeCategories}</option>
                <option value="inactive">{texts.inactiveCategories}</option>
              </select>
              <Filter
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B4513] pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#EAF8E7]">
                <tr>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#333333]">
                    {texts.image}
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#333333]">
                    {texts.categoryName}
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#333333]">
                    {texts.description}
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#333333]">
                    {texts.products}
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#333333]">
                    {texts.createdDate}
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#333333]">
                    {texts.status}
                  </th>
                  <th className="px-6 py-4 text-center text-base font-semibold text-[#333333]">
                    {texts.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5DC]">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#8B4513] text-lg">
                      {texts.loading}
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-[#F5F5DC] transition-colors">
                      <td className="px-6 py-4">
                        {category.image_url ? (
                          <img
                            src={category.image_url || "/placeholder.svg"}
                            alt={category.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <span className="text-[#8B4513] text-base">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#333333] text-base">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#8B4513] text-base line-clamp-2 max-w-xs">
                          {category.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-[#FFD700] text-[#333333]">
                          {category.productCount} {texts.products}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#8B4513] text-base">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-base font-medium ${
                            category.status === 'active'
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
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F5F5DC] transition-colors"
                        >
                          <MoreVertical size={18} className="text-[#333333]" />
                        </button>
                        {dropdownOpen === category.id && (
                          <div
                            ref={actionsMenuRef}
                            className="absolute right-6 top-12 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                          >
                            <button
                              onClick={() => handleOpenModal('view', category)}
                              className="flex items-center gap-2 w-full px-4 py-3 text-base text-[#228B22] hover:bg-[#228B22] hover:bg-opacity-10 transition-colors rounded-t-lg"
                            >
                              <Eye size={16} />
                              {texts.view}
                            </button>
                            <button
                              onClick={() => handleOpenModal('edit', category)}
                              className="flex items-center gap-2 w-full px-4 py-3 text-base text-[#FFD700] hover:bg-[#FFD700] hover:bg-opacity-20 transition-colors"
                            >
                              <Edit size={16} />
                              {texts.edit}
                            </button>
                            <button
                              onClick={() => handleDelete(category)}
                              className="flex items-center gap-2 w-full px-4 py-3 text-base text-red-500 hover:bg-red-50 transition-colors rounded-b-lg"
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
                    <td colSpan={7} className="px-6 py-12 text-center text-[#8B4513] text-lg">
                      {texts.noCategories}
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-8 border-b border-[#F5F5DC]">
              <h2 className="text-2xl font-bold text-[#333333]">
                {modalMode === 'add'
                  ? texts.addCategory
                  : modalMode === 'edit'
                  ? texts.editCategory
                  : texts.viewCategory}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-[#8B4513] hover:text-[#333333] transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-[#333333] mb-2">
                    {texts.categoryNameKh}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6] font-khmer text-base"
                    placeholder="បញ្ចូលប្រភេទ"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-[#333333] mb-2">
                    {texts.descriptionKh}
                  </label>
                  <textarea
                    value={formData.description_kh}
                    onChange={(e) => setFormData({ ...formData, description_kh: e.target.value })}
                    disabled={modalMode === 'view'}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6] resize-none font-khmer text-base"
                    placeholder="បញ្ចូលការពិពណ៌នាជាភាសាខ្មែរ"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-[#333333] mb-2">
                    {texts.image}
                  </label>
                  {modalMode !== 'view' && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none text-base"
                    />
                  )}
                  {selectedCategory?.image_url && (
                    <img
                      src={selectedCategory.image_url || "/placeholder.svg"}
                      alt={selectedCategory.name}
                      className="w-40 h-40 object-cover rounded mt-2"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-[#333333] mb-2">
                    {texts.status}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-[#F5F5DC] rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent outline-none disabled:bg-[#FAF0E6] text-base"
                  >
                    <option value="active">{texts.active}</option>
                    <option value="inactive">{texts.inactive}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 p-8 border-t border-[#F5F5DC]">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#FAF0E6] transition-colors text-base"
              >
                {modalMode === 'view' ? texts.close : texts.cancel}
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#228B22] text-white rounded-lg hover:bg-[#2D5016] transition-colors text-base"
                  disabled={isLoading}
                >
                  {isLoading ? texts.loading : texts.save}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-[#333333] mb-4">
                {texts.confirmDelete}
              </h3>
              <p className="text-[#8B4513] mb-6 text-base">{texts.deleteConfirmText}</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-3 text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#FAF0E6] transition-colors text-base"
                >
                  {texts.cancelDelete}
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base"
                  disabled={isLoading}
                >
                  {isLoading ? texts.loading : texts.confirmDeleteBtn}
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