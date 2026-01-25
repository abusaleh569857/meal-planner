import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_MEALDB_BASE_URL,
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
