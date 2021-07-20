import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {CategoryInfoView} from "../../infrastructure/http/api/view/category/CategoryInfoView";
import {categoriesApi} from "../../infrastructure/http/api/methods/categoriesApi";

export const CATEGORIES_ACTION_TYPE_PREFIX = 'categories';

export enum CategoriesActionThunkTypes {
    GET_INFO = "/info"
}

export const getCategoryInfoThunk = createAsyncThunk<
    CategoryInfoView, // что возвращает при fulfilled
    number, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }
    >(
    `${CATEGORIES_ACTION_TYPE_PREFIX}${CategoriesActionThunkTypes.GET_INFO}`,
    async (id, thunkAPI) => {
        try {
            const response = await categoriesApi.getById(id);

            return response.data as CategoryInfoView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)
