import {createSlice} from "@reduxjs/toolkit";

export const APPROACH_ACTION_TYPE_PREFIX = 'approaches'

export type Section = {
    id: number,
    name: string,
}

export type Category = {
    id: number,
    name: string,
}

export type Participant = {
    "id": number,
    "fullName": string,
}

export type Approach = {
    name: string,
    sections: Section[],
    categories: Category[],
    participants: Participant[],
}

type ShortenedApproach = {
    name: string,
    sections: Section[],
}

export type ApproachState = {
    approach: ShortenedApproach,
}

const initState: ApproachState = {
    approach: {
        name: '',
        sections: [],
    }
}

const approachSlice = createSlice({
    name: APPROACH_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: {

    }
})

// export const {receivedApproach} = approachSlice.actions

export default approachSlice.reducer
