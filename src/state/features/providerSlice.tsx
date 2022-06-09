import { createSlice } from '@reduxjs/toolkit';
import { getProviders } from '../actions';

interface IProvider {
    name: string;
    phoneNumber: string;
    idCard: string;
}

interface IProviderList {
    providers: IProvider[]
}

const initialState : IProviderList = {
    providers: []
}

export const providerSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProviders.fulfilled, (state, action) => {
            state.providers = action.payload;
        })
    }
})

export default providerSlice.reducer;

export type { IProviderList }