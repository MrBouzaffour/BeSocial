import axios from 'axios';
import store from '../store'; // Ensure the store is imported correctly

// Set up the base URL for your API
axios.defaults.baseURL = 'http://your-api-url'; // Replace with your API URL

// Intercept requests to add the auth token if available
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Intercept responses to handle errors globally
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    // Handle unauthorized access
    store.dispatch('logout');
  }
  return Promise.reject(error);
});

export default axios;
