import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./cars/carSlice";
import messageSlice from "./message/messageSlice";

export const store = configureStore({
    reducer: {
        cars: carSlice,
        messages: messageSlice
    },
});