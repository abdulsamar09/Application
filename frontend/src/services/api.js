import axios from 'axios';

// Backend port is 5000, using local IP so mobile device can connect
const API_URL = 'http://192.168.18.52:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const signup = async (firstName, email, phone, password, confirmPassword) => {
  const response = await api.post('/api/auth/signup', {
    firstName,
    email,
    phone,
    password,
    confirmPassword,
  });
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/api/dashboard');
  return response.data;
};

export default api;
