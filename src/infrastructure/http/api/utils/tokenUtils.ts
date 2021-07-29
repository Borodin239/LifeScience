import apiConstants from "../apiConstants";

export const setAccessToken = (token: string) => {
    localStorage.setItem(apiConstants.ACCESS_TOKEN_NAME, token);
}

export const getAccessToken = () => {
    return localStorage.getItem(apiConstants.ACCESS_TOKEN_NAME);
}

export const removeAccessToken = () => {
    localStorage.removeItem(apiConstants.ACCESS_TOKEN_NAME);
}
