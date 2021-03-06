import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {approachApi} from "../../infrastructure/http/api/methods/approachApi";
import onThunkError from "../utils/onThunkError";
import {CreatePublicApproachDto} from "../../infrastructure/http/api/dto/approach/CreatePublicApproachDto";
export const APPROACH_ACTION_TYPE_PREFIX = 'approaches'

enum ApproachActionThunkTypes {
    GET= "/getApproach",
    POST="/postApproach",
    DELETE="/deleteApproach"
}

export const getPublicApproachThunk = createAsyncThunk<
    ApproachView, // что возвращает при fulfilled
    string, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }
    >(
    `${APPROACH_ACTION_TYPE_PREFIX}${ApproachActionThunkTypes.GET}`,
    async (id, thunkAPI) => {
        try {
            const response = await approachApi.getApproach(id)

            return response.data as ApproachView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

export const postPublicApproachThunk = createAsyncThunk<
    ApproachView, // что возвращает при fulfilled
    CreatePublicApproachDto, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${APPROACH_ACTION_TYPE_PREFIX}${ApproachActionThunkTypes.POST}`,
    async (dto, thunkAPI) => {
        try {
            const response = await approachApi.postPublicApproach(dto);

            return response.data as ApproachView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)

export const deletePublicApproach = createAsyncThunk<never,
    string,
    {
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>
(
    `${APPROACH_ACTION_TYPE_PREFIX}${ApproachActionThunkTypes.DELETE}`,
    async (id, thunkAPI) => {
        try {
            await approachApi.deletePublicApproach(id);
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)