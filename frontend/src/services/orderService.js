import axios from 'axios';

export const placeOrder = async (orderData) => {
  const response = await axios.post('http://localhost:8000/api/orders', orderData);
  return response.data;
};
