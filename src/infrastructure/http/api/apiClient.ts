import axios from "axios";
import apiConstants from "./apiConstants";

const apiClient = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL
});

apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(apiConstants.ACCESS_TOKEN_NAME)}`
    return config;
})

export default apiClient;
