import { createSlice} from "@reduxjs/toolkit";
import { deleteProduct, getProducts } from "../actions";
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
  },
});

export default productSlice.reducer;

export type { IProductList };
