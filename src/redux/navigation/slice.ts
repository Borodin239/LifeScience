import {
    addNavigationUnit,
    NavigationUnit,
    patchPathFromNavigationUnit
} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";


export const ROOT_NAVIGATION_UNIT: NavigationUnit = {
    type: "category",
    name: "root",
    route: `${appRoutesNames.CATEGORIES}/`
}

const initState: { path: NavigationUnit[] } = {
    path: [
        ROOT_NAVIGATION_UNIT
    ]
};


export const NAVIGATION_ACTION_TYPE_PREFIX = 'navigation';

const navigationSlice = createSlice({
    name: NAVIGATION_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {
        pathMove(state, action: PayloadAction<NavigationUnit>) {
            state.path = addNavigationUnit(action.payload, state.path);
        },
        pathSwitch(state, action: PayloadAction<NavigationUnit>)  {
            state.path = patchPathFromNavigationUnit(action.payload, state.path)
        }
    }
});

export const {pathMove, pathSwitch} = navigationSlice.actions;

export default navigationSlice.reducer;
