import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppErrorDescription} from "../../infrastructure/common/exceptions/AppError";

const ERROR_ACTION_TYPE_PREFIX = 'error';

const initState: {errorOccurred: AppErrorDescription | null} = {
    errorOccurred: null
};

const errorSlice = createSlice({
    name: ERROR_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {
        setError(state, action: PayloadAction<AppErrorDescription>) {
            state.errorOccurred = action.payload;
        },
        hideError(state) {
            state.errorOccurred = null;
        }
    }
});

export const {setError, hideError} = errorSlice.actions;
export default errorSlice.reducer;
