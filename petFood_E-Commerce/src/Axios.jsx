import axios from "axios";
import toast from 'react-hot-toast';

const instance = axios.create({
  baseURL: 'http://localhost:3028/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

// Adding request interceptor to include JWT token in headers
 instance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("userTocken") || localStorage.getItem("adminToken");
    if (!jwtToken) {
      toast.error("Token is not available");
      return Promise.reject(new Error("Token is not available"));
    }
    config.headers['Authorization'] = jwtToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
