import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import UserReducer from './features/userSlice';


const store = configureStore({
    reducer: {
        user: UserReducer,
        product: productReducer
    }
})

export default store;

type stateType = ReturnType<typeof store.getState>

export type { stateType };