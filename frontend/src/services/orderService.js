// src/services/orderService.js

import axios from 'axios';

export const fetchOrders = async () => {
  const response = await axios.get('http://localhost:8000/api/orders');
  return response.data.data;
};

// ✅ ADD THIS
export const placeOrder = async (orderData) => {
  const response = await axios.post('http://localhost:8000/api/orders', orderData);
  return response.data;
};
