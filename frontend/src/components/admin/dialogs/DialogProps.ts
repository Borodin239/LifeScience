import {AsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../../../redux/store/store";
import {ApiError} from "../../../infrastructure/common/exceptions/ApiError";

export type DialogProps = {
    id: number,
    name: string,
    type: "category" | "approach",
    onClose: () => void,
    isOpen: boolean,
    deleteType: AsyncThunk<never, string, {dispatch: AppDispatch, rejectValue: ApiError}>
}