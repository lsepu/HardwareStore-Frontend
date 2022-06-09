import { createSlice } from "@reduxjs/toolkit";
import { getBills } from "../actions";

interface IBill {
    id: string;
    date: string;
    clientName: string;
    salesPersonName: string;
    products: IProductOrder[] 
}

interface IProductOrder {
    name: string;
    price: number;
    quantity: number;
}

interface IBillList {
    bills: IBill[]
}

const initialState : IBillList = {
    bills : []
}

export const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
    //fecth
    builder.addCase(getBills.fulfilled, (state, action) => {
        state.bills = action.payload;
      });
    }
})

export default billSlice.reducer;

export type { IBillList, IBill };