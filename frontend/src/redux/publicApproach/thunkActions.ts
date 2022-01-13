import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {approachApi} from "../../infrastructure/http/api/methods/approachApi";
import onThunkError from "../utils/onThunkError";
import {DraftProtocolView} from "../../infrastructure/http/api/view/protocol/DraftProtocolView";
import {CreateDraftProtocolDto} from "../../infrastructure/http/api/dto/protocol/CreateDraftProtocolDto";
import {protocolApi} from "../../infrastructure/http/api/methods/protocolApi";
import {PROTOCOL_ACTION_TYPE_PREFIX} from "../protocol/thunkActions";
export const APPROACH_ACTION_TYPE_PREFIX = 'approaches'

enum ApproachActionThunkTypes {
    GET= "/getApproach",
}

export const getPublicApproachThunk = createAsyncThunk<
    ApproachView, // что возвращает при fulfilled
    string, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }
    >(
    `${APPROACH_ACTION_TYPE_PREFIX}${ApproachActionThunkTypes.GET}`,
    async (id, thunkAPI) => {
        try {
            const response = await approachApi.getApproach(id)

            return response.data as ApproachView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

export const postDraftProtocolThunk = createAsyncThunk<
    DraftProtocolView, // что возвращает при fulfilled
    CreateDraftProtocolDto, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${PROTOCOL_ACTION_TYPE_PREFIX}${ProtocolActionThunkTypes.POST_DRAFT}`,
    async (dto, thunkAPI) => {
        try {
            const response = await protocolApi.postDraftProtocol(dto);

            return response.data as DraftProtocolView;
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)
