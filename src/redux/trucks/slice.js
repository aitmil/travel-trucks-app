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
    total: 0,
    truck: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTrucks(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrucks.pending, handlePending)
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        state.loading = false;
        const { items, reset } = action.payload;

        if (reset) {
          state.items = items;
        } else {
          state.items = [...state.items, ...items];
        }

        state.total = action.payload.total;
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

export const { clearTrucks } = trucksSlice.actions;

export const trucksReducer = trucksSlice.reducer;
