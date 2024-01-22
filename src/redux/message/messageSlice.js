import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deleteMessageError: false,
    deleteMessageSuccess: false,
    addMessageSuccess: false,
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.deleteMessageError = action.payload?.deleteMessageError
            state.deleteMessageSuccess = action.payload?.deleteMessageSuccess
            state.addMessageSuccess = action.payload?.addMessageSuccess
        }
    },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer