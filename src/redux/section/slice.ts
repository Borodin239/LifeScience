import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {sectionApi} from "../../infrastructure/http/api/methods/sectionApi";
import {SectionView} from "../../infrastructure/http/api/view/section/SectionView";


export const SECTION_ACTION_TYPE_PREFIX = 'approaches'

const initState: SectionView = {
    "id": '',
    "name": '',
    "hidden": false,
    "content": '',
}

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

const sectionSlice = createSlice({
    name: SECTION_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSectionThunk.fulfilled, (state, action) => {
            return {
                ...action.payload
            }
        })
    },
})

export default sectionSlice.reducer