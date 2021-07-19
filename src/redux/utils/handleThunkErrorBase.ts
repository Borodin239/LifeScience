import {developmentLog} from "../../infrastructure/common/developmentLog";
import { loggedOut } from "../auth/slice";
import {setError} from "../error/slice";
import {AppDispatch} from "../store/store";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";

const handleThunkErrorBase = (error: any, history: any, dispatch: AppDispatch) => {
    if (error.name === 'ApiError') {
        if (error.description.systemCode === 401001 || error.description.systemCode === 401002) {
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
