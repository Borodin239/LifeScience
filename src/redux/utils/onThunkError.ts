import {developmentLog} from "../../infrastructure/common/developmentLog";
import {setError} from "../error/slice";

export const onThunkError = (error: any, thunkAPI: any) => {
    if (error.name === 'ApiError') {
        thunkAPI.rejectWithValue(error.description);
    } else {
        developmentLog("Unhandled thunkError: " + error);
        thunkAPI.dispatch(setError({message: error.message}));
    }
};
