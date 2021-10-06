import axios from "axios";
import transformAxiosError from "../utils/transformAxiosError";

const apiClientDefault = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL
});

apiClientDefault.interceptors.response.use((config) => {
        return config
    }, async (error) => {
        throw axios.isAxiosError(error) ? transformAxiosError(error) : error;
    }
)

export default apiClientDefault;
