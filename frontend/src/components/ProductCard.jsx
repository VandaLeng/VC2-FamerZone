import React from 'react';
import { Heart, Star, MapPin, Phone, Truck, Leaf, Clock, Navigation } from 'lucide-react';

const ProductCard = ({ 
  product, 
  currentTexts, 
  currentLanguage, 
  isFavorite, 
  onToggleFavorite, 
  onOrder, 
  orderingProducts, 
  orderedProducts, 
  viewMode, 
  provinces,
  showDistance = false 
}) => {
  const isOrdering = orderingProducts.includes(product.id);
  const isOrdered = orderedProducts.includes(product.id);
  
  const province = provinces.find(p => p.id === product.province);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex gap-6">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            {product.isPopular && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Popular
              </div>
            )}
            {showDistance && product.distance && (
              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                {product.distance.toFixed(1)}km
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                {currentLanguage === 'kh' && product.nameKh && (
                  <p className="text-gray-600 text-sm">{product.nameKh}</p>
                )}
              </div>
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>
              {showDistance && product.distance && (
                <div className="flex items-center gap-1 text-green-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{product.distance.toFixed(1)} {currentTexts.kmAway}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={product.farmer.avatar || "/placeholder.svg"}
                  alt={product.farmer.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{product.farmer.name}</p>
                  <p className="text-xs text-gray-600">{province?.name}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {product.organicCertified && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    <Leaf className="w-3 h-3" />
                    Organic
                  </div>
                )}
                {product.deliveryAvailable && (
                  <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    <Truck className="w-3 h-3" />
                    Delivery
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-green-600">
                  {product.currency}{product.price}
                </span>
                <span className="text-gray-500">/{product.unit}</span>
                {product.discount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  {currentTexts.contactFarmer}
                </button>
                <button
                  onClick={() => onOrder(product.id)}
                  disabled={isOrdering || isOrdered || !product.inStock}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isOrdered
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : isOrdering
                      ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed'
                      : product.inStock
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isOrdered ? currentTexts.orderPlaced : isOrdering ? 'Ordering...' : currentTexts.orderNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isPopular && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            Popular
          </div>
        )}
        {showDistance && product.distance && (
          <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            {product.distance.toFixed(1)}km
          </div>
        )}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className={`absolute top-3 right-3 ${showDistance && product.distance ? 'top-12' : ''} p-2 rounded-full transition-colors ${
            isFavorite ? 'text-red-500 bg-white/90' : 'text-gray-400 hover:text-red-500 bg-white/90'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        {product.discount > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={product.farmer.avatar || "/placeholder.svg"}
            alt={product.farmer.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-gray-600">{product.farmer.name}</span>
          {showDistance && product.distance && (
            <div className="flex items-center gap-1 text-green-600 ml-auto">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-medium">{product.distance.toFixed(1)} {currentTexts.kmAway}</span>
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        {currentLanguage === 'kh' && product.nameKh && (
          <p className="text-gray-600 text-sm mb-2">{product.nameKh}</p>
        )}
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
          <div className="flex gap-1 ml-auto">
            {product.organicCertified && (
              <Leaf className="w-4 h-4 text-green-500" title="Organic Certified" />
            )}
            {product.deliveryAvailable && (
              <Truck className="w-4 h-4 text-blue-500" title="Delivery Available" />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-green-600">
              {product.currency}{product.price}
            </span>
            <span className="text-gray-500 text-sm">/{product.unit}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {product.inStock ? currentTexts.inStock : currentTexts.outOfStock}
          </span>
        </div>
        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
            <Phone className="w-4 h-4" />
            {currentTexts.contactFarmer}
          </button>
          <button
            onClick={() => onOrder(product.id)}
            disabled={isOrdering || isOrdered || !product.inStock}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isOrdered
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : isOrdering
                ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed'
                : product.inStock
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isOrdered ? currentTexts.orderPlaced : isOrdering ? 'Ordering...' : currentTexts.orderNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
