import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  truckEquipment: {
    automatic: false,
    kitchen: false,
    AC: false,
    TV: false,
    bathroom: false,
  },
  truckType: {
    van: false,
    fullyIntegrated: false,
    alcove: false,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    toggleTruckEquipment(state, action) {
      const key = action.payload;
      if (key in state.truckEquipment) {
        state.truckEquipment[key] = !state.truckEquipment[key];
      }
    },
    setTruckType(state, action) {
      const selectedType = action.payload;
      Object.keys(state.truckType).forEach(type => {
        state.truckType[type] = type === selectedType;
      });
    },
  },
});

export const { setLocation, toggleTruckEquipment, setTruckType } =
  filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
