import React from 'react';
import { Shield, Phone, Mail } from 'lucide-react';

const UserSettings = ({ currentLanguage = 'en', userData = {} }) => {
  // Language texts
  const texts = {
    kh: {
      accountSettings: "ការកំណត់គណនី",
      notifications: "ការជូនដំណឹង",
      privacy: "ភាពឯកជន",
      security: "សុវត្ថិភាព",
      language: "ភាសា",
      currency: "រូបិយប័ណ្ណ",
      changePassword: "ផ្លាស់ប្តូរពាក្យសម្ងាត់",
      twoFactorAuth: "ការផ្ទៀងផ្ទាត់ពីរដំណាក់កាល",
      emailNotifications: "ការជូនដំណឹងតាមអ៊ីមែល",
      smsNotifications: "ការជូនដំណឹងតាម SMS",
      orderUpdates: "ការធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញ",
      promotions: "ការផ្សព្វផ្សាយ",
      marketingEmails: "អ៊ីមែលទីផ្សារ",
      enabled: "បានបើក",
      disabled: "បានបិទ",
      khmer: "ខ្មែរ",
      english: "English",
      riel: "រៀល",
      dollar: "ដុល្លារ"
    },
    en: {
      accountSettings: "Account Settings",
      notifications: "Notifications",
      privacy: "Privacy",
      security: "Security",
      language: "Language",
      currency: "Currency",
      changePassword: "Change Password",
      twoFactorAuth: "Two-Factor Authentication",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      orderUpdates: "Order Updates",
      promotions: "Promotions",
      marketingEmails: "Marketing Emails",
      enabled: "Enabled",
      disabled: "Disabled",
      khmer: "ខ្មែរ",
      english: "English",
      riel: "Riel",
      dollar: "Dollar"
    }
  };

  const currentTexts = texts[currentLanguage];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Account Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.accountSettings}</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentTexts.language}
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="en">{currentTexts.english}</option>
              <option value="kh">{currentTexts.khmer}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentTexts.currency}
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="khr">{currentTexts.riel}</option>
              <option value="usd">{currentTexts.dollar}</option>
            </select>
          </div>
          
          <div className="pt-4 border-t">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>{currentTexts.changePassword}</span>
            </button>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{currentTexts.twoFactorAuth}</div>
                <div className="text-sm text-gray-600">Add extra security to your account</div>
              </div>
              <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.notifications}</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{currentTexts.emailNotifications}</div>
              <div className="text-sm text-gray-600">Receive updates via email</div>
            </div>
            <button className="w-12 h-6 bg-green-500 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{currentTexts.smsNotifications}</div>
              <div className="text-sm text-gray-600">Receive SMS alerts</div>
            </div>
            <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{currentTexts.orderUpdates}</div>
              <div className="text-sm text-gray-600">Order status changes</div>
            </div>
            <button className="w-12 h-6 bg-green-500 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{currentTexts.promotions}</div>
              <div className="text-sm text-gray-600">Special offers and deals</div>
            </div>
            <button className="w-12 h-6 bg-green-500 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{currentTexts.marketingEmails}</div>
              <div className="text-sm text-gray-600">Product recommendations</div>
            </div>
            <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{currentTexts.privacy} & {currentTexts.security}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Account Security</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Account Verified</span>
                </div>
                <span className="text-xs text-green-600 font-medium">{currentTexts.enabled}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">Phone Verification</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">{currentTexts.disabled}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">Email Verification</span>
                </div>
                <span className="text-xs text-green-600 font-medium">{currentTexts.enabled}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Privacy Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Visibility</span>
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order History</span>
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>Private</option>
                  <option>Public</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Contact Information</span>
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>Hidden</option>
                  <option>Visible to Farmers</option>
                  <option>Public</option>
                </select>
              </div>
              
              <div className="pt-4 border-t">
                <button className="w-full bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;