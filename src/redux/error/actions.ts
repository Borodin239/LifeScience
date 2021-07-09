import {createAction} from '@reduxjs/toolkit'
import {AppErrorDescription} from "../../infrastructure/common/exceptions/AppError";

export enum ErrorActionTypes {
    SET_ERROR = 'SET_ERROR',
    HIDE_ERROR = 'HIDE_ERROR'
}


export const setError = createAction(
    ErrorActionTypes.SET_ERROR,
    (errorDescription: AppErrorDescription) => ({
        payload: errorDescription
    }));

export const hideError = createAction(ErrorActionTypes.HIDE_ERROR);
