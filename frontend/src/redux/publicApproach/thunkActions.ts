import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {approachApi} from "../../infrastructure/http/api/methods/approachApi";
import onThunkError from "../utils/onThunkError";

export const APPROACH_ACTION_TYPE_PREFIX = 'approaches'

enum ApproachActionThunkTypes {
    GET= "/getApproach",
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