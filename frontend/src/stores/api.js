import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Increased timeout for video operations
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Get auth token
const getAuthToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("auth_token");
};


const getAuthHeaders = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
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

    // Update profile image - FIXED to handle File object correctly
    updateProfileImage: (imageFile) => {
        const formData = new FormData();

        // Handle different input types
        if (imageFile instanceof File) {
            formData.append('image', imageFile);
        } else if (imageFile instanceof FormData) {
            return api.post('/profile/image', imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...getAuthHeaders()
                }
            }).then((response) => response.data);
        } else {
            throw new Error('Invalid file format');
        }

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

// ========== PROVINCES API - FIXED ==========
export const provincesAPI = {
    getAll: () => {
        return api.get('/provinces').then((response) => {
            // Handle different response structures
            if (response.data && response.data.data) {
                return { data: response.data.data };
            } else if (response.data && Array.isArray(response.data)) {
                return { data: response.data };
            } else {
                return response.data;
            }
        });
    }
};
// videoAPI (unchanged, but ensured console logs for debugging)
export const videoAPI = {
    // Get all videos for homepage (public)
    getAllVideos: async(params = {}) => {
        try {
            const defaultParams = { limit: 6 };
            console.log('Fetching public videos with params:', {...defaultParams, ...params });

            const response = await axios.get(`${API_BASE_URL}/videos/all`, {
                params: {...defaultParams, ...params },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 10000
            });

            console.log('Public videos response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching public videos:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            throw error;
        }
    },

    // Increment view count (public)
    incrementView: async(videoId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/videos/public/${videoId}/view`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 5000
            });
            return response.data;
        } catch (error) {
            console.error('Error incrementing view:', error);
            throw error;
        }
    },

    // Admin get all videos (protected)
    adminGetAllVideos: async() => {
        try {
            console.log('Fetching admin videos...');
            const response = await axios.get(`${API_BASE_URL}/admin/video-products`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getAuthHeaders()
                },
                timeout: 10000
            });

            console.log('Admin videos response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching admin videos:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            throw error;
        }
    },

    // Admin create video (protected)
    adminCreateVideo: async(data) => {
        try {
            console.log('Creating video with data:', data);

            if (!data.title || !data.title.trim()) {
                throw new Error('Video title is required');
            }
            if (!data.url || !data.url.trim()) {
                throw new Error('Video URL is required');
            }

            try {
                new URL(data.url.trim());
            } catch {
                throw new Error('Please enter a valid URL');
            }

            const requestData = {
                title: data.title.trim(),
                url: data.url.trim(),
                description: data.description ? data.description.trim() : ''
            };

            const response = await axios.post(`${API_BASE_URL}/admin/video-products`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getAuthHeaders()
                },
                timeout: 15000
            });

            console.log('Video creation response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating video:', error);
            if (error.response) {
                const errorMessage =
                    (error.response.data && error.response.data.message) ||
                    (error.response.data && error.response.data.error) ||
                    'Failed to create video';
                throw new Error(errorMessage);
            } else if (error.message) {
                throw error;
            } else {
                throw new Error('Network error occurred while creating video');
            }
        }
    },

    // Admin update video (protected)
    adminUpdateVideo: async(id, data) => {
        try {
            console.log('Updating video with ID:', id, 'Data:', data);

            if (!data.title || !data.title.trim()) {
                throw new Error('Video title is required');
            }
            if (!data.url || !data.url.trim()) {
                throw new Error('Video URL is required');
            }

            try {
                new URL(data.url.trim());
            } catch {
                throw new Error('Please enter a valid URL');
            }

            const requestData = {
                title: data.title.trim(),
                url: data.url.trim(),
                description: data.description ? data.description.trim() : ''
            };

            const response = await axios.put(`${API_BASE_URL}/admin/video-products/${id}`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getAuthHeaders()
                },
                timeout: 15000
            });

            console.log('Video update response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating video:', error);
            if (error.response) {
                const errorMessage =
                    (error.response.data && error.response.data.message) ||
                    (error.response.data && error.response.data.error) ||
                    'Failed to update video';
                throw new Error(errorMessage);
            } else if (error.message) {
                throw error;
            } else {
                throw new Error('Network error occurred while updating video');
            }
        }
    },

    // Admin delete video (protected)
    adminDeleteVideo: async(id) => {
        try {
            console.log('Deleting video with ID:', id);
            const response = await axios.delete(`${API_BASE_URL}/admin/video-products/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getAuthHeaders()
                },
                timeout: 10000
            });

            console.log('Video deletion response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting video:', error);
            if (error.response) {
                const errorMessage =
                    (error.response.data && error.response.data.message) ||
                    (error.response.data && error.response.data.error) ||
                    'Failed to delete video';
                throw new Error(errorMessage);
            } else {
                throw new Error('Network error occurred while deleting video');
            }
        }
    },

    // Admin toggle video status (protected)
    adminToggleVideoStatus: async(id) => {
        try {
            console.log('Toggling video status for ID:', id);
            const response = await axios.post(`${API_BASE_URL}/admin/video-products/${id}/toggle-status`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getAuthHeaders()
                },
                timeout: 10000
            });

            console.log('Video status toggle response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error toggling video status:', error);
            if (error.response) {
                const errorMessage =
                    (error.response.data && error.response.data.message) ||
                    (error.response.data && error.response.data.error) ||
                    'Failed to toggle video status';
                throw new Error(errorMessage);
            } else {
                throw new Error('Network error occurred while toggling video status');
            }
        }
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
        console.log('API Request:', method, config.url, config.params || config.data);
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
        console.log('API Response:', response.status, response.config.url, response.data);
        return response;
    },
    function(error) {
        if (error && error.response) {
            console.error('API Response Error:', error.response.status, error.response.config.url, error.response.data);

            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                localStorage.removeItem('token');
                // Redirect to login if needed
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ========== AUTH API - FIXED ==========
export function registerUser(userData) {
    return api.post('/register', userData)
        .then(function(response) {
            const data = response.data;
            if (data.access_token) {
                localStorage.setItem('auth_token', data.access_token);

                // Store user data with proper role and province information - FIXED
                const userDataToStore = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role || (data.user.roles && data.user.roles.length > 0 ? data.user.roles[0].name : userData.role),
                    roles: data.user.roles || [],
                    phone: data.user.phone,
                    province_id: data.user.province_id,
                    // FIXED: Handle province data properly
                    province: data.user.province ?
                        (typeof data.user.province === 'object' ? data.user.province.province_name : data.user.province) : null,
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

                // Store user data with proper role and province information - FIXED
                const userDataToStore = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role || (data.user.roles && data.user.roles.length > 0 ? data.user.roles[0].name : null),
                    roles: data.user.roles || [],
                    phone: data.user.phone,
                    province_id: data.user.province_id,
                    // FIXED: Handle province data properly
                    province: data.user.province ?
                        (typeof data.user.province === 'object' ? data.user.province.province_name : data.user.province) : null,
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
            localStorage.removeItem('token');
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