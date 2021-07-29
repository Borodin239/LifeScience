import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserInfoView} from "../../infrastructure/http/api/view/social/user/UserInfoView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {userApi} from "../../infrastructure/http/api/methods/userApi";

export enum UserActionThunkTypes {
    UPDATE_CURRENT = "/current"
}

export const USER_ACTION_TYPE_PREFIX = 'user';

export const updateCurrentUserThunk = createAsyncThunk<UserInfoView,
    undefined,
    {
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${USER_ACTION_TYPE_PREFIX}${UserActionThunkTypes.UPDATE_CURRENT}`,
    async (_, thunkAPI) => {
        try {
            const response = await userApi.getCurrent();

            return response.data as UserInfoView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
);
