import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7224/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
