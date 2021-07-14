import {AxiosError} from "axios";
import {NetworkError} from "../../../common/exceptions/NetworkError";
import {ApiError, ApiErrorDescription} from "../../../common/exceptions/ApiError";
import {createApiErrorMessage} from "./apiErrorMessageUtils";
import {ApiErrorView} from "../view/ApiErrorView";
import {developmentLog} from "../../../common/developmentLog";

const transformAxiosError = (error: AxiosError) => {
    if (error.response) {
        return new ApiError({
            httpCode: error.response.status,
            systemCode: error.response.data.systemCode,
            message: createApiErrorMessage(error.response.data as ApiErrorView)
        } as ApiErrorDescription)
    }

    if (error.request) {
        return new NetworkError();
    }

    developmentLog("Unhandled axios error " + error);
    return error;
}

export default transformAxiosError;
