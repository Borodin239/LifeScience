import {createAsyncThunk} from "@reduxjs/toolkit";
import {AUTH_ACTION_TYPE_PREFIX} from "./slice";
import {authApi} from "../../infrastructure/http/api/methods/authApi";
import {SignInDto} from "../../infrastructure/http/api/dto/auth/SignInDto";
import {SignUpDto} from "../../infrastructure/http/api/dto/auth/SignUpDto";
import {loggedIn} from "./slice";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {SECTION_ACTION_TYPE_PREFIX} from "../section/thunkActions";

export enum AuthActionThunkTypes {
    SIGN_IN = "/signIn",
    SIGN_UP = "/signUp",
    RESEND_EMAIL = "/confirmation/resend",
    // TODO
    VALIDATE_TOKEN = ""
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
            await authApi.signUp(dto);
            // thunkAPI.dispatch(loggedIn(response.data.accessToken));
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)
export const patchEmailConfirmationThunk = createAsyncThunk<
    any,
    SignInDto["email"],
    {
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${AuthActionThunkTypes.RESEND_EMAIL}`,
    async (email, thunkAPI) => {
        try {
            await authApi.resend(email);
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)

export const patchTokenValidationThunk = createAsyncThunk<
    void,
    string,
    {
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${AuthActionThunkTypes.VALIDATE_TOKEN}`,
    async (token, thunkAPI) => {
        try {
            return await authApi.validate_token(token);
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)


