import {createReducer} from "@reduxjs/toolkit";
import {hideError, setError} from "./actions";
import {AppErrorDescription} from "../../infrastructure/common/exceptions/AppError";


const initState: {errorOccurred: AppErrorDescription | null} = {
    errorOccurred: null
};

export const errorReducer = createReducer(initState, (builder) => {
    builder
        .addCase(setError, (state, action) => {
            state.errorOccurred = action.payload;
        })
        .addCase(hideError, (state, _) => {
            // state.errorOccurred = null;
            state.errorOccurred = null;
        })
        .addDefaultCase(() => {});
});
