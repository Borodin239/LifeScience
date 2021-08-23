import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import onThunkError from "../utils/onThunkError";
import {ProtocolView} from "../../infrastructure/http/api/view/protocol/ProtocolView";
import {protocolApi} from "../../infrastructure/http/api/methods/protocolApi";
import {DraftProtocolView} from "../../infrastructure/http/api/view/protocol/DraftProtocolView";
import {CreateDraftProtocolDto} from "../../infrastructure/http/api/dto/protocol/CreateDraftProtocolDto";


export const PROTOCOL_ACTION_TYPE_PREFIX = "protocols"

enum ProtocolActionThunkTypes {
    GET_PUBLIC = "/getProtocol",
    POST_DRAFT = "/postDraft"
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
    `${PROTOCOL_ACTION_TYPE_PREFIX}${ProtocolActionThunkTypes.GET_PUBLIC}`,
    async ({approachId, protocolId}, thunkAPI) => {
        try {
            const response = await protocolApi.getPublicProtocol(approachId, protocolId)

            return response.data as ProtocolView
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

export const getDraftProtocolThunk = createAsyncThunk<
    DraftProtocolView, // что возвращает при fulfilled
    {protocolId: string}, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${PROTOCOL_ACTION_TYPE_PREFIX}${ProtocolActionThunkTypes.GET_PUBLIC}`,
    async ({protocolId}, thunkAPI) => {
        try {
            const response = await protocolApi.getDraftProtocol(protocolId)

            return response.data as DraftProtocolView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)