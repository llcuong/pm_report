import getCookie from "@utils/getCookie";
import axios from "axios";

const api = axios.create({
  baseURL: '/',                 // Un-direct to backend server, only direct to Vite through proxy configuration in vite.config.js
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Auto get CSRF Token every requests
api.interceptors.request.use(
  config => {
    let token = getCookie('csrftoken');
    if (token) {
      config.headers['X-CSRFToken'] = token;
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;