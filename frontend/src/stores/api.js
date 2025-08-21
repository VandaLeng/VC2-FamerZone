// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Get auth token
const getAuthToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("auth_token");
};

// Create auth headers
const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ========== PROFILE API ==========
export const profileAPI = {
    // Get current user profile
    getProfile: () => {
        return api.get('/profile', {
            headers: getAuthHeaders()
        }).then((response) => response.data);
    },

    // Update user profile
    updateProfile: (data) => {
        return api.put('/profile', data, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            }
        }).then((response) => response.data);
    },

    // Update profile image - FIXED to handle FormData correctly
    updateProfileImage: (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        return api.post('/profile/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            }
        }).then((response) => response.data);
    },

    // Change password
    changePassword: (passwordData) => {
        return api.post('/change-password', passwordData, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            }
        }).then((response) => response.data);
    }
};

// ========== PROVINCES API ==========
export const provincesAPI = {
    getAll: () => {
        return api.get('/provinces').then((response) => response.data);
    }
};

// ========== VIDEO API ==========
export const videoAPI = {
    // Get all videos for homepage (public)
    getAllVideos: (params = {}) => {
        const defaultParams = { limit: 6 };
        return axios.get(`${API_BASE_URL}/videos/all`, {
            params: {...defaultParams, ...params },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => response.data);
    },

    // Increment view count (public)
    incrementView: (videoId) => {
        return axios.post(`${API_BASE_URL}/videos/public/${videoId}/view`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => response.data);
    },

    // Get farmer's videos (protected)
    getMyVideos: () => {
        return axios.get(`${API_BASE_URL}/video-products`, {
            headers: getAuthHeaders()
        }).then((response) => response.data);
    },

    // Create video (protected)
    createVideo: (data) => {
        return axios.post(`${API_BASE_URL}/video-products`, data, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
        }).then((response) => response.data);
    },

    // Update video (protected)
    updateVideo: (id, data) => {
        return axios.put(`${API_BASE_URL}/video-products/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
        }).then((response) => response.data);
    },

    // Delete video (protected)
    deleteVideo: (id) => {
        return axios.delete(`${API_BASE_URL}/video-products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders()
            }
        }).then((response) => response.data);
    },

    // Toggle video status (protected)
    toggleVideoStatus: (id) => {
        return axios.post(`${API_BASE_URL}/video-products/${id}/toggle-status`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders()
            }
        }).then((response) => response.data);
    }
};

// ========== OTHER EXISTING APIs ==========
export const itemsAPI = {
    getAll: () => {
        return axios.get(`${API_BASE_URL}/items`, {
            headers: getAuthHeaders()
        }).then((response) => response.data);
    },

    getFiltered: (params) => {
        return axios.get(`${API_BASE_URL}/items/filtered`, {
            params,
            headers: getAuthHeaders()
        }).then((response) => response.data);
    },

    create: (data) => {
        return axios.post(`${API_BASE_URL}/items`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            },
        }).then((response) => response.data);
    },

    update: (id, data) => {
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
        }

        return axios.post(`${API_BASE_URL}/items/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            },
        }).then((response) => response.data);
    },

    delete: (id) => {
        return axios.delete(`${API_BASE_URL}/items/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders()
            }
        }).then((response) => response.data);
    },

    getById: (id) => {
        return axios.get(`${API_BASE_URL}/items/${id}`, {
            headers: getAuthHeaders()
        }).then((response) => response.data);
    }
};

export const addressesAPI = {
    getAll: () =>
        axios.get(`${API_BASE_URL}/addresses`, {
            headers: getAuthHeaders()
        }).then((response) => response.data),
    create: (data) =>
        axios.post(`${API_BASE_URL}/addresses`, data, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            }
        }).then((response) => response.data),
};

// Profile and User API functions (keep for backward compatibility)
export const userAPI = {
    // Get current user profile
    getProfile: () => {
        return profileAPI.getProfile();
    },

    // Update user profile
    updateProfile: (data) => {
        return profileAPI.updateProfile(data);
    },

    // Update only profile image
    updateProfileImage: (imageFile) => {
        return profileAPI.updateProfileImage(imageFile);
    },

    // Change password
    changePassword: (passwordData) => {
        return profileAPI.changePassword(passwordData);
    }
};

// Request interceptor
api.interceptors.request.use(
    function(config) {
        const method = config.method ? config.method.toUpperCase() : 'UNKNOWN';
        console.log('API Request:', method, config.url, config.params);
        return config;
    },
    function(error) {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    function(response) {
        console.log('API Response:', response.status, response.data);
        return response;
    },
    function(error) {
        if (error && error.response) {
            console.error('API Response Error:', error.response.status, error.response.data);

            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                // Redirect to login if needed
                window.location.href = '/login';
            }
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ========== AUTH API ==========
export function registerUser(userData) {
    return api.post('/register', userData)
        .then(function(response) {
            const data = response.data;
            if (data.access_token) {
                localStorage.setItem('auth_token', data.access_token);

                // Store user data with proper role information
                const userDataToStore = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role || (data.user.roles && data.user.roles.length > 0 ? data.user.roles[0].name : userData.role),
                    roles: data.user.roles || [],
                    phone: data.user.phone,
                    province_id: data.user.province_id,
                    province: data.user.province ? data.user.province.name : null,
                    image: data.user.image,
                    image_url: data.user.image_url,
                };

                localStorage.setItem('user_data', JSON.stringify(userDataToStore));
                console.log('✅ User registered and data stored:', userDataToStore);
            }
            return data;
        })
        .catch(function(error) {
            let message = 'Registration failed';
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    message = error.response.data.message;
                } else if (error.response.data.errors) {
                    const errors = error.response.data.errors;
                    const firstError = Object.values(errors)[0];
                    message = Array.isArray(firstError) ? firstError[0] : firstError;
                }
            }
            throw new Error(message);
        });
}

export function loginUser(credentials) {
    return api.post('/login', credentials)
        .then(function(response) {
            const data = response.data;
            if (data.access_token) {
                localStorage.setItem('auth_token', data.access_token);

                // Store user data with proper role information
                const userDataToStore = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role || (data.user.roles && data.user.roles.length > 0 ? data.user.roles[0].name : null),
                    roles: data.user.roles || [],
                    phone: data.user.phone,
                    province_id: data.user.province_id,
                    province: data.user.province ? data.user.province.name : null,
                    image: data.user.image,
                    image_url: data.user.image_url,
                };

                localStorage.setItem('user_data', JSON.stringify(userDataToStore));
                console.log('✅ User logged in and data stored:', userDataToStore);
            }
            return data;
        })
        .catch(function(error) {
            let message = 'Login failed';
            if (error.response && error.response.data) {
                if (error.response.data.error) {
                    message = error.response.data.error;
                } else if (error.response.data.message) {
                    message = error.response.data.message;
                }
            }
            throw new Error(message);
        });
}

export function logoutUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    return api.post('/logout', {}, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then(function(response) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            return response.data;
        })
        .catch(function(error) {
            let message = 'Logout failed';
            if (error.response && error.response.data && error.response.data.error) {
                message = error.response.data.error;
            }
            throw new Error(message);
        });
}

export function fetchWithAuth(url, options) {
    const token = localStorage.getItem('auth_token');
    const config = {
        url: url,
        method: options && options.method ? options.method : 'GET',
        data: options && options.body ? options.body : null,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: token ? 'Bearer ' + token : '',
        },
    };

    return api(config);
}

export default api;