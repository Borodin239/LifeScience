import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {searchApi} from "../../infrastructure/http/api/search/searchApi";
import {SearchDto} from "../../infrastructure/http/api/dto/search/SearchDto";
import {SearchResultView} from "../../infrastructure/http/api/view/search/SearchResultView";

export const SEARCH_ACTION_TYPE_PREFIX = 'auth';

type SearchState = {
    results: SearchResultView[],
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

export const searchThunk = createAsyncThunk<SearchResultView[], // что возвращает при fulfilled
    SearchDto, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SEARCH_ACTION_TYPE_PREFIX}${SearchActionThunkTypes.SEARCH}`,
    async (dto, thunkAPI) => {
        try {
            const response = await searchApi.search(dto)

            return response.data as SearchResultView
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

