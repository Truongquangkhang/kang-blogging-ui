import  counterSlice  from './../reducers/iam';
import notifySlice from './../reducers/notify'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        notify: notifySlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch