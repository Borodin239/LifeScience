import {ApiErrorDescription} from "../infrastructure/common/exceptions/ApiError";

export type ApiResultWrapper<TData> = {
    isPending: boolean,
    data: TData | null,
    errorDescription: ApiErrorDescription | null
}
