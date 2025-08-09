// // src/Components/axiosInstance.js
// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api", // update to your backend API
//   headers: {
//     Accept: "application/json",
//   },
// });

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // or wherever you store it
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;

// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // change to your production backend if needed
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

