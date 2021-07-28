import {createAsyncThunk} from "@reduxjs/toolkit";
import {SectionView} from "../../infrastructure/http/api/view/section/SectionView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {sectionApi} from "../../infrastructure/http/api/methods/sectionApi";
import onThunkError from "../utils/onThunkError";

export const SECTION_ACTION_TYPE_PREFIX = 'approaches'

enum SectionActionThunkTypes {
    GET = "/getSection",
}

type GetSectionArguments = {
    approachId: string,
    sectionId: string,
}

export const getSectionThunk = createAsyncThunk<SectionView, // что возвращает при fulfilled
    GetSectionArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${SectionActionThunkTypes.GET}`,
    async ({approachId, sectionId}, thunkAPI) => {
        try {
            const response = await sectionApi.getSection(approachId, sectionId);

            return response.data as SectionView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)