// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.137.163:8000', // ✅ Remove /api
  withCredentials: true,
});

export default axiosInstance;
