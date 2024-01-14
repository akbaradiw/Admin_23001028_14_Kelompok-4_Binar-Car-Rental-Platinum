import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list_car: [],
};

const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        getCars(state, action) {
            state.list_car = action.payload
        }
    },
});

export const { getCars } = carSlice.actions;
export default carSlice.reducer