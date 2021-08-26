import {createAsyncThunk} from "@reduxjs/toolkit";
import {SectionView} from "../../infrastructure/http/api/view/section/SectionView";
import {AppDispatch} from "../store/store";
import {ApiError} from "../../infrastructure/common/exceptions/ApiError";
import {sectionApi} from "../../infrastructure/http/api/methods/sectionApi";
import onThunkError from "../utils/onThunkError";
import {PatchDraftProtocolSectionDto} from "../../infrastructure/http/api/dto/section/PatchDraftProtocolSectionDto";
import {PostDraftProtocolDto} from "../../infrastructure/http/api/dto/section/PostDraftProtocolDto";

export const SECTION_ACTION_TYPE_PREFIX = 'sections'

enum SectionActionThunkTypes {
    GET_APPROACH_SECTION = "/getApproachSection",
    GET_PROTOCOL_SECTION = "/getProtocolSection",
    PATCH_DRAFT_PROTOCOL_SECTION = "/patchDraftProtocolSection",
    POST_DRAFT_PROTOCOL_SECTION = "/postDraftProtocolSection",
    GET_DRAFT_PROTOCOL_SECTION = "/getDraftProtocolSection",
}

type GetApproachSectionArguments = {
    approachId: string,
    sectionId: string,
}

type GetProtocolSectionArguments = {
    approachId: string,
    protocolId: string,
    sectionId: string,
}

type GetDraftProtocolSectionArguments = {
    protocolId: string,
    sectionId: string,
}

export const getApproachSectionThunk = createAsyncThunk<SectionView, // что возвращает при fulfilled
    GetApproachSectionArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${SectionActionThunkTypes.GET_APPROACH_SECTION}`,
    async ({approachId, sectionId}, thunkAPI) => {
        try {
            const response = await sectionApi.getApproachSection(approachId, sectionId);

            return response.data as SectionView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

export const getProtocolSectionThunk = createAsyncThunk<
    SectionView, // что возвращает при fulfilled
    GetProtocolSectionArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${SectionActionThunkTypes.GET_PROTOCOL_SECTION}`,
    async ({approachId, protocolId, sectionId}, thunkAPI) => {
        try {
            const response = await sectionApi.getProtocolSection(approachId, protocolId, sectionId)

            return response.data as SectionView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

type PatchDraftProtocolArguments = {
    dto: PatchDraftProtocolSectionDto,
    protocolId: string,
    sectionId: string,
}

export const patchDraftProtocolSectionThunk = createAsyncThunk<
    SectionView, // что возвращает при fulfilled
    PatchDraftProtocolArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${SectionActionThunkTypes.PATCH_DRAFT_PROTOCOL_SECTION}`,
    async ({dto, protocolId, sectionId}, thunkAPI) => {
        try {
            const response = await sectionApi.patchDraftProtocolSection(dto, protocolId, sectionId);

            return response.data as SectionView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

type PostDraftProtocolArguments = {
    dto: PostDraftProtocolDto,
    protocolId: string,
}

export const postDraftProtocolSectionThunk = createAsyncThunk<
    SectionView, // что возвращает при fulfilled
    PostDraftProtocolArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${SectionActionThunkTypes.POST_DRAFT_PROTOCOL_SECTION}`,
    async ({dto, protocolId}, thunkAPI) => {
        try {
            const response = await sectionApi.postDraftProtocolSection(dto, protocolId);

            return response.data as SectionView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)

export const getDraftProtocolSectionThunk = createAsyncThunk<
    SectionView, // что возвращает при fulfilled
    GetDraftProtocolSectionArguments, // что принимает как аргумент при dispatch
    { // деструктуризация thunkAPI
        dispatch: AppDispatch,
        rejectValue: ApiError
    }>(
    `${SECTION_ACTION_TYPE_PREFIX}${SectionActionThunkTypes.GET_PROTOCOL_SECTION}`,
    async ({protocolId, sectionId}, thunkAPI) => {
        try {
            const response = await sectionApi.getDraftProtocolSection(protocolId, sectionId)

            return response.data as SectionView
        } catch (err) {
            return onThunkError(err, thunkAPI);
        }

    }
)