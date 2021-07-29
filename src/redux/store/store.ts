import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import errorReducer from "../error/slice";
import authReducer from "../auth/slice";
import searchReducer from "../search/slice"
import approachReducer from "../publicApproach/slice"
import sectionReducer from "../section/slice"
import navigationReducer from "../navigation/slice";
import usersReducer from "../users/slice";

import logger from "redux-logger";


export const store = configureStore({
    reducer: {errorReducer, authReducer, navigationReducer, searchReducer,  approachReducer, sectionReducer, usersReducer},
    middleware: process.env.REACT_APP_MODE === `development` ?
        getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
