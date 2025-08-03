import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const fetchOrders = async() => {
    const response = await axios.get(`${API_BASE}/orders`);
    return response.data.data;
};

export const placeOrder = async(orderData) => {
    const response = await axios.post(`${API_BASE}/orders`, orderData);
    return response.data;
};

export const updateOrderStatus = async(orderId, newStatus) => {
    // Partial update: send only status
    const response = await axios.patch(`${API_BASE}/orders/${orderId}`, {
        status: newStatus,
    });
    return response.data.order;
};