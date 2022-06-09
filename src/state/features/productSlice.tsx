import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../actions";
import { IProvider } from "./providerSlice";

interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  minUnits: number;
  maxUnits: number;
  provider: IProvider;
}

interface IProductList {
    products: IProduct[]
}

const initialState: IProductList = {
    products: []
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
    }
});

export default productSlice.reducer;

export type { IProductList };
