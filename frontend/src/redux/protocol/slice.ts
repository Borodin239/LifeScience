import {ProtocolView} from "../../infrastructure/http/api/view/protocol/ProtocolView";
import {createSlice} from "@reduxjs/toolkit";
import {getPublicProtocolThunk, PROTOCOL_ACTION_TYPE_PREFIX} from "./thunkActions";

type ProtocolState = {
    protocol: ProtocolView,
}

const initState: ProtocolState = {
    protocol: {
        id: "",
        name: "",
        sections: [],
        coAuthors: [],
        approach: {
            name: "",
            id: "",
        },
    }
}

const protocolSlice = createSlice({
    name: PROTOCOL_ACTION_TYPE_PREFIX,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPublicProtocolThunk.fulfilled, (state, action) => {
            state.protocol = {
                ...action.payload
            }
        })
    },
})

export default protocolSlice.reducer