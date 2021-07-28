import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {searchApi} from "../../infrastructure/http/api/search/searchApi";

export const SEARCH_ACTION_TYPE_PREFIX = 'auth';

export enum SearchResultType {
    CATEGORY = "Category",
    APPROACH = "Approach",
    PROTOCOL = "Protocol",
}

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

export type SearchResult = CategorySearchResult | ApproachSearchResult | ProtocolSearchResult

type SearchState = {
    results: SearchResult[],
}

const initState: SearchState = {
    results: [],
}

export enum SearchActionThunkTypes {
    SEARCH = "/search",
}

export enum SearchType {
    CATEGORY= "CATEGORY", APPROACH= "APPROACH", PROTOCOL= "PROTOCOL"
}

export type SearchDto = {
    text: string,
    includeTypes?: SearchType[],
    size?: number,
    from?: number
}

export const searchThunk = createAsyncThunk<SearchResult[], // что возвращает при fulfilled
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
        builder.addCase(searchThunk.fulfilled, (state, action) => {
            state.results = action.payload
        })
    }
});

export default searchSlice.reducer

