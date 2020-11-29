import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const axiosSetting = axios.create({ baseURL: BASE_URL });

axiosSetting.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosSetting;
