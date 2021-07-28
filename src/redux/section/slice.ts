import {createSlice} from "@reduxjs/toolkit";
import {SectionView} from "../../infrastructure/http/api/view/section/SectionView";
import {getSectionThunk, SECTION_ACTION_TYPE_PREFIX} from "./thunkActions";

const initState: SectionView = {
    "id": '',
    "name": '',
    "hidden": false,
    "content": '',
}

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