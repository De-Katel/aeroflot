import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    allFlight: [],
    stacks: [],
};

export const setAllFlight = createAsyncThunk(
    'user/setAllFlight',
    async () => {
        const response = await fetch('/all_flight/')
            .then((data) => data.json());
        return response;
    }
);

export const setStacks = createAsyncThunk(
    'user/setStacks',
    async () => {
        const response = await fetch('/api/v1/stacks/')
            .then((data) => data.json());
        return response;
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(setAllFlight.fulfilled, (state, action) => {
                state.allFlight = action.payload.items;
            })
            // .addCase(setCountry.fulfilled, (state, action) => {
            //     state.country = action.payload;
            // })
    },
});

export default dataSlice.reducer
