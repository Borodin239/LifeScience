import {
    addNavigationUnit,
    NavigationUnit,
    patchPathFromNavigationUnit,
    pathToNavigationUnitList
} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {PathUnitView} from "../../infrastructure/http/api/view/path/PathUnitView/PathUnitView";


export const ROOT_NAVIGATION_UNIT: NavigationUnit = {
    type: "category",
    name: "Catalog",
    route: `${appRoutesNames.CATEGORIES}/`
}

const initState: { path: NavigationUnit[] } = {
    path: [
        ROOT_NAVIGATION_UNIT
    ]
};


export const NAVIGATION_ACTION_TYPE_PREFIX = 'navigation';

type SetPathArguments = {
    pathUnits: PathUnitView[],
    extraRoutes?: NavigationUnit[],
}

const navigationSlice = createSlice({
    name: NAVIGATION_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {
        pathMove(state, action: PayloadAction<NavigationUnit>) {
            state.path = addNavigationUnit(action.payload, state.path);
        },
        pathSwitch(state, action: PayloadAction<NavigationUnit>) {
            state.path = patchPathFromNavigationUnit(action.payload, state.path)
        },
        setPath(state, action: PayloadAction<SetPathArguments>) {
            const path = pathToNavigationUnitList(action.payload.pathUnits)
            state.path = [...initState.path, ...path, ...(action.payload.extraRoutes ?? [])]
        }
    }
});

export const {pathMove, pathSwitch, setPath} = navigationSlice.actions;

export default navigationSlice.reducer;
