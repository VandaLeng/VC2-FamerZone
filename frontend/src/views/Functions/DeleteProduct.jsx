import React, { useState } from 'react';
import axios from 'axios';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const DeleteProduct = ({ product, onDelete, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const API_BASE_URL = "http://localhost:8000";

  const texts = {
    deleteProduct: "Delete Product",
    confirmDelete: "Confirm Deletion",
    deleteWarning: "This action cannot be undone. This will permanently delete the product and remove all associated data.",
    productName: "Product Name",
    typeToConfirm: "Type DELETE to confirm",
    typeDelete: "Type 'DELETE' to confirm deletion",
    delete: "Delete Product",
    cancel: "Cancel",
    deleting: "Deleting...",
    productDeleted: "Product deleted successfully!",
    error: "Error: ",
    confirmationRequired: "Please type 'DELETE' to confirm",
  };

  const handleDelete = async () => {
    if (confirmationText.toUpperCase() !== 'DELETE') {
      toast.error(texts.confirmationRequired);
      return;
    }

    setIsDeleting(true);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
      
      if (!token) {
        toast.error("Authentication required");
        setIsDeleting(false);
        return;
      }

      const response = await axios.delete(`${API_BASE_URL}/api/items/${product.id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(texts.productDeleted);
        // Call the parent's onDelete function with the product ID
        onDelete(product.id);
      } else {
        throw new Error(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error("Delete Error:", err);
      let message = 'Failed to delete product';
      
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      
      toast.error(texts.error + message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isConfirmationValid = confirmationText.toUpperCase() === 'DELETE';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {texts.deleteProduct}
              </h3>
            </div>
            <button 
              onClick={onCancel} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isDeleting}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">{texts.confirmDelete}</h4>
                  <p className="text-sm text-red-700">
                    {texts.deleteWarning}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{texts.productName}:</p>
                <p className="font-medium text-gray-800">{product.name}</p>
                {product.description && (
                  <>
                    <p className="text-sm text-gray-600 mb-1 mt-2">Description:</p>
                    <p className="text-sm text-gray-700 truncate">{product.description}</p>
                  </>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>Price: ${product.price}/{product.unit}</span>
                  <span>Stock: {product.stock}</span>
                  <span>Status: {product.status}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.typeDelete}
                </label>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="DELETE"
                  disabled={isDeleting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {texts.typeToConfirm}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={!isConfirmationValid || isDeleting}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                isConfirmationValid && !isDeleting
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {texts.deleting}
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  {texts.delete}
                </>
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {texts.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;