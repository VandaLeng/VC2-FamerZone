import React, { useState, useRef, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Heart, Star, Edit3, Camera, Shield, Package, Award, CreditCard, Save, X, Upload, Loader } from 'lucide-react';
import { userAPI } from '../../stores/api'; // Import your API

const BuyerProfile = ({ currentLanguage = 'en', userData = {} }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Language texts
  const texts = {
    kh: {
      profile: "ប្រវត្តិរូប",
      favorites: "ចូលចិត្ត",
      editProfile: "កែប្រែប្រវត្តិរូប",
      saveChanges: "រក្សាទុក",
      cancel: "បោះបង់",
      personalInfo: "ព័ត៌មានផ្ទាល់ខ្លួន",
      fullName: "ឈ្មោះពេញ",
      email: "អ៊ីមែល",
      phone: "លេខទូរស័ព្ទ",
      address: "អាសយដ្ឋាន",
      bio: "ប្រវត្តិរូបសង្ខេប",
      memberSince: "សមាជិកតាំងពី",
      totalOrders: "ការបញ្ជាទិញសរុប",
      favoriteProducts: "ផលិតផលចូលចិត្ត",
      averageRating: "ការវាយតម្លៃមធ្យម",
      myFavorites: "ផលិតផលចូលចិត្តរបស់ខ្ញុំ",
      addToCart: "បន្ថែមទៅកាតា",
      verifiedAccount: "គណនីបានផ្ទៀងផ្ទាត់",
      trustedBuyer: "អ្នកទិញដែលអាចទុកចិត្តបាន",
      fastPayment: "ការបង់ប្រាក់លឿន",
      excellentReviews: "ការវាយតម្លៃល្អប្រសើរ",
      noFavorites: "អ្នកមិនទាន់មានផលិតផលចូលចិត្តនៅឡើយទេ",
      startShopping: "ចាប់ផ្តើមទិញទំនិញ",
      farmer: "កសិករ",
      uploadImage: "ផ្ទុករូបភាព",
      changePhoto: "ផ្លាស់ប្តូររូបភាព",
      uploading: "កំពុងផ្ទុក..."
    },
    en: {
      profile: "Profile",
      favorites: "Favorites",
      editProfile: "Edit Profile",
      saveChanges: "Save",
      cancel: "Cancel",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      bio: "Bio",
      memberSince: "Member Since",
      totalOrders: "Total Orders",
      favoriteProducts: "Favorite Products",
      averageRating: "Average Rating",
      myFavorites: "My Favorites",
      addToCart: "Add to Cart",
      verifiedAccount: "Verified Account",
      trustedBuyer: "Trusted Buyer",
      fastPayment: "Fast Payment",
      excellentReviews: "Excellent Reviews",
      noFavorites: "You haven't added any favorites yet",
      startShopping: "Start Shopping",
      farmer: "Farmer",
      uploadImage: "Upload Image",
      changePhoto: "Change Photo",
      uploading: "Uploading..."
    }
  };

  const currentTexts = texts[currentLanguage];

  // Initialize buyer data
  const [buyerData, setBuyerData] = useState({
    name: userData?.name || "Chhalote",
    email: userData?.email || "chhalote@gmail.com",
    phone: userData?.phone || "+855 12 345 678",
    address: userData?.address || "Phnom Penh, Cambodia",
    bio: userData?.bio || (currentLanguage === 'kh' ? "ខ្ញុំស្រលាញ់ការទិញស្បៀងពីកសិករក្នុងតំបន់" : "I love buying fresh produce from local farmers"),
    memberSince: userData?.created_at ? new Date(userData.created_at).getFullYear().toString() : "2024",
    totalOrders: userData?.totalOrders || 15,
    favoriteProducts: userData?.favoriteProducts || 8,
    averageRating: userData?.averageRating || 4.9,
    profileImage: userData?.profileImage || userData?.image_url || null,
    isVerified: userData?.isVerified || true,
    trustLevel: userData?.trustLevel || "high"
  });

  // Load user profile on component mount
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response && response.user) {
        setBuyerData(prev => ({
          ...prev,
          name: response.user.name || prev.name,
          email: response.user.email || prev.email,
          phone: response.user.phone || prev.phone,
          address: response.user.address || prev.address,
          bio: response.user.bio || prev.bio,
          profileImage: response.user.image_url || response.user.image || prev.profileImage,
          // Add other fields from API if available
        }));
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);

    try {
      // Upload image using API
      const response = await userAPI.updateProfileImage(file);
      
      if (response && response.user && response.user.image_url) {
        // Update local state with new image URL
        setBuyerData(prev => ({
          ...prev,
          profileImage: response.user.image_url
        }));
        
        // Update localStorage if needed
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        userData.image_url = response.user.image_url;
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        alert('Profile image updated successfully!');
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Sample favorites data
  const favorites = [
    {
      id: 1,
      name: currentLanguage === 'kh' ? "ស្ពៃខ្ជុរ" : "Chinese Kale",
      price: 3000,
      farmer: currentLanguage === 'kh' ? "កសិករ ចាន់ សុភាព" : "Farmer Chan Sophea",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop",
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: currentLanguage === 'kh' ? "ទំពាំងបាយជូរ" : "Tomatoes", 
      price: 4000,
      farmer: currentLanguage === 'kh' ? "កសិករ លី សុវណ្ណ" : "Farmer Lee Sovann",
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&h=200&fit=crop",
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: currentLanguage === 'kh' ? "ត្រកួន" : "Cucumber", 
      price: 2500,
      farmer: currentLanguage === 'kh' ? "កសិករ ពេជ្រ ស្រីមុំ" : "Farmer Pich Sreymom",
      image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200&h=200&fit=crop",
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      name: currentLanguage === 'kh' ? "ស្ពៃបៃតង" : "Lettuce", 
      price: 2000,
      farmer: currentLanguage === 'kh' ? "កសិករ ម៉ាក់ សុវណ្ណា" : "Farmer Mak Sovanna",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=200&fit=crop",
      rating: 4.6,
      inStock: true
    }
  ];

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', buyerData.name);
      formData.append('phone', buyerData.phone);
      formData.append('address', buyerData.address);
      formData.append('bio', buyerData.bio);

      const response = await userAPI.updateProfile(formData);
      
      if (response && response.user) {
        setBuyerData(prev => ({
          ...prev,
          ...response.user
        }));
        alert('Profile updated successfully!');
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleRemoveFavorite = (productId) => {
    console.log('Remove favorite:', productId);
  };

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {buyerData.profileImage ? (
                    <img 
                      src={buyerData.profileImage} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-green-600">
                        {buyerData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Upload button with loading state */}
                <button
                  onClick={triggerFileInput}
                  disabled={imageUploading}
                  className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  title={currentTexts.changePhoto}
                >
                  {imageUploading ? (
                    <Loader className="w-4 h-4 text-gray-600 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
              
              <div className="text-white text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold mb-2">{buyerData.name}</h1>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 text-green-100 mb-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{buyerData.email}</span>
                  </div>
                  {buyerData.isVerified && (
                    <div className="flex items-center space-x-1 bg-green-400 px-3 py-1 rounded-full">
                      <Shield className="w-3 h-3" />
                      <span className="text-xs font-medium">{currentTexts.verifiedAccount}</span>
                    </div>
                  )}
                </div>
                <p className="text-green-100 text-sm max-w-md">{buyerData.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="px-8 py-6 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{buyerData.totalOrders}</div>
                <div className="text-xs text-gray-600">{currentTexts.totalOrders}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{buyerData.favoriteProducts}</div>
                <div className="text-xs text-gray-600">{currentTexts.favoriteProducts}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{buyerData.averageRating}</div>
                <div className="text-xs text-gray-600">{currentTexts.averageRating}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{buyerData.memberSince}</div>
                <div className="text-xs text-gray-600">{currentTexts.memberSince}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6">
          {['profile', 'favorites'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-white/70'
              }`}
            >
              {currentTexts[tab]}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{currentTexts.personalInfo}</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    <span>{isEditing ? currentTexts.cancel : currentTexts.editProfile}</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.fullName}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={buyerData.name}
                          onChange={(e) => setBuyerData({...buyerData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{buyerData.name}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.email}
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{buyerData.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.phone}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={buyerData.phone}
                          onChange={(e) => setBuyerData({...buyerData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{buyerData.phone}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.address}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={buyerData.address}
                          onChange={(e) => setBuyerData({...buyerData, address: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{buyerData.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentTexts.bio}
                    </label>
                    {isEditing ? (
                      <textarea
                        value={buyerData.bio}
                        onChange={(e) => setBuyerData({...buyerData, bio: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{buyerData.bio}</div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>{currentTexts.saveChanges}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{currentTexts.trustedBuyer}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{currentTexts.verifiedAccount}</div>
                      <div className="text-xs text-gray-600">Identity confirmed</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{currentTexts.fastPayment}</div>
                      <div className="text-xs text-gray-600">Quick checkout</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{currentTexts.excellentReviews}</div>
                      <div className="text-xs text-gray-600">High satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{currentTexts.myFavorites}</h2>
              <div className="text-sm text-gray-600">{favorites.length} products</div>
            </div>
            
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product) => (
                  <div key={product.id} className="group border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                    <div className="relative mb-4">
                      <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow opacity-0 group-hover:opacity-100"
                      >
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </button>
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-600">{product.farmer}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-green-600">
                          {product.price.toLocaleString()} KHR
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${
                          product.inStock
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {currentTexts.addToCart}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{currentTexts.noFavorites}</h3>
                <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  {currentTexts.startShopping}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerProfile;