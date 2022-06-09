import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProductList } from "./features/productSlice";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch("http://localhost:8080/product/all");
    const formattedResponse = await response.json();
    return formattedResponse as IProductList;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const response = await fetch(`http://localhost:8080/product/delete/${id}`, {
      method: "DELETE"
    });
    return id;
  }
);
