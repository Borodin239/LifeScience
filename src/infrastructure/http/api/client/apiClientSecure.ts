import axios from "axios";
import {authApi} from "../methods/authApi";
import transformAxiosError from "../utils/transformAxiosError";
import {developmentLog} from "../../../common/developmentLog";
import {getAccessToken, setAccessToken} from "../utils/tokenUtils";

const apiClientSecure = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL
});

apiClientSecure.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`
    return config;
})

apiClientSecure.interceptors.response.use((config) => {
        return config
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response && [401003, 401004].includes(error.response.data?.systemCode)) {
            try {
                developmentLog("Potential auth error, trying to refresh... ");
                const response = await authApi.refresh();
                setAccessToken(response.data.accessToken);
                return apiClientSecure.request(originalRequest);
            } catch (retryErr) {
                if (axios.isAxiosError(retryErr)) {
                    throw transformAxiosError(retryErr);
                }

                developmentLog("Unexpected error in the refresh interceptor: " + retryErr);
            }
        }

        throw axios.isAxiosError(error) ? transformAxiosError(error) : error;
    }
)

export default apiClientSecure;
