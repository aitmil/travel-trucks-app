import { createSlice } from '@reduxjs/toolkit';
import { fetchTruckById, fetchTrucks } from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const trucksSlice = createSlice({
  name: 'trucks',
  initialState: {
    items: [],
    truck: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrucks.pending, handlePending)
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrucks.rejected, handleRejected)
      .addCase(fetchTruckById.pending, handlePending)
      .addCase(fetchTruckById.fulfilled, (state, action) => {
        state.truck = action.payload;
        state.loading = false;
      })
      .addCase(fetchTruckById.rejected, handleRejected);
  },
});

export const trucksReducer = trucksSlice.reducer;
