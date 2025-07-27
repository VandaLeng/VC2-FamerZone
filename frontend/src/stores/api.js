const API_BASE_URL = "http://localhost:8000/api";

export const registerUser = async(userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            console.error("API Error:", data);
            throw new Error(
                data.message || (data.errors ? Object.values(data.errors).flat().join(" ") : "Registration failed")
            );
        }
        if (data.access_token) {
            localStorage.setItem("auth_token", data.access_token);
            localStorage.setItem(
                "user_data",
                JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role,
                    roles: data.user.roles,
                })
            );
        }
        return data;
    } catch (error) {
        throw new Error(error.message || "An error occurred during registration");
    }
};

export const loginUser = async(credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }
        if (data.access_token) {
            localStorage.setItem("auth_token", data.access_token);
            localStorage.setItem(
                "user_data",
                JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role,
                    roles: data.user.roles,
                })
            );
        }
        return data;
    } catch (error) {
        throw new Error(error.message || "An error occurred during login");
    }
};

export const logoutUser = async() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Logout failed");
        }
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        return data;
    } catch (error) {
        throw new Error(error.message || "An error occurred during logout");
    }
};

export const fetchWithAuth = async(url, options = {}) => {
    const token = localStorage.getItem("auth_token");
    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
    return fetch(url, {...options, headers });
};