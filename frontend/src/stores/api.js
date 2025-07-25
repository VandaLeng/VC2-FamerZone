const API_BASE_URL = 'http://localhost:8000/api';

export const registerUser = async(userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('API Error:', data);
            throw new Error(data.message || (data.errors ? Object.values(data.errors).flat().join(' ') : 'Registration failed'));
        }

        // Store the token if returned
        if (data.access_token) {
            localStorage.setItem('auth_token', data.access_token);
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during registration');
    }
};

export const loginUser = async(credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Store the token
        if (data.access_token) {
            localStorage.setItem('auth_token', data.access_token);
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login');
    }
};

// Add a utility function to include the token in requests
export const fetchWithAuth = async(url, options = {}) => {
    const token = localStorage.getItem('auth_token');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json',
    };

    return fetch(url, {...options, headers });
};