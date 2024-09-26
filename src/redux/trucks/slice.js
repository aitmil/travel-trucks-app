import { createSlice } from '@reduxjs/toolkit';
import { fetchTrucks } from './operations';

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
      .addCase(fetchTrucks.rejected, handleRejected);
  },
});

export const trucksReducer = trucksSlice.reducer;
