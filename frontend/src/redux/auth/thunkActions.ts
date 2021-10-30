import {createAsyncThunk} from "@reduxjs/toolkit";
import {AUTH_ACTION_TYPE_PREFIX} from "./slice";
import {authApi} from "../../infrastructure/http/api/methods/authApi";
import {SignInDto} from "../../infrastructure/http/api/dto/auth/SignInDto";
import {SignUpDto} from "../../infrastructure/http/api/dto/auth/SignUpDto";
import {loggedIn} from "./slice";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";

export enum AuthActionThunkTypes {
    SIGN_IN = "/signIn",
    SIGN_UP = "/signUp"
}

// prefix
// prefix/fulfilled prefix/rejected prefix/pending

export const signInThunk = createAsyncThunk<
    any, // что возвращает при fulfilled
    SignInDto, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }
    >(
    `${AUTH_ACTION_TYPE_PREFIX}${AuthActionThunkTypes.SIGN_IN}`,
    async (dto, thunkAPI) => {
        try {
            const response = await authApi.signIn(dto);
            thunkAPI.dispatch(loggedIn(response.data.accessToken));
            // return ...
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

// если общее выносить, кода будет столько же из-за generic-ов

export const signUpThunk = createAsyncThunk<
    any,
    SignUpDto,
    {
        dispatch: AppDispatch,
        rejectValue: ApiError
    }
    >(
    `${AUTH_ACTION_TYPE_PREFIX}${AuthActionThunkTypes.SIGN_UP}`,
    async (dto: SignUpDto, thunkAPI) => {
        try {
            const response = await authApi.signUp(dto);
            thunkAPI.dispatch(loggedIn(response.data.accessToken));
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)
