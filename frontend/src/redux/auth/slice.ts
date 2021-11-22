import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAccessToken, setAccessToken} from "../../infrastructure/http/api/utils/tokenUtils";

export const AUTH_ACTION_TYPE_PREFIX = 'auth';

const initState: { isAuthorized: boolean } = {
    isAuthorized: false
};

const authSlice = createSlice({
    name: AUTH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {
        loggedOut(state) {
            state.isAuthorized = false;
            removeAccessToken();
        },
        loggedIn(state, action: PayloadAction<string>) {
            setAccessToken(action.payload);
            state.isAuthorized = true;
        },
    },
    /* extraReducers: {
        ['fetchUser/fulfilled']
    }*/
});

export const {loggedIn, loggedOut} = authSlice.actions;

export default authSlice.reducer;