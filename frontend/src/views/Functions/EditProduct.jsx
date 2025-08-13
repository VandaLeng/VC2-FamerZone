import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload, Save, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const EditProduct = ({ product, categories, provinces, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category_id: product?.category?.id ? String(product.category.id) : "",
    province_id: product?.province_id || "",
    price: product?.price || "",
    stock: product?.stock || "",
    unit: product?.unit || "piece",
    image: null,
    description: product?.description || "",
  });

  const [imagePreview, setImagePreview] = useState(product?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000";

  const texts = {
    editProduct: "Edit Product",
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
    description: "Description",
    descriptionPlaceholder: "Enter a detailed description of your product...",
    save: "Save Changes",
    cancel: "Cancel",
    loading: "Updating...",
    changeImage: "Change Image",
    currentImage: "Current Image",
    nameRequired: "Product name is required",
    categoryRequired: "Please select a category",
    provinceRequired: "Please select a province",
    priceRequired: "Price is required",
    stockRequired: "Stock quantity is required",
    unitRequired: "Unit is required",
    validationError: "Please correct the following errors:",
    error: "Error: ",
    imageUploaded: "Image uploaded successfully",
    productUpdated: "Product updated successfully!",
  };

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
      toast.success(texts.imageUploaded);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = texts.nameRequired;
    }
    
    if (!formData.category_id) {
      errors.category_id = texts.categoryRequired;
    }
    
    if (!formData.province_id) {
      errors.province_id = texts.provinceRequired;
    }
    
    if (!formData.price || formData.price <= 0) {
      errors.price = texts.priceRequired;
    }
    
    if (!formData.stock || formData.stock < 0) {
      errors.stock = texts.stockRequired;
    }
    
    if (!formData.unit) {
      errors.unit = texts.unitRequired;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(texts.validationError);
      return;
    }

    const token = localStorage.getItem("token") || localStorage.getItem("auth_token");

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("name", formData.name.trim());
      form.append("category_id", formData.category_id);
      form.append("province_id", formData.province_id);
      form.append("price", parseFloat(formData.price));
      form.append("stock", parseInt(formData.stock));
      form.append("unit", formData.unit);
      form.append("description", formData.description.trim() || "");

      if (formData.image) {
        form.append("image", formData.image);
      }

      // Add the _method field for Laravel to handle PUT request via POST
      form.append("_method", "PUT");

      const response = await axios.post(`${API_BASE_URL}/api/items/${product.id}`, form, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(texts.productUpdated);
        
        // Create updated product object with proper image URL
        const updatedProduct = {
          ...product,
          ...response.data.data,
          // Ensure image URL is properly formatted
          image: response.data.data.image ? 
            (response.data.data.image.startsWith('http') ? 
              response.data.data.image : 
              `${API_BASE_URL}/storage/${response.data.data.image.replace(/^\/?(storage\/)?/, '')}`) 
            : product.image
        };
        
        // Call onSave with the updated product
        onSave(updatedProduct);
      } else {
        throw new Error(response.data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error("Update Error:", err);
      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};
        setValidationErrors(errors);
        toast.error(texts.validationError);
      } else {
        const message = err.response?.data?.message || err.message;
        toast.error(texts.error + message);
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
              {texts.editProduct}
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
                <span className="font-medium">{texts.error}</span>
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
                  {texts.productName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
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
                  {texts.selectCategory} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.category_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{texts.selectCategory}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {validationErrors.category_id && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.category_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.selectProvince} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.province_id}
                  onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.province_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">{texts.selectProvince}</option>
                  {provinces.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.province_name}
                    </option>
                  ))}
                </select>
                {validationErrors.province_id && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.province_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.description}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder={texts.descriptionPlaceholder}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.pricePerUnit} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
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
                    {texts.stockQuantity} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
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
                  {texts.unit} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="kg">{texts.kg}</option>
                  <option value="lb">{texts.lb}</option>
                  <option value="piece">{texts.piece}</option>
                  <option value="dozen">{texts.dozen}</option>
                  <option value="liter">{texts.liter}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.productImage}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
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
                        {texts.currentImage}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">Upload a new image</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload-edit"
                  />
                  <label
                    htmlFor="image-upload-edit"
                    className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block mt-4"
                  >
                    {texts.changeImage}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {texts.loading}
                </>
              ) : (
                <>
                  <Save size={20} />
                  {texts.save}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              {texts.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;