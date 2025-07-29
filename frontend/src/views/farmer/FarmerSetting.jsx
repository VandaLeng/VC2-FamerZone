import React, { useState, useEffect } from 'react';
import { Camera, User, MapPin, Phone, Mail, Calendar, Globe, Save, Edit } from 'lucide-react';

const FarmerProfileSettings = () => {
  const [language, setLanguage] = useState('en');
  const [profileData, setProfileData] = useState({
    profilePhoto: null,
    fullNameEn: '',
    fullNameKh: '',
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

  const content = {
    en: {
      title: "Profile Settings",
      subtitle: "View your personal and farm information",
      personalInfo: "Personal Information",
      farmInfo: "Farm Information",
      contactInfo: "Contact Information",
      profilePhoto: "Profile Photo",
      fullNameEn: "Full Name (English)",
      fullNameKh: "Full Name (Khmer)",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      primaryPhone: "Primary Phone",
      secondaryPhone: "Secondary Phone (Optional)",
      email: "Email Address (Optional)",
      homeAddress: "Home Address",
      street: "Street Address",
      district: "District",
      province: "Province",
      postalCode: "Postal Code",
      farmLocation: "Farm Location",
      farmLocationDesc: "Farm address (if different from home)",
      gpsCoordinates: "GPS Coordinates (Optional)",
      farmSize: "Farm Size (Hectares)",
      primaryCrops: "Primary Crops",
      farmingExperience: "Years of Farming Experience",
      farmingMethods: "Farming Methods",
      organic: "Organic",
      traditional: "Traditional",
      modern: "Modern",
      mixed: "Mixed Methods",
      update: "Update",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      enterName: "Enter your full name",
      enterPhone: "Enter phone number",
      enterEmail: "Enter email address",
      enterAddress: "Enter address",
      selectProvince: "Select Province",
      enterCrops: "e.g., Rice, Corn, Vegetables",
      enterExperience: "Enter years of experience"
    },
    kh: {
      title: "ការកំណត់ប្រវត្តិរូប",
      subtitle: "មើលព័ត៌មានផ្ទាល់ខ្លួន និងកសិដ្ឋានរបស់អ្នក",
      personalInfo: "ព័ត៌មានផ្ទាល់ខ្លួន",
      farmInfo: "ព័ត៌មានកសិដ្ឋាន",
      contactInfo: "ព័ត៌មានទំនាក់ទំនង",
      profilePhoto: "រូបថតប្រវត្តិរូប",
      fullNameEn: "ឈ្មោះពេញ (អង់គ្លេស)",
      fullNameKh: "ឈ្មោះពេញ (ខ្មែរ)",
      dateOfBirth: "ថ្ងៃខែកំណើត",
      gender: "ភេទ",
      male: "ប្រុស",
      female: "ស្រី",
      other: "ផ្សេងទៀត",
      primaryPhone: "លេខទូរស័ព្ទមេ",
      secondaryPhone: "លេខទូរស័ព្ទបន្ទាប់បន្សំ (ស្រេចចិត្ត)",
      email: "អ៊ីមែល (ស្រេចចិត្ត)",
      homeAddress: "អាសយដ្ឋានផ្ទះ",
      street: "អាសយដ្ឋានផ្លូវ",
      district: "ស្រុក/ខណ្ឌ",
      province: "ខេត្ត/រាជធានី",
      postalCode: "លេខប្រៃសណីយ៍",
      farmLocation: "ទីតាំងកសិដ្ឋាន",
      farmLocationDesc: "អាសយដ្ឋានកសិដ្ឋាន (ប្រសិនបើខុសពីផ្ទះ)",
      gpsCoordinates: "កូអរដោនេ GPS (ស្រេចចិត្ត)",
      farmSize: "ទំហំកសិដ្ឋាន (ហិកតា)",
      primaryCrops: "ដំណាំចម្បង",
      farmingExperience: "ចំនួនឆ្នាំបទពិសោធន៍កសិកម្ម",
      farmingMethods: "វិធីសាស្ត្រកសិកម្ម",
      organic: "កសិកម្មធម្មជាតិ",
      traditional: "កសិកម្មបុរាណ",
      modern: "កសិកម្មទំនើប",
      mixed: "វិធីសាស្ត្របញ្ចូលគ្នា",
      update: "ធ្វើបច្ចុប្បន្នភាព",
      saveChanges: "រក្សាទុកការផ្លាស់ប្តូរ",
      cancel: "បោះបង់",
      enterName: "បញ្ចូលឈ្មោះពេញរបស់អ្នក",
      enterPhone: "បញ្ចូលលេខទូរស័ព្ទ",
      enterEmail: "បញ្ចូលអ៊ីមែល",
      enterAddress: "បញ្ចូលអាសយដ្ឋាន",
      selectProvince: "ជ្រើសរើសខេត្ត",
      enterCrops: "ឧ. ស្រូវ ពោត បន្លែ",
      enterExperience: "បញ្ចូលចំនួនឆ្នាំបទពិសោធន៍"
    }
  };

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
          fullNameEn: userData.name || '',
          fullNameKh: userData.name || '',
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
    alert(language === 'en' ? 'Profile saved successfully!' : 'ការរក្សាទុកប្រវត្តិរូបបានជោគជ័យ!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (userData) {
      setProfileData((prev) => ({
        ...prev,
        fullNameEn: userData.name || '',
        fullNameKh: userData.name || '',
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

  const t = content[language];

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
              <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
              <p className="text-xl opacity-90">{t.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'kh' : 'en')}
                className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'en' ? 'ខ្មែរ' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-4 text-dark flex items-center">
                <Camera className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.profilePhoto}
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
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.personalInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.fullNameEn}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullNameEn}
                      onChange={(e) => handleInputChange('fullNameEn', e.target.value)}
                      placeholder={t.enterName}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.fullNameEn || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.fullNameKh}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullNameKh}
                      onChange={(e) => handleInputChange('fullNameKh', e.target.value)}
                      placeholder={t.enterName}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.fullNameKh || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.dateOfBirth}</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.dateOfBirth || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.gender}</label>
                  {isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">{t.gender}</option>
                      <option value="male">{t.male}</option>
                      <option value="female">{t.female}</option>
                      <option value="other">{t.other}</option>
                    </select>
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.gender || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <Phone className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.contactInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.primaryPhone}</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.primaryPhone}
                      onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                      placeholder={t.enterPhone}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.primaryPhone || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.secondaryPhone}</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.secondaryPhone}
                      onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                      placeholder={t.enterPhone}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.secondaryPhone || 'Not provided'}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-dark">{t.email}</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t.enterEmail}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData.email || 'Not provided'}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4 text-dark flex items-center">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#8B4513' }} />
                  {t.homeAddress}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-dark">{t.street}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.homeAddress.street}
                        onChange={(e) => handleInputChange('street', e.target.value, 'homeAddress')}
                        placeholder={t.enterAddress}
                        className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="p-2 bg-gray-100 rounded-lg">{profileData.homeAddress.street || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">{t.district}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.homeAddress.district}
                        onChange={(e) => handleInputChange('district', e.target.value, 'homeAddress')}
                        className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="p-2 bg-gray-100 rounded-lg">{profileData.homeAddress.district || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">{t.province}</label>
                    {isEditing ? (
                      <select
                        value={profileData.homeAddress.province}
                        onChange={(e) => handleInputChange('province', e.target.value, 'homeAddress')}
                        className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">{t.selectProvince}</option>
                        {cambodianProvinces.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="p-2 bg-gray-100 rounded-lg">{profileData.homeAddress.province || 'Not provided'}</p>
                    )}
                  </div>
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
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {t.saveChanges}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  {t.update}
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