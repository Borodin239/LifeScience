import {developmentLog} from "../../infrastructure/common/developmentLog";
import {loggedOut} from "../auth/slice";
import {setError} from "../error/slice";
import {AppDispatch} from "../store/store";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import apiConstants from "../../infrastructure/http/api/apiConstants";

const handleThunkErrorBase = (error: any, history: any, dispatch: AppDispatch) => {
    if (error.name === 'ApiError') {
        if (error.description.systemCode === apiConstants.errors.INVALID_REFRESH_TOKEN
            || error.description.systemCode === apiConstants.errors.EXPIRED_REFRESH_TOKEN) {
            dispatch(loggedOut());
            history.push(appRoutesNames.SIGN_IN);
        } else {
            dispatch(setError({code: error.description.httpCode, message: error.description.message}));
        }
        return;
    }
    if (error.name === 'NetworkError') {
        dispatch(setError({message: error.message}));
        return;
    }

    developmentLog(`Unexpected thunk error: ${error}`);
    dispatch(setError({}));
}

export default handleThunkErrorBase;
