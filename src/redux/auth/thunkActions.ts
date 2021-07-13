import {createAsyncThunk} from "@reduxjs/toolkit";
import {AUTH_ACTION_TYPE_PREFIX} from "./slice";
import {authApi} from "../../infrastructure/http/api/methods/authApi";
import {SignInDto} from "../../infrastructure/http/api/dto/auth/SignInDto";
import {onThunkError} from "../utils/onThunkError";
import {SignUpDto} from "../../infrastructure/http/api/dto/auth/SignUpDto";
import {loggedIn} from "./slice";

export enum AuthActionThunkTypes {
    SIGN_IN = "/signIn",
    SIGN_UP = "/signUp"
}

export const signInThunk = createAsyncThunk(
    `${AUTH_ACTION_TYPE_PREFIX}${AuthActionThunkTypes.SIGN_IN}`,
    async (dto: SignInDto, thunkAPI) => {
        try {
            const response = await authApi.signIn(dto);
            thunkAPI.dispatch(loggedIn(response.data.accessToken));
        } catch (error) {
            onThunkError(error, thunkAPI);
        }
    }
)

// если общее выносить, кода будет столько же из-за generic-ов

export const signUpThunk = createAsyncThunk(
    `${AUTH_ACTION_TYPE_PREFIX}${AuthActionThunkTypes.SIGN_UP}`,
    async (dto: SignUpDto, thunkAPI) => {
        try {
            const response = await authApi.signUp(dto);
            thunkAPI.dispatch(loggedIn(response.data.accessToken));
        } catch (error) {
            onThunkError(error, thunkAPI);
        }
    }
)
