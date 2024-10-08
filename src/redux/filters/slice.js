import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  transmission: '',
  truckEquipment: [],
  form: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilters(state, action) {
      const { location, transmission, truckEquipment, form } = action.payload;
      state.location = location;
      state.transmission = transmission;
      state.truckEquipment = truckEquipment;
      state.form = form;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const { addFilters, clearFilters } = filterSlice.actions;

export const filtersReducer = filterSlice.reducer;
