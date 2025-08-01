import React, { useState, useEffect } from 'react';
import { Camera, User, MapPin, Phone, Mail, Calendar, Save, Edit } from 'lucide-react';

const FarmerProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    profilePhoto: null,
    fullName: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    homeAddress: {
      street: '',
      district: '',
      province: '',
      postalCode: ''
    },
    farmLocation: {
      street: '',
      district: '',
      province: '',
      gpsCoordinates: ''
    },
    farmSize: '',
    primaryCrops: '',
    farmingExperience: '',
    farmingMethods: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const cambodianProvinces = [
    "Banteay Meanchey", "Battambang", "Kampong Cham", "Kampong Chhnang", 
    "Kampong Speu", "Kampong Thom", "Kampot", "Kandal", "Kep", 
    "Koh Kong", "Kratie", "Mondulkiri", "Oddar Meanchey", "Pailin", 
    "Phnom Penh", "Preah Sihanouk", "Preah Vihear", "Prey Veng", 
    "Pursat", "Ratanakiri", "Siem Reap", "Stung Treng", "Svay Rieng", "Takeo", "Tboung Khmum"
  ];

  useEffect(() => {
    const fetchProfileData = () => {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      if (userData) {
        setProfileData((prev) => ({
          ...prev,
          fullName: userData.name || '',
          email: userData.email || '',
          primaryPhone: userData.phone || '',
          homeAddress: {
            ...prev.homeAddress,
            street: userData.address || ''
          }
        }));
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setProfileData((prev) => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
    alert('ការរក្សាទុកប្រវត្តិរូបបានជោគជ័យ!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (userData) {
      setProfileData((prev) => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || '',
        primaryPhone: userData.phone || '',
        homeAddress: {
          ...prev.homeAddress,
          street: userData.address || ''
        }
      }));
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <style jsx>{`
        .primary-green { background-color: #228B22; }
        .secondary-brown { background-color: #8B4513; }
        .accent-yellow { background-color: #FFD700; }
        .text-dark { color: #333333; }
        .border-custom { border-color: #e0e0e0; }
        .shadow-custom { box-shadow: 0 4px 15px rgba(34, 139, 34, 0.1); }
        .gradient-header { background: linear-gradient(135deg, #228B22, #2D5016); }
      `}</style>

      <div className="max-w-6xl mx-auto p-6">
        <div className="gradient-header text-white p-8 rounded-xl mb-8 shadow-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">ការកំណត់ប្រវត្តិរូប</h1>
              <p className="text-xl opacity-90">មើលព័ត៌មានផ្ទាល់ខ្លួន និងកសិដ្ឋានរបស់អ្នក</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-4 text-dark flex items-center">
                <Camera className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                រូបថតប្រវត្តិរូប
              </h3>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4" style={{ borderColor: '#228B22' }}>
                  {profileData.profilePhoto ? (
                    <img 
                      src={profileData.profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#F5F5DC' }}>
                      <User className="w-12 h-12" style={{ color: '#8B4513' }} />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="cursor-pointer primary-green text-white p-2 rounded-lg hover:opacity-80 transition-opacity">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    ផ្ទុករូបថត
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                ព័ត៌មានផ្ទាល់ខ្លួន
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ឈ្មោះពេញ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.fullName || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ថ្ងៃខែកំណើត</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.dateOfBirth || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ភេទ</label>
                  {isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">ភេទ</option>
                      <option value="male">ប្រុស</option>
                      <option value="female">ស្រី</option>
                      <option value="other">ផ្សេងទៀត</option>
                    </select>
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.gender || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <Phone className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                ព័ត៌មានទំនាក់ទំនង
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">លេខទូរស័ព្ទមេ</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.primaryPhone}
                      onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                      placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.primaryPhone || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">លេខទូរស័ព្ទបន្ទាប់បន្សំ (ស្រេចចិត្ត)</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.secondaryPhone}
                      onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                      placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.secondaryPhone || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-dark">អ៊ីមែល (ស្រេចចិត្ត)</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="បញ្ចូលអ៊ីមែល"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.email || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4 text-dark flex items-center">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#8B4513' }} />
                  អាសយដ្ឋានផ្ទះ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-dark">អាសយដ្ឋានផ្លូវ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.homeAddress.street}
                        onChange={(e) => handleInputChange('street', e.target.value, 'homeAddress')}
                        placeholder="បញ្ចូលអាសយដ្ឋាន"
                        className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="p-2 bg-gray-100 rounded-lg">{profileData.homeAddress.street || 'មិនបានផ្តល់'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">ស្រុក/ខណ្ឌ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.homeAddress.district}
                        onChange={(e) => handleInputChange('district', e.target.value, 'homeAddress')}
                        className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="p-2 bg-gray-100 rounded-lg">{profileData.homeAddress.district || 'មិនបានផ្តល់'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">ខេត្ត/រាជធានី</label>
                    {isEditing ? (
                      <select
                        value={profileData.homeAddress.province}
                        onChange={(e) => handleInputChange('province', e.target.value, 'homeAddress')}
                        className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">ជ្រើសរើសខេត្ត</option>
                        {cambodianProvinces.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-100 rounded-lg">{profileData.homeAddress.province || 'មិនបានផ្តល់'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <MapPin className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                ព័ត៌មានកសិដ្ឋាន
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-dark">អាសយដ្ឋានកសិដ្ឋាន (ប្រសិនបើខុសពីផ្ទះ)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.farmLocation.street}
                      onChange={(e) => handleInputChange('street', e.target.value, 'farmLocation')}
                      placeholder="បញ្ចូលអាសយដ្ឋាន"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmLocation.street || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ស្រុក/ខណ្ឌ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.farmLocation.district}
                      onChange={(e) => handleInputChange('district', e.target.value, 'farmLocation')}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmLocation.district || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ខេត្ត/រាជធានី</label>
                  {isEditing ? (
                    <select
                      value={profileData.farmLocation.province}
                      onChange={(e) => handleInputChange('province', e.target.value, 'farmLocation')}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">ជ្រើសរើសខេត្ត</option>
                      {cambodianProvinces.map((province) => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmLocation.province || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">កូអរដោនេ GPS (ស្រេចចិត្ត)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.farmLocation.gpsCoordinates}
                      onChange={(e) => handleInputChange('gpsCoordinates', e.target.value, 'farmLocation')}
                      placeholder="ឧ. 11.562108, 104.916144"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmLocation.gpsCoordinates || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ទំហំកសិដ្ឋាន (ហិកតា)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      placeholder="ឧ. 5"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmSize || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ដំណាំចម្បង</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.primaryCrops}
                      onChange={(e) => handleInputChange('primaryCrops', e.target.value)}
                      placeholder="ឧ. ស្រូវ ពោត បន្លែ"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.primaryCrops || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">ចំនួនឆ្នាំបទពិសោធន៍កសិកម្ម</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.farmingExperience}
                      onChange={(e) => handleInputChange('farmingExperience', e.target.value)}
                      placeholder="បញ្ចូលចំនួនឆ្នាំបទពិសោធន៍"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmingExperience || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">វិធីសាស្ត្រកសិកម្ម</label>
                  {isEditing ? (
                    <select
                      value={profileData.farmingMethods}
                      onChange={(e) => handleInputChange('farmingMethods', e.target.value)}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">ជ្រើសរើសវិធីសាស្ត្រ</option>
                      <option value="organic">កសិកម្មធម្មជាតិ</option>
                      <option value="traditional">កសិកម្មបុរាណ</option>
                      <option value="modern">កសិកម្មទំនើប</option>
                      <option value="mixed">វិធីសាស្ត្របញ្ចូលគ្នា</option>
                    </select>
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.farmingMethods || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    បោះបង់
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    រក្សាទុកការផ្លាស់ប្តូរ
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  ធ្វើបច្ចុប្បន្នភាព
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfileSettings;