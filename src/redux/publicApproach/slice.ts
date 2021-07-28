import {APPROACH_ACTION_TYPE_PREFIX, getPublicApproachThunk} from "./thunkActions";
import {createSlice} from "@reduxjs/toolkit";
import {ApproachPreview} from "../../infrastructure/http/api/view/approach/ApproachPreview";


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
