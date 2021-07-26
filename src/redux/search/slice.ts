import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {searchApi} from "../../infrastructure/http/api/search/searchApi";

export const SEARCH_ACTION_TYPE_PREFIX = 'auth';

type CategorySearchResult = {
    "categoryId": number,
    "name": string,
    "typeName": "Category",
}

type ApproachSearchResult = {
    "publishApproachId": number,
    "name": string,
    "typeName": "Approach",
}

type ProtocolSearchResult = {
    "publishProtocolId": number,
    "name": string,
    "typeName": "Protocol",
}

type SearchResult = CategorySearchResult | ApproachSearchResult | ProtocolSearchResult

type SearchState = {
    results: SearchResult[],
}

const initState: SearchState = {
    results: [],
}

export enum SearchActionThunkTypes {
    SEARCH = "/search",
}

export type SearchDto = {
    "text": string,
    "includeTypes?": ["CATEGORY" | "APPROACH" | "PROTOCOL"],
    "size?": number,
    "from?": number
}

export const SearchThunk = createAsyncThunk<SearchResult[], // что возвращает при fulfilled
    SearchDto, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SEARCH_ACTION_TYPE_PREFIX}${SearchActionThunkTypes.SEARCH}`,
    async (dto, thunkAPI) => {
        try {
            const response = await searchApi.search(dto)

            return response.data as SearchResult
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)

const searchSlice = createSlice({
    name: SEARCH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SearchThunk.fulfilled, (state, action) => {
            state.results = action.payload
        })
    }
});

export default searchSlice.reducer

