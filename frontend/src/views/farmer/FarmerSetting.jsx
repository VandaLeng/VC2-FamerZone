import React, { useState, useEffect } from "react";
import { Camera, User, Save, Edit, Lock, Eye, EyeOff } from "lucide-react";
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

  // Password state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current_password: false,
    new_password: false,
    new_password_confirmation: false,
  });

  // Fetch provinces and profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesResponse = await provincesAPI.getAll();
        const provinceList = provincesResponse.data || [];
        setProvinces(provinceList);

        await fetchProfileData(provinceList);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("បរាជ័យក្នុងការទាញយកទិន្នន័យ");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch profile data
  const fetchProfileData = async (provinceList = []) => {
    try {
      setIsLoading(true);
      const response = await profileAPI.getProfile();

      if (response.status === "success" && response.data) {
        const userData = response.data;

        if (userData.role !== "farmer") {
          setError("អ្នកមិនមែនជាកសិករទេ។ សូមចូលប្រើជាកសិករ។");
          return;
        }

        let provinceName = "";
        let provinceId = "";

        if (userData.province_id) {
          provinceId = String(userData.province_id);
          const foundProvince = provinceList.find(
            (p) => String(p.id) === provinceId
          );
          provinceName = foundProvince ? foundProvince.province_name : "";
        }

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
        err.response?.data?.message ||
          "បរាជ័យក្នុងការទាញយកទិន្នន័យប្រវត្តិរូប"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setProfileData((prev) => {
      const updatedData = { ...prev, [field]: value };
      if (field === "province_id") {
        const selectedProvince = provinces.find((p) => String(p.id) === value);
        updatedData.province = selectedProvince
          ? selectedProvince.province_name
          : "";
      }
      return updatedData;
    });
    setError(null);
    setSuccess(null);
  };

  // Photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("រូបថតត្រូវតែតិចជាង 2MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("សូមជ្រើសរើសរូបថតប្រភេទ JPG, PNG, ឬ GIF");
      return;
    }

    try {
      setImageUploading(true);
      const response = await profileAPI.updateImage(file);
      console.log("Upload response:", response);
      if (response.status === "success" && response.data?.image_url) {
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: response.data.image_url,
        }));
        setSuccess("រូបថតបានផ្ទុកជោគជ័យ");
      } else {
        setError("មិនអាចផ្ទុករូបថតបានទេ: URL មិនត្រឹមត្រូវ");
        console.error("Invalid response:", response);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError(err.response?.data?.message || "បរាជ័យក្នុងការផ្ទុករូបថត");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      setError(null);
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

      const response = await profileAPI.updateProfile(updateData);
      if (response.status === "success") {
        setSuccess("ប្រវត្តិរូបបានធ្វើបច្ចុប្បន្នភាពជោគជ័យ");
        setIsEditing(false);
        await fetchProfileData(provinces);
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

  // Toggle show/hide password
  const toggleShowPassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Password change
  const handlePasswordChange = async () => {
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (!passwordData.current_password.trim()) {
      setError("សូមបញ្ចូលលេខសម្ងាត់បច្ចុប្បន្ន");
      return;
    }
    if (!passwordData.new_password.trim()) {
      setError("សូមបញ្ចូលលេខសម្ងាត់ថ្មី");
      return;
    }
    if (!passwordData.new_password_confirmation.trim()) {
      setError("សូមបញ្ជាក់លេខសម្ងាត់ថ្មី");
      return;
    }
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setError("លេខសម្ងាត់ថ្មីមិនត្រូវគ្នា");
      return;
    }
    if (passwordData.new_password.length < 6) {
      setError("លេខសម្ងាត់ថ្មីត្រូវមានយ៉ាងហោចណាស់ ៦ តួរអក្សរ");
      return;
    }
    if (/\s/.test(passwordData.new_password)) {
      setError("លេខសម្ងាត់មិនអាចមានដកឃ្លា");
      return;
    }

    try {
      const response = await profileAPI.changePassword({
        current_password: passwordData.current_password.trim(),
        new_password: passwordData.new_password.trim(),
        new_password_confirmation: passwordData.new_password_confirmation.trim(),
      });

      if (response.status === "success") {
        setSuccess("លេខសម្ងាត់បានផ្លាស់ប្តូរជោគជ័យ");
        setPasswordData({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        setShowPasswords({
          current_password: false,
          new_password: false,
          new_password_confirmation: false,
        });
        setIsChangingPassword(false);
      } else {
        setError(response.message || "មិនអាចផ្លាស់ប្តូរលេខសម្ងាត់បានទេ");
      }
    } catch (err) {
      console.error("Password change error:", err);
      const errorMessage =
        err.response?.data?.errors?.current_password?.[0] === "The current password is incorrect"
          ? "លេខសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ"
          : err.response?.data?.errors?.new_password?.[0]
          ? `លេខសម្ងាត់ថ្មីមិនត្រឹមត្រូវ: ${err.response.data.errors.new_password[0]}`
          : err.response?.data?.message || "មិនអាចផ្លាស់ប្តូរលេខសម្ងាត់បានទេ។ សូមពិនិត្យលេខសម្ងាត់បច្ចុប្បន្ន។";
      setError(errorMessage);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    fetchProfileData(provinces);
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (isLoading) {
    return <div className="text-center p-4">កំពុងទាញយកទិន្នន័យ...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-lg mb-6">
          <h1 className="text-2xl font-bold mb-2">កំណត់ប្រវត្តិរូបកសិករ</h1>
          <p>គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-4">
            {success}
          </div>
        )}

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <Camera className="w-5 h-5 mr-2" /> រូបថត
            </h3>
            <div className="text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-600">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image load failed. URL:", profileData.profilePhoto, e);
                      setError("មិនអាចផ្ទុករូបថតបានទេ។ សូមព្យាយាមម្តងទៀត។");
                      e.target.src = "/images/default.jpg";
                    }}
                    onLoad={() => console.log("Image loaded successfully:", profileData.profilePhoto)}
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
                className={`cursor-pointer bg-green-600 text-white py-2 px-4 rounded inline-flex items-center ${
                  imageUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <User className="w-5 h-5 mr-2" /> ព័ត៌មានផ្ទាល់ខ្លួន
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">ឈ្មោះពេញ *</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded border">
                    {profileData.name || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">អ៊ីមែល *</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded border">
                    {profileData.email || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium">ទូរស័ព្ទ</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded border">
                    {profileData.phone || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>

              {/* Province */}
              <div>
                <label className="block mb-1 font-medium">ខេត្ត</label>
                {isEditing ? (
                  <select
                    value={profileData.province_id}
                    onChange={(e) => handleInputChange("province_id", e.target.value)}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">-- ជ្រើសរើសខេត្ត --</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.province_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 rounded border">
                    {profileData.province || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              {isEditing ? (
                <>
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded flex items-center hover:bg-green-700 transition"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4 mr-2" /> រក្សាទុក
                  </button>
                  <button
                    className="bg-gray-400 text-white py-2 px-4 rounded flex items-center hover:bg-gray-500 transition"
                    onClick={handleCancel}
                  >
                    <Edit className="w-4 h-4 mr-2" /> ចោល
                  </button>
                </>
              ) : (
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded flex items-center hover:bg-green-700 transition"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" /> កែប្រែ
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
            <Lock className="w-5 h-5 mr-2" /> ផ្លាស់ប្តូរលេខសម្ងាត់
          </h3>
          {isChangingPassword ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block mb-1 font-medium">លេខសម្ងាត់បច្ចុប្បន្ន</label>
                <input
                  type={showPasswords.current_password ? "text" : "password"}
                  placeholder="លេខសម្ងាត់បច្ចុប្បន្ន"
                  value={passwordData.current_password}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      current_password: e.target.value,
                    }))
                  }
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("current_password")}
                  className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current_password ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="relative">
                <label className="block mb-1 font-medium">លេខសម្ងាត់ថ្មី</label>
                <input
                  type={showPasswords.new_password ? "text" : "password"}
                  placeholder="លេខសម្ងាត់ថ្មី"
                  value={passwordData.new_password}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      new_password: e.target.value,
                    }))
                  }
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("new_password")}
                  className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new_password ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="relative">
                <label className="block mb-1 font-medium">បញ្ជាក់លេខសម្ងាត់ថ្មី</label>
                <input
                  type={showPasswords.new_password_confirmation ? "text" : "password"}
                  placeholder="បញ្ជាក់លេខសម្ងាត់ថ្មី"
                  value={passwordData.new_password_confirmation}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      new_password_confirmation: e.target.value,
                    }))
                  }
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("new_password_confirmation")}
                  className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new_password_confirmation ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="md:col-span-3 flex gap-2 mt-2">
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded flex items-center hover:bg-green-700 transition"
                  onClick={handlePasswordChange}
                >
                  <Save className="w-4 h-4 mr-2" /> រក្សាទុក
                </button>
                <button
                  className="bg-gray-400 text-white py-2 px-4 rounded flex items-center hover:bg-gray-500 transition"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({
                      current_password: "",
                      new_password: "",
                      new_password_confirmation: "",
                    });
                    setShowPasswords({
                      current_password: false,
                      new_password: false,
                      new_password_confirmation: false,
                    });
                    setError(null);
                    setSuccess(null);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" /> ចោល
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-green-600 text-white py-2 px-4 rounded flex items-center hover:bg-green-700 transition"
              onClick={() => setIsChangingPassword(true)}
            >
              <Edit className="w-4 h-4 mr-2" /> ផ្លាស់ប្តូរលេខសម្ងាត់
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfileSettings;