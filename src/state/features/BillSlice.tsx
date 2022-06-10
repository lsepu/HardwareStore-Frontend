import { createSlice } from "@reduxjs/toolkit";
import { createBill, getBills } from "../actions";

interface IBill {
  date: string;
  clientName: string;
  salesPersonName: string;
  products: IProductOrder[];
}

interface IProductOrder {
  name: string;
  amount: number;
  total: number;
}

interface IBillList {   
  bills: IBill[];
}

const initialState: IBillList = {
  bills: [],
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fecth
    builder.addCase(getBills.fulfilled, (state, action) => {
      state.bills = action.payload;
    }),
      //create
      builder.addCase(createBill.fulfilled, (state, action) => {
        state.bills.push(action.payload);
      });
  },
});

export default billSlice.reducer;

export type { IBillList, IBill, IProductOrder };
