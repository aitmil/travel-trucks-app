import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  transmission: '',
  truckEquipment: {
    kitchen: false,
    AC: false,
    TV: false,
    bathroom: false,
  },
  form: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setTransmission(state, action) {
      state.transmission = action.payload;
    },
    toggleTruckEquipment(state, action) {
      const key = action.payload;
      if (key in state.truckEquipment) {
        state.truckEquipment[key] = !state.truckEquipment[key];
      }
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setTransmission, toggleTruckEquipment, setForm } =
  filterSlice.actions;

export const filtersReducer = filterSlice.reducer;
