import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {approachApi} from "../../infrastructure/http/api/methods/approachApi";
import onThunkError from "../utils/onThunkError";

export const APPROACH_ACTION_TYPE_PREFIX = 'approaches'

export type SectionTitle = {
    id: string,
    name: string,
}

export type Category = {
    id: number,
    name: string,
    creationDate: string,
}

export type CoAuthor = {
    "id": number,
    "fullName": string,
}

export type Protocol = {
    "id": number,
    "name": string,
}

export type Approach = {
    id: string,
    name: string,
    sections: SectionTitle[],
    categories: Category[],
    coAuthors: CoAuthor[],
}

export type ShortenedApproach = {
    name: string,
    sections: SectionTitle[],
}

type ApproachState = {
    approach: ShortenedApproach,
}

const initState: ApproachState = {
    approach: {
        name: '',
        sections: [],
    }
}

enum ApproachActionThunkTypes {
    GET= "/getApproach",
}

export const getPublicApproachThunk = createAsyncThunk<
    Approach, // что возвращает при fulfilled
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

            return response.data as Approach
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

const approachSlice = createSlice({
    name: APPROACH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getPublicApproachThunk.fulfilled, (state, action) => {
          state.approach = {
              name: action.payload.name,
              sections: action.payload.sections,
          }
      })
    },
})

export default approachSlice.reducer
