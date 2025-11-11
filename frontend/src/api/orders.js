// src/api/orders.js
import axios from 'axios';

const API_URL = 'http://localhost:5002/api/orders';

export const getOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
