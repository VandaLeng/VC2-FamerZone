import React, { useState, useEffect } from 'react';
import { Camera, User, Save, Edit } from 'lucide-react';
import axios from 'axios';

const FarmerProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    province: '',
    profilePhoto: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('/api/profile', {
        withCredentials: true, // for Laravel Sanctum
      });

      console.log('API Response:', response.data);

      const userData = response.data.data ?? response.data; // adapt to your API structure
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        province: userData.province || '',
        profilePhoto: userData.image ? `/storage/${userData.image}` : null,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(
        err.response?.status === 401
          ? 'Unauthorized: Please log in again'
          : err.response?.data?.message || 'Failed to load profile data'
      );
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/api/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      console.log('Image Upload Response:', response.data);

      setProfileData((prev) => ({
        ...prev,
        profilePhoto: response.data.user?.image
          ? `/storage/${response.data.user.image}`
          : prev.profilePhoto,
      }));
      setSuccess('Image uploaded successfully');
      setError(null);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        '/api/profile',
        {
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          province: profileData.province,
        },
        { withCredentials: true }
      );

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setError(null);
      fetchProfileData();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    fetchProfileData();
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-green-700 text-white p-8 rounded-xl mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">ការកំណត់ប្រវត្តិរូប</h1>
          <p className="text-xl opacity-90">មើល និងកែប្រែព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>

        {/* Alerts */}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{success}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
              <Camera className="w-5 h-5 mr-2" /> រូបថតប្រវត្តិរូប
            </h3>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-700">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="cursor-pointer bg-green-700 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                  ផ្ទុករូបថត
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-8 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-green-700">
              <User className="w-5 h-5 mr-2" /> ព័ត៌មានផ្ទាល់ខ្លួន
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'email', 'phone', 'province'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {field === 'name' && 'ឈ្មោះពេញ'}
                    {field === 'email' && 'អ៊ីមែល'}
                    {field === 'phone' && 'លេខទូរស័ព្ទ'}
                    {field === 'province' && 'ខេត្ត/ទីក្រុង'}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={profileData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={
                        field === 'name'
                          ? 'បញ្ចូលឈ្មោះពេញ'
                          : field === 'email'
                          ? 'បញ្ចូលអ៊ីមែល'
                          : field === 'phone'
                          ? 'បញ្ចូលលេខទូរស័ព្ទ'
                          : 'បញ្ចូលខេត្ត/ទីក្រុង'
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData[field] || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    បោះបង់
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-green-700 text-white rounded-lg hover:opacity-90 flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    រក្សាទុកការផ្លាស់ប្តូរ
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-3 bg-green-700 text-white rounded-lg hover:opacity-90 flex items-center justify-center"
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
