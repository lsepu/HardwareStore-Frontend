import { createSlice } from "@reduxjs/toolkit";
import { createReceipt, getReceipts } from "../actions";

interface IRecepit {
  date: string;
  providerName: string;
  productName: string;
  quantity: number;
}

interface IRecepitList {
  receipts: IRecepit[];
}

const initialState: IRecepitList = {
  receipts: [],
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fecth
    builder.addCase(getReceipts.fulfilled, (state, action) => {
      state.receipts = action.payload;
    });
    //create
    builder.addCase(createReceipt.fulfilled, (state, action) => {
      state.receipts.push(action.payload);
    });
  },
});

export default receiptSlice.reducer;

export type { IRecepit, IRecepitList };
