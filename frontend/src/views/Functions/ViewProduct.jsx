import React from 'react';
import { X, Package, Star, MapPin, User, Calendar, DollarSign, Eye } from 'lucide-react';

const ViewProduct = ({ product, provinces, onClose }) => {
  if (!product) return null;

  const texts = {
    productDetails: "Product Details",
    productInfo: "Product Information",
    farmerInfo: "Farmer Information",
    locationInfo: "Location Information",
    productStats: "Product Statistics",
    close: "Close",
    price: "Price",
    stock: "Stock Quantity",
    unit: "Unit",
    status: "Status",
    category: "Category",
    province: "Province",
    description: "Description",
    farmer: "Farmer",
    phone: "Phone",
    email: "Email",
    orders: "Total Orders",
    rating: "Rating",
    reviews: "Reviews",
    createdAt: "Created At",
    lastUpdated: "Last Updated",
    active: "Active",
    inactive: "Inactive",
    noDescription: "No description available",
    noImage: "No image available"
  };

  const getProvinceName = (provinceId) => {
    const province = provinces?.find(p => p.id === provinceId);
    return province?.province_name || 'Unknown Province';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg?height=300&width=300";
  };

  const generateRating = (productId) => {
    return 3.5 + ((productId % 15) / 10);
  };

  const generateReviews = (productId) => {
    return 5 + (productId % 95);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {texts.productDetails}
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">{texts.noImage}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Status and Rating */}
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'active' ? texts.active : texts.inactive}
                  </span>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{generateRating(product.id).toFixed(1)}</span>
                    <span className="text-gray-500">({generateReviews(product.id)} {texts.reviews})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {texts.productInfo}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h5>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || texts.noDescription}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{texts.price}</span>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        ${product.price}<span className="text-sm text-gray-500">/{product.unit}</span>
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{texts.stock}</span>
                      </div>
                      <p className="text-xl font-bold text-blue-600">{product.stock}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-gray-600">{texts.orders}</span>
                      </div>
                      <p className="text-xl font-bold text-yellow-600">{product.orders || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Details */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Product Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{texts.category}:</span>
                      <span className="font-medium">{product.category?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{texts.unit}:</span>
                      <span className="font-medium capitalize">{product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{texts.province}:</span>
                      <span className="font-medium">{getProvinceName(product.province_id)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{texts.status}:</span>
                      <span className={`font-medium capitalize ${
                        product.status === 'active' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{texts.rating}:</span>
                      <span className="font-medium">{generateRating(product.id).toFixed(1)}/5.0</span>
                    </div>
                  </div>
                </div>

                {/* Farmer Information */}
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {texts.farmerInfo}
                  </h4>
                  {product.user ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{texts.farmer}:</span>
                        <span className="font-medium">{product.user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{texts.phone}:</span>
                        <span className="font-medium">{product.user.phone || '+855 12 345 678'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{texts.email}:</span>
                        <span className="font-medium text-sm">{product.user.email || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Farmer Rating:</span>
                        <span className="font-medium">
                          {(4.0 + ((product.user.id % 10) / 10)).toFixed(1)}/5.0
                        </span>
                      </div>
                      {product.user.avatar && (
                        <div className="pt-2">
                          <img 
                            src={product.user.avatar} 
                            alt={product.user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{texts.farmer}:</span>
                        <span className="font-medium">Anonymous Farmer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{texts.phone}:</span>
                        <span className="font-medium">+855 12 345 678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Farmer Rating:</span>
                        <span className="font-medium">4.2/5.0</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">{texts.createdAt}:</span>
                    <p className="font-medium">{formatDate(product.created_at)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">{texts.lastUpdated}:</span>
                    <p className="font-medium">{formatDate(product.updated_at)}</p>
                  </div>
                </div>
              </div>

              {/* Additional Product Stats */}
              <div className="bg-yellow-50 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Additional Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Product ID:</span>
                    <p className="font-medium">#{product.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Stock Status:</span>
                    <p className={`font-medium ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Revenue:</span>
                    <p className="font-medium text-green-600">
                      ${((product.price || 0) * (product.orders || 0)).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Popularity:</span>
                    <p className="font-medium">
                      {(product.orders || 0) > 10 || generateRating(product.id) > 4.0 ? 'Popular' : 'Standard'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Only Close Button */}
          <div className="flex gap-4 pt-6 border-t mt-8">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              {texts.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
