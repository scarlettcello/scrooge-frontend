import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getBaseUrl = () => {
  let url;

  switch(process.env.NODE_ENV) {
    case 'production':
      url = process.env.API_URL;
      break;
    case 'development':
    default:
      url = 'http://localhost:5000/api/users';
  }

  return url;
}

const register = async (userData) => {
  const url = getBaseUrl();
  const response = await axios.post(url, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const logout = () => localStorage.removeItem('user');

const authService = { getBaseUrl, register, logout, login }

export default authService;