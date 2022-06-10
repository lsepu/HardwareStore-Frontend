import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBillList } from "./features/BillSlice";
import { IProduct, IProductList } from "./features/productSlice";
import { IProvider, IProviderList } from "./features/providerSlice";
import { IRecepit, IRecepitList } from "./features/receiptSlice";

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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: IProduct) => {
    const response = await fetch("http://localhost:8080/product/update", {
      method: "PUT",
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

export const deleteProvider = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const response = await fetch(`http://localhost:8080/provider/delete/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const addProvider = createAsyncThunk(
  "products/addProvider",
  async (provider: IProvider) => {
    const response = await fetch("http://localhost:8080/provider/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(provider),
    });
    const formattedResponse = await response.json();
    return formattedResponse as IProvider;
  }
);

export const getBills = createAsyncThunk(
  "bills/getBills",
  async () => {
    const response = await fetch("http://localhost:8080/bill/all");
    const formattedResponse = await response.json();
    return formattedResponse as IBillList;
  }
);

export const getReceipts = createAsyncThunk(
  "receipts/getReceipts",
  async () => {
    const response = await fetch("http://localhost:8080/receipt/all");
    const formattedResponse = await response.json();
    return formattedResponse as IRecepitList;
  }
);

export const createReceipt = createAsyncThunk(
  "receipts/createReceipt",
  async (receipt: IRecepit) => {
    const response = await fetch("http://localhost:8080/receipt/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(receipt),
    });
    const formattedResponse = await response.json();
    return formattedResponse as IRecepit;
  }
);