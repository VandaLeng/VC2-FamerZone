import React, { useState, useEffect } from "react";
import { Camera, User, Save, Edit } from "lucide-react";
import axios from "axios";

const FarmerSetting = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    province_id: "",
    image: null,
  });
  const [provinces, setProvinces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchProvinces();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/profile"); 
      if (res.data && res.data.user) {
        setProfile(res.data.user);
      } else {
        setError("Profile data is missing");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load profile");
    }
  };

  const fetchProvinces = async () => {
    try {
      const res = await axios.get("/api/provinces");
      setProvinces(res.data.data || []);
    } catch (err) {
      console.error("Failed to load provinces", err);
    }
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/api/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile((prev) => ({ ...prev, image: res.data.image_url }));
      setSuccess("Image updated successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload image");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/profile", {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        province_id: profile.province_id,
      });
      setSuccess("Profile updated successfully");
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    fetchProfile();
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-2">កំណត់ប្រវត្តិរូបកសិករ</h1>
          <p>គ្រប់គ្រងព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>

        {/* Alerts */}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Image */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
              <Camera className="w-5 h-5 mr-2" /> រូបថត
            </h3>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-600">
                {profile.image ? (
                  <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <User className="w-10 h-10 text-gray-500" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  ផ្ទុករូបថត
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
                    {field === "name" ? "ឈ្មោះពេញ" : field === "email" ? "អ៊ីមែល" : "លេខទូរស័ព្ទ"}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={profile[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-lg">{profile[field] || "មិនបានផ្តល់"}</p>
                  )}
                </div>
              ))}

              {/* Province */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ខេត្ត/ទីក្រុង</label>
                {isEditing ? (
                  <select
                    value={profile.province_id}
                    onChange={(e) => handleChange("province_id", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">-- ជ្រើសរើសខេត្ត --</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="p-2 bg-gray-100 rounded-lg">
                    {provinces.find((p) => p.id === profile.province_id)?.name || "មិនបានផ្តល់"}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              {isEditing ? (
                <>
                  <button onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    បោះបង់
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <Save className="w-5 h-5 mr-2" />
                    រក្សាទុក
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
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

export default FarmerSetting;
