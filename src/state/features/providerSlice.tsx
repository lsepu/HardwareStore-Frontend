import { createSlice } from '@reduxjs/toolkit';
import { deleteProvider, getProviders } from '../actions';

interface IProvider {
    id: string;
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
    name: "provider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get all providers
        builder.addCase(getProviders.fulfilled, (state, action) => {
            state.providers = action.payload;
        }),
        //delete provider
        builder.addCase(deleteProvider.fulfilled, (state, action) => {
            state.providers = state.providers.filter((provider) => provider.id !== action.payload);
        })
    }
})

export default providerSlice.reducer;

export type { IProviderList, IProvider }