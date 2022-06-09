import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IProductList } from "./features/productSlice";
import { IProviderList } from "./features/providerSlice";

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
      method: "DELETE",
    });
    return id;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: IProduct) => {
    const response = await fetch("http://localhost:8080/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(product),
    });
    const formattedResponse = await response.json();
    return formattedResponse as IProduct;
  }
);

export const getProviders = createAsyncThunk(
  "provider/getProviders",
  async () => {
    const response = await fetch("http://localhost:8080/provider/all");
    const formattedResponse = await response.json();
    return formattedResponse as IProviderList;
  }
);
