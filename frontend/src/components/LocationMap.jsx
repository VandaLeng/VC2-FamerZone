import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Star, Package, Truck } from 'lucide-react';

const LocationMap = ({ userLocation, products, currentTexts, nearbyRadius }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 11.5564, lng: 104.9282 }); // Default to Phnom Penh

  useEffect(() => {
    if (userLocation) {
      setMapCenter({
        lat: userLocation.latitude,
        lng: userLocation.longitude
      });
    }
  }, [userLocation]);

  // Filter products within radius
  const nearbyProducts = products.filter(product => 
    product.distance && product.distance <= nearbyRadius
  );

  // Calculate map bounds to show all relevant points
  const calculateMapBounds = () => {
    if (!userLocation || nearbyProducts.length === 0) return null;

    let minLat = userLocation.latitude;
    let maxLat = userLocation.latitude;
    let minLng = userLocation.longitude;
    let maxLng = userLocation.longitude;

    nearbyProducts.forEach(product => {
      if (product.farmer.location) {
        minLat = Math.min(minLat, product.farmer.location.lat);
        maxLat = Math.max(maxLat, product.farmer.location.lat);
        minLng = Math.min(minLng, product.farmer.location.lng);
        maxLng = Math.max(maxLng, product.farmer.location.lng);
      }
    });

    return { minLat, maxLat, minLng, maxLng };
  };

  const bounds = calculateMapBounds();

  return (
    <div className="bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden">
      <div className="grid lg:grid-cols-3 gap-0 h-[600px]">
        {/* Map Area */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-green-50 to-blue-50">
          {/* Map Header */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-800">
                  {nearbyProducts.length} farmers within {nearbyRadius}km
                </span>
              </div>
              {userLocation && (
                <div className="text-sm text-gray-600">
                  📍 {userLocation.city}, {userLocation.country}
                </div>
              )}
            </div>
          </div>

          {/* Simplified Map Visualization */}
          <div className="w-full h-full relative overflow-hidden">
            {/* Background pattern to simulate map */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>

            {/* User Location Marker */}
            {userLocation && (
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: '50%',
                  top: '50%'
                }}
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                    {currentTexts.yourLocation}
                  </div>
                  {/* Radius circle */}
                  <div 
                    className="absolute border-2 border-blue-300 border-dashed rounded-full opacity-30"
                    style={{
                      width: `${Math.min(nearbyRadius * 4, 200)}px`,
                      height: `${Math.min(nearbyRadius * 4, 200)}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Farmer Location Markers */}
            {nearbyProducts.map((product, index) => {
              if (!product.farmer.location) return null;
              
              // Calculate relative position based on distance and direction
              const angle = (index * 45) % 360; // Distribute around circle
              const distance = Math.min(product.distance * 2, 80); // Scale for display
              const x = 50 + (distance * Math.cos(angle * Math.PI / 180)) / 2;
              const y = 50 + (distance * Math.sin(angle * Math.PI / 180)) / 2;

              return (
                <div
                  key={product.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  style={{
                    left: `${Math.max(10, Math.min(90, x))}%`,
                    top: `${Math.max(10, Math.min(90, y))}%`
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className={`relative transition-all duration-300 ${
                    selectedProduct?.id === product.id ? 'scale-125' : 'hover:scale-110'
                  }`}>
                    <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-1 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                      {product.distance?.toFixed(1)}km
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">Legend</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-gray-600">{currentTexts.yourLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-xs text-gray-600">{currentTexts.farmerLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product List Sidebar */}
        <div className="bg-gray-50 overflow-y-auto">
          <div className="p-4 border-b bg-white">
            <h3 className="font-bold text-lg text-gray-800">
              {currentTexts.nearbyFarmers}
            </h3>
            <p className="text-sm text-gray-600">
              {nearbyProducts.length} products found
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            {nearbyProducts.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No farmers found</p>
                <p className="text-sm text-gray-400">Try increasing the search radius</p>
              </div>
            ) : (
              nearbyProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg p-4 shadow-sm border cursor-pointer transition-all duration-300 ${
                    selectedProduct?.id === product.id 
                      ? 'border-green-500 shadow-md ring-2 ring-green-200' 
                      : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">
                        {currentTexts.from} {product.farmer.name}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">
                            {product.distance?.toFixed(1)} {currentTexts.kmAway}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-bold text-sm">
                          {product.currency}{product.price}/{product.unit}
                        </span>
                        <div className="flex gap-1">
                          {product.organicCertified && (
                            <div className="w-2 h-2 bg-green-500 rounded-full" title="Organic"></div>
                          )}
                          {product.deliveryAvailable && (
                            <Truck className="w-3 h-3 text-blue-500" title="Delivery Available" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedProduct?.id === product.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{product.farmer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Package className="w-3 h-3" />
                          <span>{product.inStock ? currentTexts.inStock : currentTexts.outOfStock}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                          {currentTexts.contactFarmer}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;