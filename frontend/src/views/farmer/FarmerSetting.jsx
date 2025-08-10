// import React, { useState, useEffect } from 'react';
// import { Camera, User, MapPin, Phone, Mail, Save, Edit } from 'lucide-react';
// import axios from 'axios';

// const FarmerProfileSettings = () => {
//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     profilePhoto: null,
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('មិនមាននិមិត្តសញ្ញាកំណត់អត្តសញ្ញាណទេ');
//       }
//       const response = await axios.get('/api/profile', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Profile Response:', response.data); // Debug response
//       const userData = response.data.data;
//       setProfileData({
//         name: userData.name || '',
//         email: userData.email || '',
//         phone: userData.phone || '',
//         address: userData.address || '',
//         profilePhoto: userData.image ? `/storage/users/${userData.image}` : null,
//       });
//       setError(null);
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || 'មិនអាចទាញយកទិន្នន័យប្រវត្តិរូបបានទេ';
//       setError(errorMessage);
//       console.error('Fetch profile error:', err);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setProfileData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handlePhotoUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('image', file);
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('មិនមាននិមិត្តសញ្ញាកំណត់អត្តសញ្ញាណ');
//         }
//         const response = await axios.put('/api/profile', formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log('Image Upload Response:', response.data); // Debug response
//         setProfileData((prev) => ({
//           ...prev,
//           profilePhoto: response.data.user.image ? `/storage/users/${response.data.user.image}` : null,
//         }));
//         setSuccess('បានផ្ទុករូបថតដោយជោគជ័យ');
//         setError(null);
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message || 'មិនអាចផ្ទុករូបថតបានទេ';
//         setError(errorMessage);
//         console.error('Image upload error:', err);
//       }
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('មិនមាននិមិត្តសញ្ញាកំណត់អត្តសញ្ញាណ');
//       }
//       const response = await axios.put(
//         '/api/profile',
//         {
//           name: profileData.name,
//           email: profileData.email,
//           phone: profileData.phone,
//           address: profileData.address,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log('Update Response:', response.data); // Debug response
//       setSuccess('ការរក្សាទុកប្រវត្តិរូបបានជោគជ័យ!');
//       setIsEditing(false);
//       setError(null);
//       fetchProfileData(); // Refresh data after update
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || 'មិនអាចរក្សាទុកការផ្លាស់ប្តូរបានទេ';
//       setError(errorMessage);
//       console.error('Update profile error:', err);
//     }
//   };

//   const handleCancel = () => {
//     fetchProfileData();
//     setIsEditing(false);
//     setError(null);
//     setSuccess(null);
//   };

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
//       <style jsx>{`
//         .primary-green { background-color: #228B22; }
//         .secondary-brown { background-color: #8B4513; }
//         .text-dark { color: #333333; }
//         .border-custom { border-color: #e0e0e0; }
//         .shadow-custom { box-shadow: 0 4px 15px rgba(34, 139, 34, 0.1); }
//         .gradient-header { background: linear-gradient(135deg, #228B22, #2D5016); }
//       `}</style>

//       <div className="max-w-6xl mx-auto p-6">
//         <div className="gradient-header text-white p-8 rounded-xl mb-8 shadow-custom">
//           <h1 className="text-3xl font-bold mb-2">ការកំណត់ប្រវត្តិរូប</h1>
//           <p className="text-xl opacity-90">មើល និងកែប្រែព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
//         </div>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>
//         )}
//         {success && (
//           <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{success}</div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-custom">
//               <h3 className="text-xl font-semibold mb-4 text-dark flex items-center">
//                 <Camera className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
//                 រូបថតប្រវត្តិរូប
//               </h3>
//               <div className="text-center">
//                 <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4" style={{ borderColor: '#228B22' }}>
//                   {profileData.profilePhoto ? (
//                     <img
//                       src={profileData.profilePhoto}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#F5F5DC' }}>
//                       <User className="w-12 h-12" style={{ color: '#8B4513' }} />
//                     </div>
//                   )}
//                 </div>
//                 {isEditing && (
//                   <label className="cursor-pointer primary-green text-white p-2 rounded-lg hover:opacity-80 transition-opacity">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handlePhotoUpload}
//                       className="hidden"
//                     />
//                     ផ្ទុករូបថត
//                   </label>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white p-6 rounded-xl shadow-custom">
//               <h3 className="text-xl font-semibold mb-6 text-dark flex items-center">
//                 <User className="w-5 h-5 mr-2" style={{ color: '#228B22' }} />
//                 ព័ត៌មានផ្ទាល់ខ្លួន
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-dark">ឈ្មោះពេញ</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={profileData.name}
//                       onChange={(e) => handleInputChange('name', e.target.value)}
//                       placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
//                       className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   ) : (
//                     <p className="p-2 bg-gray-100 rounded-lg">{profileData.name || 'មិនបានផ្តល់'}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-dark">អ៊ីមែល</label>
//                   {isEditing ? (
//                     <input
//                       type="email"
//                       value={profileData.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       placeholder="បញ្ចូលអ៊ីមែល"
//                       className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   ) : (
//                     <p className="p-2 bg-gray-100 rounded-lg">{profileData.email || 'មិនបានផ្តល់'}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-dark">លេខទូរស័ព្ទ</label>
//                   {isEditing ? (
//                     <input
//                       type="tel"
//                       value={profileData.phone}
//                       onChange={(e) => handleInputChange('phone', e.target.value)}
//                       placeholder="បញ្ចូលលេខទូរស័ព្ទ"
//                       className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   ) : (
//                     <p className="p-2 bg-gray-100 rounded-lg">{profileData.phone || 'មិនបានផ្តល់'}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-dark">អាសយដ្ឋាន</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={profileData.address}
//                       onChange={(e) => handleInputChange('address', e.target.value)}
//                       placeholder="បញ្ចូលអាសយដ្ឋាន"
//                       className="w-full p-3 border border-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                     />
//                   ) : (
//                     <p className="p-2 bg-gray-100 rounded-lg">{profileData.address || 'មិនបានផ្តល់'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 justify-end">
//               {isEditing ? (
//                 <>
//                   <button
//                     onClick={handleCancel}
//                     className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     បោះបង់
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
//                   >
//                     <Save className="w-5 h-5 mr-2" />
//                     រក្សាទុកការផ្លាស់ប្តូរ
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="px-8 py-3 primary-green text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
//                 >
//                   <Edit className="w-5 h-5 mr-2" />
//                   ធ្វើបច្ចុប្បន្នភាព
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerProfileSettings;


import React, { useState, useEffect } from 'react';
import { Camera, User, Save, Edit } from 'lucide-react';
import axios from 'axios';

const FarmerProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
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
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authorization token found');

      const response = await axios.get('/api/profile', { // Changed to /api/profile
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API Response:', response.data); // Debug: Inspect response

      const userData = response.data.data; // Changed to response.data.data to match getProfile
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        profilePhoto: userData.image ? `/storage/users/${userData.image}` : null,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err); // Debug: Log full error
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
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authorization token found');

      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/api/profile/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image Upload Response:', response.data); // Debug: Inspect response

      setProfileData((prev) => ({
        ...prev,
        profilePhoto: response.data.user?.image ? `/storage/users/${response.data.user.image}` : null,
      }));
      setSuccess('Image uploaded successfully');
      setError(null);
    } catch (err) {
      console.error('Error uploading image:', err); // Debug: Log full error
      setError(err.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authorization token found');

      const response = await axios.put(
        '/api/profile',
        {
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Profile Update Response:', response.data); // Debug: Inspect response

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setError(null);
      fetchProfileData();
    } catch (err) {
      console.error('Error updating profile:', err); // Debug: Log full error
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
        <div className="bg-green-700 text-white p-8 rounded-xl mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">ការកំណត់ប្រវត្តិរូប</h1>
          <p className="text-xl opacity-90">មើល និងកែប្រែព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{success}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
              <Camera className="w-5 h-5 mr-2" /> រូបថតប្រវត្តិរូប
            </h3>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-700">
                {profileData.profilePhoto ? (
                  <img src={profileData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-beige">
                    <User className="w-12 h-12 text-brown-700" />
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

          <div className="lg:col-span-2 space-y-8 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-green-700">
              <User className="w-5 h-5 mr-2" /> ព័ត៌មានផ្ទាល់ខ្លួន
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'email', 'phone', 'address'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {field === 'name' && 'ឈ្មោះពេញ'}
                    {field === 'email' && 'អ៊ីមែល'}
                    {field === 'phone' && 'លេខទូរស័ព្ទ'}
                    {field === 'address' && 'អាសយដ្ឋាន'}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={profileData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={`បញ្ចូល${field === 'name' ? 'ឈ្មោះពេញ' : ''}${field === 'email' ? 'អ៊ីមែល' : ''}${field === 'phone' ? 'លេខទូរស័ព្ទ' : ''}${field === 'address' ? 'អាសយដ្ឋាន' : ''}`}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profileData[field] || 'មិនបានផ្តល់'}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              {isEditing ? (
                <>
                  <button onClick={handleCancel} className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
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