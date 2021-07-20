import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {Approach, APPROACH_ACTION_TYPE_PREFIX} from "./slice";
import {approachApi} from "../../infrastructure/http/api/methods/approachApi";

export enum ApproachActionThunkTypes {
    GET= "/getApproach",
}

export const getApproachThunk = createAsyncThunk<
    Approach, // что возвращает при fulfilled
    number, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }
    >(
    `${APPROACH_ACTION_TYPE_PREFIX}${ApproachActionThunkTypes.GET}`,
    async (id, thunkAPI) => {
        try {
            const response = await approachApi.getApproach(id)

            return response.data as Approach
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)
