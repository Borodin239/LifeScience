import {configureStore} from "@reduxjs/toolkit";
import {errorReducer} from "../error/reducer";

import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = configureStore({
    reducer: {errorReducer},
    middleware: process.env.REACT_APP_MODE === `development` ? [thunk, logger] : [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
