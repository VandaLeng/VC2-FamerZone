import React, { useState } from 'react';
import { Camera, Save, User, MapPin, Phone, Mail, Calendar, Globe, Upload } from 'lucide-react';

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

  const content = {
    en: {
      title: "Profile Settings",
      subtitle: "Manage your personal and farm information",
      personalInfo: "Personal Information",
      farmInfo: "Farm Information",
      contactInfo: "Contact Information",
      
      // Personal fields
      profilePhoto: "Profile Photo",
      fullNameEn: "Full Name (English)",
      fullNameKh: "Full Name (Khmer)",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      
      // Contact fields
      primaryPhone: "Primary Phone",
      secondaryPhone: "Secondary Phone (Optional)",
      email: "Email Address (Optional)",
      homeAddress: "Home Address",
      street: "Street Address",
      district: "District",
      province: "Province",
      postalCode: "Postal Code",
      
      // Farm fields
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
      
      // Buttons
      uploadPhoto: "Upload Photo",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      
      // Placeholders
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
      subtitle: "គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួន និងកសិដ្ឋានរបស់អ្នក",
      personalInfo: "ព័ត៌មានផ្ទាល់ខ្លួន",
      farmInfo: "ព័ត៌មានកសិដ្ឋាន",
      contactInfo: "ព័ត៌មានទំនាក់ទំនង",
      
      // Personal fields
      profilePhoto: "រូបថតប្រវត្តិរូប",
      fullNameEn: "ឈ្មោះពេញ (អង់គ្លេស)",
      fullNameKh: "ឈ្មោះពេញ (ខ្មែរ)",
      dateOfBirth: "ថ្ងៃខែកំណើត",
      gender: "ភេទ",
      male: "ប្រុស",
      female: "ស្រី",
      other: "ផ្សេងទៀត",
      
      // Contact fields
      primaryPhone: "លេខទូរស័ព្ទមេ",
      secondaryPhone: "លេខទូរស័ព្ទបន្ទាប់បន្សំ (ស្រេចចិត្ត)",
      email: "អ៊ីមែល (ស្រេចចិត្ត)",
      homeAddress: "អាសយដ្ឋានផ្ទះ",
      street: "អាសយដ្ឋានផ្លូវ",
      district: "ស្រុក/ខណ្ឌ",
      province: "ខេត្ត/រាជធានី",
      postalCode: "លេខប្រៃសណីយ៍",
      
      // Farm fields
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
      
      // Buttons
      uploadPhoto: "បញ្ចូលរូបថត",
      saveChanges: "រក្សាទុកការផ្លាស់ប្តូរ",
      cancel: "បោះបង់",
      
      // Placeholders
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

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setProfileData(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
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
        setProfileData(prev => ({
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
  };

  const t = content[language];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Custom Styles */}
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
        {/* Header */}
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
          {/* Profile Photo Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-4 text-dark flex items-center">
                <Camera className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.profilePhoto}
              </h3>
              
              <div className="text-center">
                <div className="relative inline-block">
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
                  <label className="absolute bottom-0 right-0 p-2 rounded-full cursor-pointer primary-green text-white hover:opacity-80 transition-opacity">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <button className="w-full py-2 px-4 primary-green text-white rounded-lg hover:opacity-90 transition-opacity">
                  {t.uploadPhoto}
                </button>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.personalInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.fullNameEn} *</label>
                  <input
                    type="text"
                    value={profileData.fullNameEn}
                    onChange={(e) => handleInputChange('fullNameEn', e.target.value)}
                    placeholder={t.enterName}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.fullNameKh} *</label>
                  <input
                    type="text"
                    value={profileData.fullNameKh}
                    onChange={(e) => handleInputChange('fullNameKh', e.target.value)}
                    placeholder={t.enterName}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.dateOfBirth} *</label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.gender} *</label>
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
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <Phone className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.contactInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.primaryPhone} *</label>
                  <input
                    type="tel"
                    value={profileData.primaryPhone}
                    onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                    placeholder={t.enterPhone}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.secondaryPhone}</label>
                  <input
                    type="tel"
                    value={profileData.secondaryPhone}
                    onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                    placeholder={t.enterPhone}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-dark">{t.email}</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t.enterEmail}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              {/* Home Address */}
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-4 text-dark flex items-center">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#8B4513' }} />
                  {t.homeAddress}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-dark">{t.street} *</label>
                    <input
                      type="text"
                      value={profileData.homeAddress.street}
                      onChange={(e) => handleInputChange('street', e.target.value, 'homeAddress')}
                      placeholder={t.enterAddress}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">{t.district} *</label>
                    <input
                      type="text"
                      value={profileData.homeAddress.district}
                      onChange={(e) => handleInputChange('district', e.target.value, 'homeAddress')}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">{t.province} *</label>
                    <select
                      value={profileData.homeAddress.province}
                      onChange={(e) => handleInputChange('province', e.target.value, 'homeAddress')}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">{t.selectProvince}</option>
                      {cambodianProvinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="bg-white p-6 rounded-xl shadow-custom">
              <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
                <MapPin className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
                {t.farmInfo}
              </h3>
              
              {/* Farm Location */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-4 text-dark">{t.farmLocation}</h4>
                <p className="text-sm mb-4" style={{ color: '#8B4513' }}>{t.farmLocationDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-dark">{t.street}</label>
                    <input
                      type="text"
                      value={profileData.farmLocation.street}
                      onChange={(e) => handleInputChange('street', e.target.value, 'farmLocation')}
                      placeholder={t.enterAddress}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">{t.district}</label>
                    <input
                      type="text"
                      value={profileData.farmLocation.district}
                      onChange={(e) => handleInputChange('district', e.target.value, 'farmLocation')}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">{t.province}</label>
                    <select
                      value={profileData.farmLocation.province}
                      onChange={(e) => handleInputChange('province', e.target.value, 'farmLocation')}
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">{t.selectProvince}</option>
                      {cambodianProvinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-dark">{t.gpsCoordinates}</label>
                    <input
                      type="text"
                      value={profileData.farmLocation.gpsCoordinates}
                      onChange={(e) => handleInputChange('gpsCoordinates', e.target.value, 'farmLocation')}
                      placeholder="12.5657, 104.9910"
                      className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Farm Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.farmSize} *</label>
                  <input
                    type="number"
                    value={profileData.farmSize}
                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                    placeholder="0.5"
                    step="0.1"
                    min="0"
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-dark">{t.farmingExperience} *</label>
                  <input
                    type="number"
                    value={profileData.farmingExperience}
                    onChange={(e) => handleInputChange('farmingExperience', e.target.value)}
                    placeholder={t.enterExperience}
                    min="0"
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-dark">{t.primaryCrops} *</label>
                  <input
                    type="text"
                    value={profileData.primaryCrops}
                    onChange={(e) => handleInputChange('primaryCrops', e.target.value)}
                    placeholder={t.enterCrops}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-dark">{t.farmingMethods} *</label>
                  <select
                    value={profileData.farmingMethods}
                    onChange={(e) => handleInputChange('farmingMethods', e.target.value)}
                    className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">{t.farmingMethods}</option>
                    <option value="organic">{t.organic}</option>
                    <option value="traditional">{t.traditional}</option>
                    <option value="modern">{t.modern}</option>
                    <option value="mixed">{t.mixed}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                {t.cancel}
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                {t.saveChanges}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfileSettings;