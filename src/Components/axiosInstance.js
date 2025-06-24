// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Update this to match your Laravel API URL
  withCredentials: true, // Required for Sanctum cookies if you're using Sanctum
});

export default axiosInstance;
