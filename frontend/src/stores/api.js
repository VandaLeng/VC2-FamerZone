import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Get auth token helper
const getAuthToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("auth_token");
};

// Create auth headers helper
const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

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
        // Use POST with _method=PUT for Laravel to handle file uploads properly
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
                localStorage.setItem('user_data', JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role,
                    roles: data.user.roles,
                }));
            }
            return data;
        })
        .catch(function(error) {
            let message = 'Registration failed';
            if (error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
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
                localStorage.setItem('user_data', JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role,
                    roles: data.user.roles,
                }));
            }
            return data;
        })
        .catch(function(error) {
            let message = 'Login failed';
            if (error.response && error.response.data && error.response.data.error) {
                message = error.response.data.error;
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

// ========== FETCH WITH AUTH ==========
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