import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeAccessToken, setAccessToken} from "../../infrastructure/http/api/utils/tokenUtils";

export const AUTH_ACTION_TYPE_PREFIX = 'auth';

const initState: { isAuthorized: boolean } = {
    isAuthorized: localStorage.getItem('isAuthorized') == null ? false : JSON.parse(localStorage.getItem('isAuthorized')!),
};

const authSlice = createSlice({
    name: AUTH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {
        loggedOut(state) {
            state.isAuthorized = false;
            removeAccessToken();
            localStorage.setItem('isAuthorized', "false");
        },
        loggedIn(state, action: PayloadAction<string>) {
            setAccessToken(action.payload);
            state.isAuthorized = true;
            localStorage.setItem('isAuthorized', "true");
        },
    },
    /* extraReducers: {
        ['fetchUser/fulfilled']
    }*/
});

export const {loggedIn, loggedOut} = authSlice.actions;

export default authSlice.reducer;