"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { MoreVertical, Search, Edit, Trash2, Eye, Package, DollarSign, X, Upload, Save, AlertCircle, Plus, Star, MapPin, Loader2, RefreshCw, ExternalLink, CheckCircle } from 'lucide-react';
import provinces from "../../services/provinces";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from "../../services/ProductContext";

const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [categories, setCategories] = useState([
    { id: "1", name: "Vegetables" },
    { id: "2", name: "Fruits" },
    { id: "3", name: "Grains" },
    { id: "4", name: "Livestock" },
    { id: "5", name: "Beverages" },
    { id: "6", name: "Seafood" },
  ]);
  const [provincesList, setProvincesList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProvince, setFilterProvince] = useState("");
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const actionsMenuRef = useRef(null);
  const productsSectionRef = useRef(null);

  const texts = {
    en: {
      productManagement: "Product Management",
      manageProducts: "Manage your products and inventory",
      addNewProduct: "Add New Product",
      searchProducts: "Search products...",
      allCategories: "All Categories",
      allProvinces: "All Provinces",
      allStatus: "All Status",
      active: "Active",
      inactive: "Inactive",
      totalProducts: "Total Products",
      activeProducts: "Active Products",
      outOfStock: "Out of Stock",
      totalRevenue: "Total Revenue",
      product: "Product",
      category: "Category",
      province: "Province",
      price: "Price",
      stock: "Stock",
      status: "Status",
      orders: "Orders",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      save: "Save",
      cancel: "Cancel",
      productName: "Product Name",
      selectCategory: "Select Category",
      selectProvince: "Select Province",
      pricePerUnit: "Price per Unit",
      stockQuantity: "Stock Quantity",
      unit: "Unit",
      kg: "kg",
      lb: "lb",
      piece: "Piece",
      dozen: "Dozen",
      liter: "Liter",
      productImage: "Product Image",
      uploadImage: "Upload an image for your product",
      selectFile: "Select File",
      error: "Error: ",
      validationError: "Please correct the following errors:",
      nameRequired: "Product name is required",
      productAdded: "Product added successfully and will appear on the website!",
      productUpdated: "Product updated successfully!",
      productDeleted: "Product deleted successfully!",
      provinceRequired: "Please select a province",
      categoryRequired: "Please select a category",
      authRequired: "Please log in to add a product",
      deleteConfirm: "Are you sure you want to delete this product?",
      description: "Description",
      location: "Location",
      farmer: "Farmer",
      rating: "Rating",
      loading: "Loading...",
      noProducts: "No products found",
      refresh: "Refresh",
      viewOnWebsite: "View on Website",
      loginFirst: "Please log in first",
      loginPrompt: "You need to be logged in to manage products",
      loginButton: "Go to Login",
      imageUploaded: "Image uploaded successfully",
      priceRequired: "Price is required",
      stockRequired: "Stock quantity is required",
      unitRequired: "Unit is required",
      descriptionPlaceholder: "Enter a detailed description of your product...",
      currentImage: "Current Image",
      changeImage: "Change Image",
      noImage: "No image uploaded",
      productDetails: "Product Details",
      farmerInfo: "Farmer Information",
      createdAt: "Created At",
      lastUpdated: "Last Updated",
    },
  };

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id") || "1";
    const userName = localStorage.getItem("user_name") || "User";
    setCurrentUser({ id: userId, name: userName });
    setProvincesList(provinces);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setShowActionsMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || product.category_id?.toString() === filterCategory;
    const matchesStatus = filterStatus === "" || product.status === filterStatus;
    const matchesProvince = filterProvince === "" || product.province_id === filterProvince;
    return matchesSearch && matchesCategory && matchesStatus && matchesProvince;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.orders || 0)), 0);

  const toggleActionsMenu = (productId) => {
    setShowActionsMenu(showActionsMenu === productId ? null : productId);
  };

  const handleDelete = (productId) => {
    if (window.confirm(texts.en.deleteConfirm)) {
      setIsLoading(true);
      deleteProduct(productId);
      toast.success(texts.en.productDeleted);
      setShowActionsMenu(null);
      window.dispatchEvent(new CustomEvent('productUpdated', { detail: { action: 'deleted' } }));
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.info("Refreshing products...");
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

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
    });

    const [imagePreview, setImagePreview] = useState(product?.image_url || null);
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
        toast.success(texts.en.imageUploaded);
      }
    };

    const validateForm = () => {
      const errors = {};
      
      if (!formData.name.trim()) {
        errors.name = texts.en.nameRequired;
      }
      
      if (!formData.category_id) {
        errors.category_id = texts.en.categoryRequired;
      }
      
      if (!formData.province_id) {
        errors.province_id = texts.en.provinceRequired;
      }
      
      if (!formData.price || formData.price <= 0) {
        errors.price = texts.en.priceRequired;
      }
      
      if (!formData.stock || formData.stock < 0) {
        errors.stock = texts.en.stockRequired;
      }
      
      if (!formData.unit) {
        errors.unit = texts.en.unitRequired;
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        toast.error(texts.en.validationError);
        return;
      }

      if (!currentUser) {
        toast.error(texts.en.authRequired);
        return;
      }

      setIsSubmitting(true);
      setError(null);

      const newProduct = {
        name: formData.name.trim(),
        category_id: formData.category_id,
        province_id: formData.province_id,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        unit: formData.unit,
        description: formData.description.trim() || "",
        user_id: currentUser.id,
        user: {
          name: currentUser.name,
          phone: "123456789",
          avatar: "/placeholder.svg",
          rating: 4.5,
        },
        image_url: imagePreview || "/placeholder.svg",
        latitude: provinces.find(p => p.id === formData.province_id)?.latitude || 11.5564,
        longitude: provinces.find(p => p.id === formData.province_id)?.longitude || 104.9282,
        status: "active",
      };

      try {
        if (product) {
          updateProduct(product.id, newProduct);
          toast.success(texts.en.productUpdated);
        } else {
          addProduct(newProduct);
          toast.success(texts.en.productAdded);
        }
        
        window.dispatchEvent(new CustomEvent('productUpdated', {
          detail: { 
            product: newProduct,
            action: product ? 'updated' : 'created' 
          }
        }));
        
        onSave();
      } catch (err) {
        console.error("Product Submit Error:", err);
        toast.error(texts.en.error + err.message);
        setError(err.message);
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
                {product ? `${texts.en.edit} ${texts.en.product}` : texts.en.addNewProduct}
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
                  <span className="font-medium">{texts.en.error}</span>
                </div>
                <p className="mt-1">{error}</p>
                {Object.keys(validationErrors).length > 0 && (
                  <ul className="list-disc ml-5 mt-2">
                    {Object.values(validationErrors)
                      .flat()
                      .map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                  </ul>
                )}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.en.productName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      validationErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter product name"
                    required
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.en.selectCategory} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      validationErrors.category_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">{texts.en.selectCategory}</option>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </select>
                  {validationErrors.category_id && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.category_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.en.selectProvince} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.province_id}
                    onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      validationErrors.province_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">{texts.en.selectProvince}</option>
                    {provincesList.length > 0 ? (
                      provincesList.map((prov) => (
                        <option key={prov.id} value={prov.id}>
                          {prov.province_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No provinces available</option>
                    )}
                  </select>
                  {validationErrors.province_id && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.province_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.en.description}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="4"
                    placeholder={texts.en.descriptionPlaceholder}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {texts.en.pricePerUnit} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                        validationErrors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                      required
                    />
                    {validationErrors.price && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {texts.en.stockQuantity} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                        validationErrors.stock ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0"
                      required
                    />
                    {validationErrors.stock && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.stock}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.en.unit} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="kg">{texts.en.kg}</option>
                    <option value="lb">{texts.en.lb}</option>
                    <option value="piece">{texts.en.piece}</option>
                    <option value="dozen">{texts.en.dozen}</option>
                    <option value="liter">{texts.en.liter}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.en.productImage}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Product preview"
                          className="mx-auto h-40 w-40 object-cover rounded border"
                        />
                        <p className="text-sm text-gray-600">
                          {product ? texts.en.currentImage : texts.en.imageUploaded}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-gray-600">{texts.en.uploadImage}</p>
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
                      {imagePreview ? texts.en.changeImage : texts.en.selectFile}
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
                    {texts.en.loading}
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {texts.en.save}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                {texts.en.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleProductUpdated = (event) => {
      setRefreshTrigger(prev => prev + 1);
      if (event.detail.action === 'created') {
        scrollToProducts();
      }
    };

    window.addEventListener('productUpdated', handleProductUpdated);
    return () => window.removeEventListener('productUpdated', handleProductUpdated);
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{texts.en.loginFirst}</h2>
          <p className="text-gray-600 mb-6">{texts.en.loginPrompt}</p>
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full"
          >
            {texts.en.loginButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {error && !Object.keys(validationErrors).length && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{texts.en.productManagement}</h1>
              <p className="text-gray-600">{texts.en.manageProducts}</p>
              {currentUser && (
                <p className="text-sm text-green-600 mt-1">Welcome back, {currentUser.name}!</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
                {texts.en.refresh}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
                disabled={isLoading}
              >
                <Plus size={20} />
                {texts.en.addNewProduct}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.en.totalProducts}</p>
                <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.en.activeProducts}</p>
                <p className="text-2xl font-bold text-gray-800">{activeProducts}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.en.outOfStock}</p>
                <p className="text-2xl font-bold text-gray-800">{outOfStockProducts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">{texts.en.totalRevenue}</p>
                <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6" ref={productsSectionRef}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={texts.en.searchProducts}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{texts.en.allCategories}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{texts.en.allStatus}</option>
              <option value="active">{texts.en.active}</option>
              <option value="inactive">{texts.en.inactive}</option>
            </select>
            <select
              value={filterProvince}
              onChange={(e) => setFilterProvince(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{texts.en.allProvinces}</option>
              {provincesList.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.province_name}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" />
              <p className="mt-2 text-gray-600">{texts.en.loading}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">{texts.en.noProducts}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.product}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.category}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.province}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.price}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.stock}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.status}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.orders}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {texts.en.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image_url || "/placeholder.svg?height=40&width=40"}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {categories.find(cat => cat.id === product.category_id)?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {provincesList.find(p => p.id === product.province_id)?.province_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}/{product.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.orders || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative" ref={actionsMenuRef}>
                          <button
                            onClick={() => toggleActionsMenu(product.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          {showActionsMenu === product.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setShowEditModal(true);
                                    setShowActionsMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  {texts.en.edit}
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(product.id);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {texts.en.delete}
                                </button>
                                <a
                                  href={`/products?product=${product.id}`}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                  onClick={() => setShowActionsMenu(null)}
                                >
                                  <Eye className="h-4 w-4" />
                                  {texts.en.view}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {(showAddModal || showEditModal) && (
          <ProductForm
            product={showEditModal ? selectedProduct : null}
            onSave={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            onCancel={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedProduct(null);
              setValidationErrors({});
              setError(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductManagement;