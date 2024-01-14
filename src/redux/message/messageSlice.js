import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deleteMessageError: false,
    deleteMessageSuccess: false
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.deleteMessageError = action.payload.deleteMessageError
            state.deleteMessageSuccess = action.payload.deleteMessageSuccess
        }
    },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer