import axios from 'axios';
import { getCsrfTokenFromApi } from './authService';

export const registerUser = async (userData) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
  
  try {
    const csrfResponse = await getCsrfTokenFromApi();
    console.log('CSRF Response:', csrfResponse);

    const response = await axios.post(`${API_BASE_URL}/api/register`, userData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    console.log('Full Response:', response);
    return response;
  } catch (error) {
    console.error('Registration request error:', error.response ? error.response.data : error.message);
    throw error;
  }
};