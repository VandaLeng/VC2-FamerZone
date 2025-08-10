// File: LocationMap.js
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import provinces from '../services/provinces';

const LocationMap = ({
  userLocation,
  products,
  currentTexts,
  nearbyRadius,
  selectedProvince,
  currentLanguage = "en",
  categories = [],
  onShowDetail
}) => {
  // Default center to Phnom Penh
  const defaultCenter = [11.5564, 104.9282];
  const center = userLocation ? [userLocation.latitude, userLocation.longitude] : defaultCenter;

  // Group products by location and filter by selected province
  const groupedProducts = useMemo(() => {
    const groups = {};
    
    products.forEach(product => {
      let province;
      
      // Try to get province from product.province object first
      if (product.province && product.province.id) {
        province = product.province;
      } else if (product.province_id) {
        // Fallback to finding province by ID
        province = provinces.find(p => p.id === product.province_id);
      }
      
      if (!province) {
        console.warn(`No province found for product: ${product.name}`, product);
        return;
      }
      
      // Filter by selected province if not "all"
      if (selectedProvince !== 'all' && province.id !== selectedProvince) {
        return;
      }
      
      const locationKey = `${province.latitude}-${province.longitude}`;
      
      if (!groups[locationKey]) {
        groups[locationKey] = {
          latitude: parseFloat(province.latitude),
          longitude: parseFloat(province.longitude),
          province: province,
          products: [],
        };
      }
      
      groups[locationKey].products.push({
        ...product,
        province: province // Ensure province is attached to product
      });
    });
    
    return groups;
  }, [products, selectedProvince]);

  const filteredGroups = Object.values(groupedProducts);

  const bounds = useMemo(() => {
    if (filteredGroups.length === 0) return [center];
    
    const bounds = filteredGroups.map(group => [
      group.latitude,
      group.longitude
    ]);
    
    // Add user location to bounds if available
    if (userLocation) {
      bounds.push([userLocation.latitude, userLocation.longitude]);
    }
    
    return bounds;
  }, [filteredGroups, center, userLocation]);

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const userIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconSize: [30, 48],
    iconAnchor: [15, 48],
    popupAnchor: [1, -40],
  });

  const getCategoryName = (categoryId) => {
    if (!categories || categories.length === 0) return "Unknown";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '500px', width: '100%' }}
        bounds={filteredGroups.length > 0 ? bounds : undefined}
        boundsOptions={{ padding: [50, 50] }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {userLocation && (
          <>
            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-blue-600">{currentTexts.yourLocation}</h3>
                  <p className="text-sm">{userLocation.city}, {userLocation.country}</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.latitude, userLocation.longitude]}
              radius={nearbyRadius * 1000}
              pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1, weight: 2 }}
            />
          </>
        )}

        {filteredGroups.map((group, index) => (
          <Marker
            key={index}
            position={[group.latitude, group.longitude]}
            icon={customIcon}
          >
            <Popup maxWidth={300}>
              <div className="space-y-2 max-w-xs">
                <h3 className="font-bold text-green-600">
                  {currentLanguage === "kh" ? group.province.nameKh : group.province.province_name}
                </h3>
                <p className="text-sm text-gray-600">
                  {group.province.city}, {group.province.country}
                </p>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <p className="font-semibold text-sm">
                    {currentTexts.products || 'Products'} ({group.products.length}):
                  </p>
                  {group.products.slice(0, 5).map((product) => (
                    <div 
                      key={product.id} 
                      className="text-sm border-b border-gray-100 pb-1 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      onClick={() => onShowDetail && onShowDetail(product)}
                    >
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-semibold">
                          ${product.price || 0}/{product.unit || "unit"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getCategoryName(product.category_id)}
                        </span>
                      </div>
                      {product.is_popular && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                  ))}
                  {group.products.length > 5 && (
                    <p className="text-xs text-gray-500 italic">
                      +{group.products.length - 5} more products...
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;