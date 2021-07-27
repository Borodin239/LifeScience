import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {approachApi} from "../../infrastructure/http/api/methods/approachApi";
import onThunkError from "../utils/onThunkError";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {ApproachPreview} from "../../infrastructure/http/api/view/approach/ApproachPreview";

export const APPROACH_ACTION_TYPE_PREFIX = 'approaches'

type ApproachState = {
    approach: ApproachPreview,
}

const initState: ApproachState = {
    approach: {
        name: '',
        sections: [],
        protocols: [],
    }
}

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

const approachSlice = createSlice({
    name: APPROACH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getPublicApproachThunk.fulfilled, (state, action) => {
          state.approach = {
              name: action.payload.name,
              sections: action.payload.sections,
              protocols: action.payload.protocols,
          }
      })
    },
})

export default approachSlice.reducer
