import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../actions";
import { IProvider } from "./providerSlice";

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  minUnits: number;
  maxUnits: number;
  provider: IProvider;
}

interface IProductList {
  products: IProduct[];
}

const initialState: IProductList = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fecth
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    //delete
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    //create
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    //update
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      state.products= state.products.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    });
  },
});

export default productSlice.reducer;

export type { IProductList, IProduct };
