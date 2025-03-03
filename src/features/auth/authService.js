import axios from 'axios';

const url = import.meta.env.VITE_NODE_ENV == 'production' ? 
import.meta.env.VITE_API_URL : 'http://localhost:5000';

const register = async (userData) => {
  const response = await axios.post(`${url}/api/users`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const login = async (userData) => {
  const response = await axios.post(`${url}/api/users`+ '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const logout = () => localStorage.removeItem('user');

const authService = { url, register, logout, login }

export default authService;