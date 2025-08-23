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
  const [isLoading, setIsLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Password state
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

  // Fetch profile from API
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await profileAPI.getProfile();

      if (response.status === "success" && response.data) {
        const user = response.data;
        if (user.role !== "farmer") {
          setError("អ្នកមិនមែនជាកសិករទេ។ សូមចូលប្រើជាកសិករ។");
          return;
        }

        // Handle province properly
        let provinceName = "";
        let provinceId = "";
        if (user.province) {
          if (typeof user.province === "object") {
            provinceName = user.province.province_name;
            provinceId = user.province.id ? String(user.province.id) : String(user.province_id || "");
          } else {
            provinceName = user.province;
            provinceId = String(user.province_id || "");
          }
        } else if (user.province_id) {
          provinceId = String(user.province_id);
          const found = provinces.find(p => String(p.id) === String(user.province_id));
          provinceName = found ? found.province_name : "";
        }

        setProfileData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          province: provinceName,
          province_id: provinceId,
          profilePhoto: user.image_url || null,
          role: user.role || "",
        });
        setError(null);
      } else {
        setError("មិនអាចទាញយកទិន្នន័យប្រវត្តិរូបបានទេ");
      }
    } catch (err) {
      console.error(err);
      setError("បរាជ័យក្នុងការទាញយកទិន្នន័យប្រវត្តិរូប");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch provinces list
  const fetchProvinces = async () => {
    try {
      const response = await provincesAPI.getAll();
      if (response.data && Array.isArray(response.data)) setProvinces(response.data);
      else setProvinces([]);
    } catch (err) {
      console.error(err);
      setError("បរាជ័យក្នុងការទាញយកបញ្ជីខេត្ត");
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setProfileData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "province_id") {
        const selected = provinces.find(p => String(p.id) === value);
        updated.province = selected ? selected.province_name : "";
      }
      return updated;
    });
    setError(null);
    setSuccess(null);
  };

  // Upload profile image
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("សូមជ្រើសរើសរូបថតប្រភេទ JPG, PNG, ឬ GIF");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("រូបថតត្រូវតែតិចជាង 2MB");
      return;
    }

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await profileAPI.updateProfileImage(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === "success") {
        setProfileData(prev => ({
          ...prev,
          profilePhoto: response.data.image_url,
        }));
        setSuccess("រូបថតបានផ្ទុកជោគជ័យ");
      } else {
        setError("មិនអាចផ្ទុករូបថតបានទេ");
      }
    } catch (err) {
      console.error(err);
      setError("បរាជ័យក្នុងការផ្ទុករូបថត");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      setError(null);
      if (!profileData.name.trim()) return setError("សូមបញ្ចូលឈ្មោះ");
      if (!profileData.email.trim()) return setError("សូមបញ្ចូលអ៊ីមែល");

      const updateData = {
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        phone: profileData.phone || null,
        province_id: profileData.province_id || null,
      };

      const response = await profileAPI.updateProfile(updateData);
      if (response.status === "success") {
        setSuccess("ប្រវត្តិរូបបានធ្វើបច្ចុប្បន្នភាពជោគជ័យ");
        setIsEditing(false);
        fetchProfileData();
      } else setError("មិនអាចធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូបបានទេ");
    } catch (err) {
      console.error(err);
      setError("បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូប");
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    if (!passwordData.current_password || !passwordData.password || !passwordData.password_confirmation) return;
    if (passwordData.password !== passwordData.password_confirmation) {
      return setError("លេខសម្ងាត់ថ្មីមិនត្រូវគ្នា");
    }
    if (passwordData.password.length < 6) return setError("លេខសម្ងាត់ថ្មីត្រូវមានយ៉ាងហោចណាស់ ៦ តួរអក្សរ");

    try {
      const response = await profileAPI.changePassword(passwordData);
      if (response.status === "success") {
        setSuccess("លេខសម្ងាត់បានផ្លាស់ប្តូរជោគជ័យ");
        setPasswordData({ current_password: "", password: "", password_confirmation: "" });
        setIsChangingPassword(false);
      } else {
        setError(response.message || "មិនអាចផ្លាស់ប្តូរលេខសម្ងាត់បានទេ");
      }
    } catch (err) {
      console.error(err);
      setError("មិនអាចផ្លាស់ប្តូរលេខសម្ងាត់បានទេ");
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

  if (isLoading) return <div>កំពុងទាញយកទិន្នន័យ...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-3">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-3">{success}</div>}

      {/* Profile Photo */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold flex items-center mb-4"><Camera className="w-5 h-5 mr-2"/> រូបថត</h2>
        <div className="flex items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-600 mr-4">
            {profileData.profilePhoto ? (
              <img src={profileData.profilePhoto} alt="Profile" className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <User className="w-12 h-12 text-gray-500"/>
              </div>
            )}
          </div>
          <label className={`cursor-pointer bg-green-600 text-white py-2 px-4 rounded ${imageUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
            <Camera className="w-4 h-4 mr-2"/> {imageUploading ? "កំពុងផ្ទុក..." : "ផ្ទុករូបថត"}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={imageUploading}/>
          </label>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold flex items-center mb-4"><User className="w-5 h-5 mr-2"/> ព័ត៌មានផ្ទាល់ខ្លួន</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>ឈ្មោះពេញ</label>
            {isEditing ? (
              <input type="text" value={profileData.name} onChange={(e)=>handleInputChange("name", e.target.value)} className="w-full p-2 border rounded"/>
            ) : <p>{profileData.name}</p>}
          </div>
          <div>
            <label>អ៊ីមែល</label>
            {isEditing ? (
              <input type="email" value={profileData.email} onChange={(e)=>handleInputChange("email", e.target.value)} className="w-full p-2 border rounded"/>
            ) : <p>{profileData.email}</p>}
          </div>
          <div>
            <label>ទូរស័ព្ទ</label>
            {isEditing ? (
              <input type="text" value={profileData.phone} onChange={(e)=>handleInputChange("phone", e.target.value)} className="w-full p-2 border rounded"/>
            ) : <p>{profileData.phone}</p>}
          </div>
          <div>
            <label>ខេត្ត</label>
            {isEditing ? (
              <select value={profileData.province_id} onChange={(e)=>handleInputChange("province_id", e.target.value)} className="w-full p-2 border rounded">
                <option value="">-- ជ្រើសរើសខេត្ត --</option>
                {provinces.map(p => <option key={p.id} value={p.id}>{p.province_name}</option>)}
              </select>
            ) : <p>{profileData.province}</p>}
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          {isEditing ? (
            <>
              <button className="bg-green-600 text-white py-2 px-4 rounded flex items-center" onClick={handleSave}><Save className="w-4 h-4 mr-1"/> រក្សាទុក</button>
              <button className="bg-gray-400 text-white py-2 px-4 rounded flex items-center" onClick={handleCancel}><Edit className="w-4 h-4 mr-1"/> រងចាំ</button>
            </>
          ) : (
            <button className="bg-blue-600 text-white py-2 px-4 rounded flex items-center" onClick={()=>setIsEditing(true)}><Edit className="w-4 h-4 mr-1"/> កែប្រែ</button>
          )}
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold flex items-center mb-4"><Lock className="w-5 h-5 mr-2"/> ផ្លាស់ប្តូរលេខសម្ងាត់</h2>
        {isChangingPassword ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label>លេខសម្ងាត់បច្ចុប្បន្ន</label>
                <input type="password" value={passwordData.current_password} onChange={e=>setPasswordData({...passwordData,current_password:e.target.value})} className="w-full p-2 border rounded"/>
              </div>
              <div>
                <label>លេខសម្ងាត់ថ្មី</label>
                <input type="password" value={passwordData.password} onChange={e=>setPasswordData({...passwordData,password:e.target.value})} className="w-full p-2 border rounded"/>
              </div>
              <div>
                <label>បញ្ជាក់លេខសម្ងាត់ថ្មី</label>
                <input type="password" value={passwordData.password_confirmation} onChange={e=>setPasswordData({...passwordData,password_confirmation:e.target.value})} className="w-full p-2 border rounded"/>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handlePasswordChange}>ផ្លាស់ប្តូរ</button>
              <button className="bg-gray-400 text-white py-2 px-4 rounded" onClick={()=>setIsChangingPassword(false)}>បោះបង់</button>
            </div>
          </>
        ) : (
          <button className="bg-blue-600 text-white py-2 px-4 rounded flex items-center" onClick={()=>setIsChangingPassword(true)}>ផ្លាស់ប្តូរលេខសម្ងាត់</button>
        )}
      </div>
    </div>
  );
};

export default FarmerProfileSettings;
