import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {ProtocolView} from "../../infrastructure/http/api/view/protocol/ProtocolView";
import {protocolApi} from "../../infrastructure/http/api/methods/protocolApi";


export const PROTOCOL_ACTION_TYPE_PREFIX = "protocols"

enum ProtocolActionThunkTypes {
    GET = "/getProtocol"
}

type GetProtocolArguments = {
    approachId: string,
    protocolId: string,
}

export const getPublicProtocolThunk = createAsyncThunk<
    ProtocolView, // что возвращает при fulfilled
    GetProtocolArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${PROTOCOL_ACTION_TYPE_PREFIX}${ProtocolActionThunkTypes.GET}`,
    async ({approachId, protocolId}, thunkAPI) => {
        try {
            const response = await protocolApi.getProtocol(approachId, protocolId)

            return response.data as ProtocolView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)