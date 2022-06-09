import { createSlice } from '@reduxjs/toolkit';

interface IProvider {
    name: string;
    phoneNumber: string;
    idCard: string;
}

export type { IProvider }