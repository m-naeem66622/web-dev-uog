
import axios from 'axios';
import { storage } from '@/utils/performance';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
  
    if (error.response?.status === 401) {
      
      storage.remove('authToken');
      storage.remove('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);