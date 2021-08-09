import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {CategoryInfoView} from "../../infrastructure/http/api/view/category/CategoryInfoView";
import {categoriesApi} from "../../infrastructure/http/api/methods/categoriesApi";
import {CategoryRootView} from "../../infrastructure/http/api/view/category/CategoryRootView";
import {PathUnitView} from "../../infrastructure/http/api/view/path/PathUnitView/PathUnitView";

export const CATEGORIES_ACTION_TYPE_PREFIX = 'categories';

export enum CategoriesActionThunkTypes {
    GET_CATEGORY_INFO = "/info",
    GET_CATEGORY_ROOT = "/root-info",
    GET_PATHS = "/paths"
}

export const getCategoryInfoThunk = createAsyncThunk<CategoryInfoView, // что возвращает при fulfilled
    number, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${CATEGORIES_ACTION_TYPE_PREFIX}${CategoriesActionThunkTypes.GET_CATEGORY_INFO}`,
    async (id, thunkAPI) => {
        try {
            const response = await categoriesApi.getById(id);

            return response.data as CategoryInfoView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

export const getCategoryRootThunk = createAsyncThunk<CategoryInfoView,
    never,
    {
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${CATEGORIES_ACTION_TYPE_PREFIX}${CategoriesActionThunkTypes.GET_CATEGORY_ROOT}`,
    async (_, thunkAPI) => {
        try {
            const response = await categoriesApi.getRoot();

            return response.data as CategoryRootView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

export const getCategoryPathsThunk = createAsyncThunk<PathUnitView[], // что возвращает при fulfilled
    {id: string, name: string}, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${CATEGORIES_ACTION_TYPE_PREFIX}${CategoriesActionThunkTypes.GET_PATHS}`,
    async (pathUnit, thunkAPI) => {
        const {id} = pathUnit
        try {
            const response = await categoriesApi.getPaths(id);
            const pathList = response.data[0]
            return [...pathList, pathUnit] as PathUnitView[];
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)
