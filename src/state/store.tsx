import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import providerReducer from "./features/providerSlice";
import UserReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    product: productReducer,
    provider: providerReducer,
  },
});

export default store;

type stateType = ReturnType<typeof store.getState>;

export type { stateType };
