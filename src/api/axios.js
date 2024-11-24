import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cari-barengbackend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      try {
        const newToken = await refreshToken();
        if (newToken) {
          axiosInstance.defaults.headers['Authorization'] =
            `Bearer ${newToken}`;
          return axiosInstance(error.config);
        } else {
          return Promise.reject(error);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
