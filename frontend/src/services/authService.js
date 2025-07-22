import axios from 'axios';

export const getCsrfTokenFromApi = async () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
  try {
    const response = await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    console.log('CSRF Token fetched successfully:', response);
    return response;
  } catch (error) {
    console.error('Error fetching CSRF token:', error.response ? error.response.data : error.message);
    throw error;
  }
};