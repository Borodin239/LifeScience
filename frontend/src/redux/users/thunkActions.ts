import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserInfoView} from "../../infrastructure/http/api/view/social/user/UserInfoView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {userApi} from "../../infrastructure/http/api/methods/userApi";
import {ProtocolTitleView} from "../../infrastructure/http/api/view/protocol/ProtocolTitleView";
import {UserDTO} from "../../infrastructure/http/api/dto/user/UserDTO";

export enum UserActionThunkTypes {
    UPDATE_CURRENT = "/current",
    GET_DRAFT_PROTOCOLS = "/getDraftProtocols",
    PATCH = "/patch"
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

type GetUserDraftProtocols = {
    userId: string,
}
export const getUserDraftProtocols = createAsyncThunk<ProtocolTitleView[], // что возвращает при fulfilled
    GetUserDraftProtocols, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${USER_ACTION_TYPE_PREFIX}${UserActionThunkTypes.GET_DRAFT_PROTOCOLS}`,
    async ({userId}, thunkAPI) => {
        try {
            const response = await userApi.getDraftProtocols(userId)

            return response.data as ProtocolTitleView[]
        } catch (err) {
            console.log(err)
            return onThunkError(err, thunkAPI);
        }

    }
);

export const updateUserData = createAsyncThunk<UserInfoView,
    {
        userDTO: UserDTO,
        userId: string
    }
    ,
    {
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${USER_ACTION_TYPE_PREFIX}${UserActionThunkTypes.PATCH}`,
    async ({userDTO, userId}, thunkAPI) => {
        try {
            const response = await userApi.updateUserData(userDTO, userId);

            return response.data as UserInfoView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
);
