const API_BASE_URL = "http://localhost:8000/api"

export const registerUser = async(userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("API Error:", data)
            throw new Error(
                data.message || (data.errors ? Object.values(data.errors).flat().join(" ") : "Registration failed"),
            )
        }

        if (data.access_token) {
            localStorage.setItem("auth_token", data.access_token)
            localStorage.setItem(
                "user_data",
                JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role,
                    roles: data.user.roles,
                }),
            )
        }

        return data
    } catch (error) {
        throw new Error(error.message || "An error occurred during registration")
    }
}

export const loginUser = async(credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(credentials),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Login failed")
        }

        if (data.access_token) {
            localStorage.setItem("auth_token", data.access_token)
            localStorage.setItem(
                "user_data",
                JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role_id: data.user.role_id,
                    role: data.user.role,
                    roles: data.user.roles,
                }),
            )
        }

        return data
    } catch (error) {
        throw new Error(error.message || "An error occurred during login")
    }
}

export const logoutUser = async() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
        throw new Error("No authentication token found")
    }

    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Logout failed")
        }

        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")

        return data
    } catch (error) {
        throw new Error(error.message || "An error occurred during logout")
    }
}

export const fetchWithAuth = async(url, options = {}) => {
    const token = localStorage.getItem("auth_token")
    const headers = {
        ...options.headers,
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    }

    return fetch(url, {...options, headers })
}

// Location service functions
export const getCurrentLocation = async() => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser"))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    source: "gps",
                })
            },
            (error) => {
                reject(new Error(`Geolocation error: ${error.message}`))
            }, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            },
        )
    })
}

export const getLocationByIP = async() => {
    try {
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) {
            throw new Error("Failed to get IP location")
        }
        const data = await response.json()
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.city,
            country: data.country_name,
            province: data.region,
            source: "ip",
        }
    } catch (error) {
        throw new Error(`IP location error: ${error.message}`)
    }
}