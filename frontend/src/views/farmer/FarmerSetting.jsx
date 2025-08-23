// File: FarmerProfileSettings.jsx
import React, { useState, useEffect } from "react";
import { Camera, User, Save, Edit, Lock } from "lucide-react";
import { profileAPI, provincesAPI } from "../../stores/api";

const FarmerProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    province_id: "",
    profilePhoto: null,
    role: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchProvinces();
  }, []);

  // ✅ Get farmer profile from API
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await profileAPI.getProfile();
      console.log("Profile response:", response);

      if (response.status === "success" && response.data) {
        const userData = response.data;

        // Check if user is a farmer
        if (userData.role !== "farmer") {
          setError("អ្នកមិនមែនជាកសិករទេ។ សូមចូលប្រើជាកសិករ។");
          return;
        }

        // Handle province data properly - FIXED
        let provinceName = "";
        let provinceId = "";
        
        if (userData.province) {
          if (typeof userData.province === 'object' && userData.province.province_name) {
            provinceName = userData.province.province_name;
            provinceId = userData.province.id ? String(userData.province.id) : String(userData.province_id || "");
          } else if (typeof userData.province === 'string') {
            provinceName = userData.province;
            provinceId = String(userData.province_id || "");
          }
        } else if (userData.province_id) {
          provinceId = String(userData.province_id);
          // Find province name from provinces list if available
          const foundProvince = provinces.find(p => String(p.id) === String(userData.province_id));
          provinceName = foundProvince ? foundProvince.province_name : "";
        }

        // Set profile data with proper province handling - FIXED
        setProfileData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          province: provinceName,
          province_id: provinceId,
          profilePhoto: userData.image_url || null,
          role: userData.role || "",
        });
        setError(null);
      } else {
        setError("មិនអាចទាញយកទិន្នន័យប្រវត្តិរូបបានទេ");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(
        err.response?.status === 401
          ? "មិនមានសិទ្ធិ៖ សូមចូលគណនីម្តងទៀត"
          : err.response?.data?.message ||
              "បរាជ័យក្នុងការទាញយកទិន្នន័យប្រវត្តិរូប"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get provinces list with error handling - FIXED
  const fetchProvinces = async () => {
    try {
      const response = await provincesAPI.getAll();
      console.log("Provinces response:", response);
      if (response.data && Array.isArray(response.data)) {
        setProvinces(response.data);
      } else if (response.provinces && Array.isArray(response.provinces)) {
        setProvinces(response.provinces);
      } else {
        setProvinces([]);
        setError("ទិន្នន័យខេត្តមិនមាន");
      }
    } catch (err) {
      console.error("Failed to fetch provinces:", err);
      setError("បរាជ័យក្នុងការទាញយកបញ្ជីខេត្ត");
    }
  };

  // ✅ Handle input changes, including province_id - FIXED
  const handleInputChange = (field, value) => {
    setProfileData((prev) => {
      const updatedData = { ...prev, [field]: value };

      if (field === "province_id") {
        const selectedProvince = provinces.find((prov) => String(prov.id) === value);
        updatedData.province = selectedProvince ? selectedProvince.province_name : "";
      }

      return updatedData;
    });
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  // ✅ Upload photo with proper file input handling - FIXED
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("សូមជ្រើសរើសរូបថត");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("រូបថតត្រូវតែតិចជាង 2MB");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError("សូមជ្រើសរើសរូបថតប្រភេទ JPG, PNG, ឬ GIF");
      return;
    }

    try {
      setImageUploading(true);
      setError(null);

      console.log("Uploading file:", file.name, file.type, file.size);

      const response = await profileAPI.updateProfileImage(file);
      console.log("Image upload response:", response);

      if (response.status === "success") {
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: response.data.image_url,
        }));
        setSuccess("រូបថតបានផ្ទុកជោគជ័យ");

        // Update localStorage with new image URL - FIXED
        const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
        userData.image = response.data.image;
        userData.image_url = response.data.image_url;
        localStorage.setItem("user_data", JSON.stringify(userData));
      } else {
        setError("មិនអាចផ្ទុករូបថតបានទេ");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "បរាជ័យក្នុងការផ្ទុករូបថត"
      );
    } finally {
      setImageUploading(false);
      // Clear the file input
      e.target.value = '';
    }
  };

  // ✅ Save profile changes - FIXED
  const handleSave = async () => {
    try {
      setError(null);

      // Validate required fields
      if (!profileData.name.trim()) {
        setError("សូមបញ្ចូលឈ្មោះ");
        return;
      }

      if (!profileData.email.trim()) {
        setError("សូមបញ្ចូលអ៊ីមែល");
        return;
      }

      const updateData = {
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        phone: profileData.phone?.trim() || null,
        province_id: profileData.province_id || null,
      };

      console.log("Updating profile with:", updateData);

      const response = await profileAPI.updateProfile(updateData);
      console.log("Profile update response:", response);

      if (response.status === "success") {
        setSuccess("ប្រវត្តិរូបបានធ្វើបច្ចុប្បន្នភាពជោគជ័យ");
        setIsEditing(false);

        // Update localStorage with new data - FIXED
        const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
        userData.name = response.data.name;
        userData.email = response.data.email;
        userData.phone = response.data.phone;
        userData.province_id = response.data.province_id;
        
        // Handle province data properly - FIXED
        if (response.data.province) {
          if (typeof response.data.province === 'object') {
            userData.province = response.data.province.province_name;
          } else {
            userData.province = response.data.province;
          }
        }
        
        localStorage.setItem("user_data", JSON.stringify(userData));

        // Refresh profile data
        await fetchProfileData();
      } else {
        setError("មិនអាចធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូបបានទេ");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err.response?.data?.message ||
          "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូប"
      );
    }
  };

  // ✅ Handle password change
  const handlePasswordChange = async () => {
    if (!passwordData.current_password) {
      setError("សូមបញ្ចូលលេខសម្ងាត់បច្ចុប្បន្ន");
      return;
    }

    if (!passwordData.password) {
      setError("សូមបញ្ចូលលេខសម្ងាត់ថ្មី");
      return;
    }

    if (passwordData.password !== passwordData.password_confirmation) {
      setError("លេខសម្ងាត់ថ្មីមិនត្រូវគ្នា");
      return;
    }

    if (passwordData.password.length < 6) {
      setError("លេខសម្ងាត់ថ្មីត្រូវមានយ៉ាងហោចណាស់ ៦ តួរអក្សរ");
      return;
    }

    try {
      setError(null);
      const response = await profileAPI.changePassword(passwordData);
      console.log("Password change response:", response);
      
      if (response.status === "success") {
        setSuccess("លេខសម្ងាត់បានផ្លាស់ប្តូរជោគជ័យ");
        setPasswordData({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
        setIsChangingPassword(false);
      } else {
        setError(response.message || "មិនអាចផ្លាស់ប្តូរលេខសម្ងាត់បានទេ");
      }
    } catch (err) {
      console.error("Password change error:", err);
      setError(
        err.response?.data?.message || "មិនអាចផ្លាស់ប្តូរលេខសម្ងាត់បានទេ"
      );
    }
  };

  const handleCancel = () => {
    fetchProfileData();
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-center text-gray-600">កំពុងទាញយកទិន្នន័យ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-2">
            ការកំណត់ប្រវត្តិរូបកសិករ
          </h1>
          <p className="text-lg opacity-90">គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearMessages}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg mb-4 flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={clearMessages}
              className="text-green-700 hover:text-green-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Photo */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <Camera className="w-5 h-5 mr-2" /> រូបថតប្រវត្តិរូប
            </h3>
            <div className="text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-600">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Image failed to load:", profileData.profilePhoto);
                      e.target.src = "/placeholder-profile.png";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                {imageUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              <label
                htmlFor="profile-photo-upload"
                className={`cursor-pointer bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center ${imageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Camera className="w-4 h-4 mr-2" />
                {imageUploading ? "កំពុងផ្ទុក..." : "ផ្ទុករូបថត"}
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/jpg"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={imageUploading}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
               <br />
                ប្រភេទ៖ JPG, PNG, GIF
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <User className="w-5 h-5 mr-2" /> ព័ត៌មានផ្ទាល់ខ្លួន
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ឈ្មោះពេញ <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="បញ្ចូលឈ្មោះពេញ"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg border">
                    {profileData.name || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  អ៊ីមែល <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="បញ្ចូលអ៊ីមែល"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg border">
                    {profileData.email || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  លេខទូរស័ព្ទ
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg border">
                    {profileData.phone || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>

              {/* Province - FIXED */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ខេត្ត/ទីក្រុង
                </label>
                {isEditing ? (
                  <select
                    value={profileData.province_id}
                    onChange={(e) => handleInputChange("province_id", e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="">-- ជ្រើសរើសខេត្ត --</option>
                    {provinces.length > 0 ? (
                      provinces.map((prov) => (
                        <option key={prov.id} value={String(prov.id)}>
                          {prov.province_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        គ្មានខេត្តអាចរកបាន
                      </option>
                    )}
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg border">
                    {profileData.province || "គ្មានខេត្តត្រូវបានជ្រើសរើស"}
                  </p>
                )}
              </div>

              {/* Role (Read Only) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  តួនាទី
                </label>
                <p className="p-3 bg-green-50 rounded-lg border border-green-200 text-green-700 font-medium">
                  {profileData.role === "farmer" ? "កសិករ" : profileData.role}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-end gap-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    បោះបង់
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    រក្សាទុក
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    ផ្លាស់ប្តូរលេខសម្ងាត់
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    កែប្រែ
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        {isChangingPassword && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
              <Lock className="w-5 h-5 mr-2" /> ផ្លាស់ប្តូរលេខសម្ងាត់
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  លេខសម្ងាត់បច្ចុប្បន្ន <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, current_password: e.target.value })
                  }
                  placeholder="បញ្ចូលលេខសម្ងាត់បច្ចុប្បន្ន"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  លេខសម្ងាត់ថ្មី <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, password: e.target.value })
                  }
                  placeholder="បញ្ចូលលេខសម្ងាត់ថ្មី"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  បញ្ជាក់លេខសម្ងាត់ថ្មី <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordData.password_confirmation}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, password_confirmation: e.target.value })
                  }
                  placeholder="បញ្ជាក់លេខសម្ងាត់ថ្មី"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({
                    current_password: "",
                    password: "",
                    password_confirmation: "",
                  });
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                បោះបង់
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={
                  !passwordData.current_password ||
                  !passwordData.password ||
                  !passwordData.password_confirmation
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Lock className="w-4 h-4 mr-2" />
                ផ្លាស់ប្តូរ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProfileSettings;