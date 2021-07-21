import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import errorReducer from "../error/slice";
import authReducer from "../auth/slice";
import approachReducer from "../approach/slice"

import logger from "redux-logger";


export const store = configureStore({
    reducer: {errorReducer, authReducer, approachReducer},
    middleware: process.env.REACT_APP_MODE === `development` ?
        getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
