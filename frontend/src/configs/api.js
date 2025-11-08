import axios from "axios";

const api = axios.create({
  baseURL: 'http://172.18.55.215:17500',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2)
//     return decodeURIComponent(parts.pop().split(";").shift());
//   return null;
// };

// api.interceptors.request.use(
//   config => {
//     let token = getCookie('csrftoken');
//     if (token) {
//       config.headers['csrftoken'] = token;
//     };

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default api;