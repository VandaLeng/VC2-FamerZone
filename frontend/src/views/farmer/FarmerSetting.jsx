import React, { useState, useEffect } from "react";
import { Camera, User, Save, Edit } from "lucide-react";
import api from "axios"; // ✅ use our axios instance

const FarmerProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    profilePhoto: null,
    role: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProfileData();
    fetchProvinces();
  }, []);

  // ✅ Get farmer profile
  const fetchProfileData = async () => {
    try {
      const response = await api.get("/api/profile");
      const userData = response.data.data;

      if (userData.role !== "farmer") {
        setError("អ្នកមិនមែនជាកសិករ ទេ");
        return;
      }

      setProfileData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        province: userData.province || "",
        profilePhoto: userData.image || null,
        role: userData.role,
      });
      setError(null);
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "មិនមានសិទ្ធិ៖ សូមចូលគណនីម្តងទៀត"
          : err.response?.data?.message ||
              "បរាជ័យក្នុងការទាញយកទិន្នន័យប្រវត្តិរូប"
      );
    }
  };

  // ✅ Get provinces list
  const fetchProvinces = async () => {
    try {
      const response = await api.get("/api/provinces");
      setProvinces(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch provinces", err);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Upload photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/api/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileData((prev) => ({
        ...prev,
        profilePhoto: response.data.image_url,
      }));
      setSuccess("រូបថតបានផ្ទុកជោគជ័យ");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "បរាជ័យក្នុងការផ្ទុករូបថត");
    }
  };

  // ✅ Save changes
  const handleSave = async () => {
    try {
      await api.put("/api/profile", {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        province: profileData.province,
      });
      setSuccess("ប្រវត្តិរូបបានធ្វើបច្ចុប្បន្នភាពជោគជ័យ");
      setIsEditing(false);
      setError(null);
      fetchProfileData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូប"
      );
    }
  };

  const handleCancel = () => {
    fetchProfileData();
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-2">
            ការកំណត់ប្រវត្តិរូបកសិករ
          </h1>
          <p className="text-lg">គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Photo */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <Camera className="w-5 h-5 mr-2" /> រូបថតប្រវត្តិរូប
            </h3>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-600">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <User className="w-10 h-10 text-gray-500" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                  ផ្ទុករូបថត
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

          {/* Profile Info */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <User className="w-5 h-5 mr-2" /> ព័ត៌មានផ្ទាល់ខ្លួន
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "name" && "ឈ្មោះពេញ"}
                    {field === "email" && "អ៊ីមែល"}
                    {field === "phone" && "លេខទូរស័ព្ទ"}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={profileData[field]}
                      onChange={(e) =>
                        handleInputChange(field, e.target.value)
                      }
                      placeholder={
                        field === "name"
                          ? "បញ្ចូលឈ្មោះពេញ"
                          : field === "email"
                          ? "បញ្ចូលអ៊ីមែល"
                          : "បញ្ចូលលេខទូរស័ព្ទ"
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">
                      {profileData[field] || "មិនបានផ្តល់"}
                    </p>
                  )}
                </div>
              ))}

              {/* Province Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ខេត្ត/ទីក្រុង
                </label>
                {isEditing ? (
                  <select
                    value={profileData.province}
                    onChange={(e) =>
                      handleInputChange("province", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">-- ជ្រើសរើសខេត្ត --</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.name}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-2 bg-gray-100 rounded-lg">
                    {profileData.province || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    បោះបង់
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    រក្សាទុក
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  កែប្រែ
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
