import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7224/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});

export default API;
