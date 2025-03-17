import axios from "axios";
import { BASE_URL } from "./constants";

//creating axios instance with predefined settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, //10 seconds for request or timeout error
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptors allow modifying requests before they are sent (runs before every request)

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; //API will verify token before granting access
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); //stops request from being sent if something goes wrong
  }
);

export default axiosInstance;

//look at the jwt auth middleware in server for reminder on how this works
