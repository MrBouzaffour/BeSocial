// This file configures Axios to include the base URL and token in the headers.

import axios from 'axios';
import store from '../store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout').then(() => {
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);


export default instance;
