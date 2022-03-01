import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {searchApi} from "../../infrastructure/http/api/search/searchApi";
import {SearchDto} from "../../infrastructure/http/api/dto/search/SearchDto";
import {SearchResultView, SearchSuggestResultView} from "../../infrastructure/http/api/view/search/SearchResultView";
import {developmentLog} from "../../infrastructure/common/developmentLog";
import apiConstants from "../../infrastructure/http/api/apiConstants";
import {debounce} from "debounce";

export const SEARCH_ACTION_TYPE_PREFIX = 'auth';

type SearchState = {
    results: SearchResultView[],
    suggestions: SearchSuggestResultView[]
}

const initState: SearchState = {
    results: [],
    suggestions: []
}

export enum SearchActionThunkTypes {
    SEARCH = "/search",
    PRE_SEARCH = "/pre-search"
}

//TODO: вынести в thunkActions
export const preSearchThunk = createAsyncThunk<void,
    string,
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SEARCH_ACTION_TYPE_PREFIX}${SearchActionThunkTypes.PRE_SEARCH}`,
    debounce(async (textPrefix, {dispatch}) => {
        developmentLog(`preSearchHandler: query: ${textPrefix}`);
        try {
            if (textPrefix.length < apiConstants.search.MIN_LENGTH) {
                dispatch(searchSlice.actions.updateSuggestions([]));
                return;
            }

            const response = await searchApi.preSearch({
                text: textPrefix,
                size: apiConstants.search.SUGGEST_BUNDLE_SIZE
            });
            developmentLog(`search response: ${JSON.stringify(response)}`);

            dispatch(searchSlice.actions.updateSuggestions((response.data as SearchSuggestResultView[])));
        } catch (err) {
            developmentLog(`Suggest failed: ${err}`);
            dispatch(searchSlice.actions.updateSuggestions([]));
        }
    }, apiConstants.search.SUGGEST_UPDATE_INTERVAL_MS)
);

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

            return response.data as SearchResultView[]
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }
    }
)

const searchSlice = createSlice({
    name: SEARCH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {
        updateSuggestions(state, action: PayloadAction<SearchSuggestResultView[]>) {
            state.suggestions = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchThunk.fulfilled, (state, action) => {
            state.results = action.payload
        })
    }
});

export default searchSlice.reducer

