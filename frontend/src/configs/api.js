import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.18.55.215:30000',     //baseURL: 'http://10.13.100.101:30000'            // Un-direct to backend server, only direct to Vite through proxy configuration in vite.config.js
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default api;