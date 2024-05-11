import  counterSlice  from './../reducers/iam';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        counterSlice
    }
})
