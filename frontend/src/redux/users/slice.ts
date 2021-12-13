import {UserInfoView} from "../../infrastructure/http/api/view/social/user/UserInfoView";
import {createSlice} from "@reduxjs/toolkit";
import {updateCurrentUserThunk, updateUserData, USER_ACTION_TYPE_PREFIX} from "./thunkActions";
import {loggedOut} from "../auth/slice";

const initState: { userInfo: UserInfoView | null } = {
    userInfo: null
};

const usersSlice = createSlice({
    name: USER_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCurrentUserThunk.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(loggedOut, (state) => {
                state.userInfo = null;
            })
            .addCase(updateUserData.fulfilled, ((state, action) => {
                state.userInfo = action.payload
            }))
    }
})

export default usersSlice.reducer;
