import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user"
import homeReducer from "./slices/home"

const store  = configureStore({
    reducer:{
        user:userReducer,
        home:homeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store