import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/userSlice';


const store = configureStore({
    reducer: {
        user: UserReducer
    }
})

export default store;

type stateType = ReturnType<typeof store.getState>

export type { stateType };