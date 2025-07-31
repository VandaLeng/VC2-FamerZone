import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  Camera, 
  Download,
  Trash2,
  AlertTriangle,
  Check,
  ChevronRight,
  Settings
} from 'lucide-react';

const BuyerSettings = ({ currentLanguage = 'en' }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    marketingEmails: false,
    profileVisibility: 'public',
    language: 'en',
    currency: 'khr',
    darkMode: false
  });

  // Language texts
  const texts = {
    kh: {
      settings: "ការកំណត់",
      profile: "ប្រវត្តិរូប",
      notifications: "ការជូនដំណឹង",
      privacy: "ភាពឯកជន",
      security: "សុវត្ថិភាព",
      preferences: "ចំណូលចិត្ត",
      personalInfo: "ព័ត៌មានផ្ទាល់ខ្លួន",
      changePassword: "ផ្លាស់ប្តូរពាក្យសម្ងាត់",
      currentPassword: "ពាក្យសម្ងាត់បច្ចុប្បន្ន",
      newPassword: "ពាក្យសម្ងាត់ថ្មី",
      confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
      emailNotifications: "ការជូនដំណឹងតាមអ៊ីមែល",
      smsNotifications: "ការជូនដំណឹងតាម SMS",
      orderUpdates: "ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ",
      promotions: "ការផ្សព្វផ្សាយ",
      marketingEmails: "អ៊ីមែលទីផ្សារ",
      profileVisibility: "ភាពមើលឃើញប្រវត្តិរូប",
      language: "ភាសា",
      currency: "រូបិយប័ណ្ណ",
      darkMode: "របៀបងងឹត",
      dataExport: "នាំចេញទិន្នន័យ",
      deleteAccount: "លុបគណនី",
      public: "សាធារណៈ",
      private: "ឯកជន",
      farmersOnly: "កសិករតែប៉ុណ្ណោះ",
      khmer: "ខ្មែរ",
      english: "English",
      riel: "រៀល",
      dollar: "ដុល្លារ",
      save: "រក្សាទុក",
      cancel: "បោះបង់",
      update: "ធ្វើបច្ចុប្បន្នភាព",
      export: "នាំចេញ",
      deleteAccountWarning: "សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។ វានឹងលុបគណនីរបស់អ្នកនិងទិន្នន័យទាំងអស់។",
      confirmDelete: "បញ្ជាក់ការលុប",
      typeDelete: "វាយបញ្ចូល DELETE ដើម្បីបញ្ជាក់"
    },
    en: {
      settings: "Settings",
      profile: "Profile", 
      notifications: "Notifications",
      privacy: "Privacy",
      security: "Security",
      preferences: "Preferences",
      personalInfo: "Personal Information",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      orderUpdates: "Order Updates",
      promotions: "Promotions",
      marketingEmails: "Marketing Emails",
      profileVisibility: "Profile Visibility",
      language: "Language",
      currency: "Currency",
      darkMode: "Dark Mode",
      dataExport: "Data Export",
      deleteAccount: "Delete Account",
      public: "Public",
      private: "Private",
      farmersOnly: "Farmers Only",
      khmer: "ខ្មែរ",
      english: "English",
      riel: "Riel",
      dollar: "Dollar",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      export: "Export",
      deleteAccountWarning: "This action cannot be undone. This will permanently delete your account and all associated data.",
      confirmDelete: "Confirm Deletion",
      typeDelete: "Type DELETE to confirm"
    }
  };

  const currentTexts = texts[currentLanguage];

  const handleToggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => {
    return (
      <button
        onClick={onChange}
        className={`w-12 h-6 ${enabled ? 'bg-green-500' : 'bg-gray-300'} rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
      >
        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${enabled ? 'right-0.5' : 'left-0.5'} shadow-sm`}></div>
      </button>
    );
  };

  const sections = [
    { id: 'profile', icon: User, label: currentTexts.profile },
    { id: 'security', icon: Shield, label: currentTexts.security },
    { id: 'notifications', icon: Bell, label: currentTexts.notifications },
    { id: 'privacy', icon: Eye, label: currentTexts.privacy },
    { id: 'preferences', icon: Settings, label: currentTexts.preferences }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentTexts.settings}</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              {/* <nav className="space-y-2"> */}
                {sections.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                    {activeSection === id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              {/* </nav> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-8">{currentTexts.personalInfo}</h2>
                
                {/* Profile Picture */}
                <div className="flex items-center space-x-6 mb-8 pb-8 border-b">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow border">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-600 mb-3">Update your profile picture</p>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Upload New
                      </button>
                      <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Basic Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+855 12 345 678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      defaultValue="Phnom Penh, Cambodia"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t mt-8">
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    {currentTexts.save} Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                
                {/* Password Change */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.changePassword}</h2>
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.currentPassword}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.newPassword}
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentTexts.confirmPassword}
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                      {currentTexts.update} Password
                    </button>
                  </div>
                </div>

                {/* Account Verification Status */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Account Verification</h2>
                  
                  <div className="space-y-4">
                    {/* Phone Verification */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Phone Number</h3>
                          <p className="text-sm text-gray-600">+855 12 *** 678</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Verified</span>
                      </div>
                    </div>

                    {/* Email Verification */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Email Address</h3>
                          <p className="text-sm text-gray-600">john.doe@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.notifications}</h2>
                
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{currentTexts.emailNotifications}</h3>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <ToggleSwitch 
                      enabled={settings.emailNotifications}
                      onChange={() => handleToggleSetting('emailNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{currentTexts.orderUpdates}</h3>
                      <p className="text-sm text-gray-600">Order status changes and confirmations</p>
                    </div>
                    <ToggleSwitch 
                      enabled={settings.orderUpdates}
                      onChange={() => handleToggleSetting('orderUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{currentTexts.promotions}</h3>
                      <p className="text-sm text-gray-600">Special offers and seasonal deals</p>
                    </div>
                    <ToggleSwitch 
                      enabled={settings.promotions}
                      onChange={() => handleToggleSetting('promotions')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{currentTexts.smsNotifications}</h3>
                      <p className="text-sm text-gray-600">Receive SMS alerts for important updates</p>
                    </div>
                    <ToggleSwitch 
                      enabled={settings.smsNotifications}
                      onChange={() => handleToggleSetting('smsNotifications')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.privacy}</h2>
                
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{currentTexts.profileVisibility}</h3>
                      <p className="text-sm text-gray-600">Control who can see your profile information</p>
                    </div>
                    <select 
                      value={settings.profileVisibility}
                      onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-32"
                    >
                      <option value="public">{currentTexts.public}</option>
                      <option value="private">{currentTexts.private}</option>
                      <option value="farmers-only">{currentTexts.farmersOnly}</option>
                    </select>
                  </div>
                  
                  {/* Data Export */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{currentTexts.dataExport}</h3>
                        <p className="text-sm text-gray-600">Download a copy of your account data</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>{currentTexts.export}</span>
                      </button>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-medium text-red-900 mb-2">{currentTexts.deleteAccount}</h3>
                        <p className="text-sm text-red-700 mb-4">{currentTexts.deleteAccountWarning}</p>
                        <button 
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          {currentTexts.deleteAccount}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeSection === 'preferences' && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.preferences}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentTexts.language}
                    </label>
                    <select 
                      value={settings.language}
                      onChange={(e) => handleSelectChange('language', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="en">{currentTexts.english}</option>
                      <option value="kh">{currentTexts.khmer}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentTexts.currency}
                    </label>
                    <select 
                      value={settings.currency}
                      onChange={(e) => handleSelectChange('currency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="khr">{currentTexts.riel} (KHR)</option>
                      <option value="usd">{currentTexts.dollar} (USD)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-8">
                  <div>
                    <h3 className="font-medium text-gray-900">{currentTexts.darkMode}</h3>
                    <p className="text-sm text-gray-600">Switch to dark theme</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.darkMode}
                    onChange={() => handleToggleSetting('darkMode')}
                  />
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    {currentTexts.save} {currentTexts.preferences}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{currentTexts.confirmDelete}</h3>
                <p className="text-gray-600">{currentTexts.deleteAccountWarning}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentTexts.typeDelete}
                  </label>
                  <input
                    type="text"
                    placeholder="DELETE"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {currentTexts.cancel}
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerSettings;