import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./features/BillSlice";
import productReducer from "./features/productSlice";
import providerReducer from "./features/providerSlice";
import UserReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    product: productReducer,
    provider: providerReducer,
    bill: billReducer
  },
});

export default store;

type AppDispatch = typeof store.dispatch;

type stateType = ReturnType<typeof store.getState>;

export type { stateType, AppDispatch };
