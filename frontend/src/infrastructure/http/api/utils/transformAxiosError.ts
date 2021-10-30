import {AxiosError} from "axios";
import {NetworkError} from "../../../common/exceptions/NetworkError";
import {ApiError, ApiErrorDescription} from "../../../common/exceptions/ApiError";
import {createApiErrorMessage} from "./apiErrorMessageUtils";
import {ApiErrorView} from "../view/ApiErrorView";
import {developmentLog} from "../../../common/developmentLog";

const transformAxiosError = (error: AxiosError) => {
    if (error.response) {
        developmentLog(`AxiosError response: ${JSON.stringify(error.response)}`);
        const apiError = new ApiError({
            httpCode: error.response.status,
            systemCode: error.response.data.systemCode,
            message: createApiErrorMessage(error.response.data as ApiErrorView)
        } as ApiErrorDescription)

        developmentLog(`Created ApiError: ${apiError}. Desription: ${JSON.stringify(apiError.description)}`);

        return apiError;
    }

    if (error.request) {
        return new NetworkError();
    }

    developmentLog("Unhandled axios error " + error);
    return error;
}

export default transformAxiosError;
