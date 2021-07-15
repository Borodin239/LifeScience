import {developmentLog} from "../../infrastructure/common/developmentLog";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";

const splitThunkPayload = (payload: any) => {
    developmentLog(`Split thunk payload ${payload}`);
    if (payload?.name === 'ApiError') {
        throw new ApiError(payload.description);
    }

    return payload;
}

export default splitThunkPayload;
