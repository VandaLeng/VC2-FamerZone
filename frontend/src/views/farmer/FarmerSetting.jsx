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

        if (userData.role !== "farmer") {
          setError("អ្នកមិនមែនជាកសិករទេ។ សូមចូលប្រើជាកសិករ។");
          return;
        }

        let provinceName = "";
        let provinceId = "";

        if (userData.province) {
          if (
            typeof userData.province === "object" &&
            userData.province.province_name
          ) {
            provinceName = userData.province.province_name;
            provinceId = userData.province.id
              ? String(userData.province.id)
              : String(userData.province_id || "");
          } else if (typeof userData.province === "string") {
            provinceName = userData.province;
            provinceId = String(userData.province_id || "");
          }
        } else if (userData.province_id) {
          provinceId = String(userData.province_id);
          const foundProvince = provinces.find(
            (p) => String(p.id) === String(userData.province_id)
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
        err.response?.status === 401
          ? "មិនមានសិទ្ធិ៖ សូមចូលគណនីម្តងទៀត"
          : err.response?.data?.message ||
              "បរាជ័យក្នុងការទាញយកទិន្នន័យប្រវត្តិរូប"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get provinces list
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

  // ✅ Handle input changes
  const handleInputChange = (field, value) => {
    setProfileData((prev) => {
      const updatedData = { ...prev, [field]: value };
      if (field === "province_id") {
        const selectedProvince = provinces.find(
          (prov) => String(prov.id) === value
        );
        updatedData.province = selectedProvince
          ? selectedProvince.province_name
          : "";
      }
      return updatedData;
    });
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  // ... 🔽 your other functions remain the same (handlePhotoUpload, handleSave, handlePasswordChange)

  const handleCancel = () => {
    fetchProfileData();
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  if (isLoading) {
    return <div>កំពុងទាញយកទិន្នន័យ...</div>;
  }

  return (
    <div>
      {/* your full JSX as before, just replace all `profileData` / `setProfileData` references to match */}
    </div>
  );
};

export default FarmerProfileSettings;
