import {configureStore} from "@reduxjs/toolkit";
import errorReducer from "../error/slice";
import authReducer from "../auth/slice";
import searchReducer from "../search/slice"
import approachReducer from "../publicApproach/slice"
import sectionReducer from "../section/slice"
import navigationReducer from "../navigation/slice";
import usersReducer from "../users/slice";
import protocolReducer from "../protocol/slice"

import logger from "redux-logger";
import { save, load } from "redux-localstorage-simple"

export const store = configureStore({
    reducer: {errorReducer, authReducer, navigationReducer, usersReducer, approachReducer, sectionReducer, protocolReducer, searchReducer},
    middleware: getDefaultMiddleware => process.env.REACT_APP_MODE === `development` ?
        getDefaultMiddleware()
            // .concat(logger):getDefaultMiddleware()
            .concat(save()).concat(logger)
        : getDefaultMiddleware().concat(save()),
    preloadedState: load()
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
