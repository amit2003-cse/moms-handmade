import axios from 'axios';

// Backend ka address (Tumhare document ke hisaab se)
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ INTERCEPTOR: Har request ke saath Token attach karega
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Browser se token uthao
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Header me jod do
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;