import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './filters/slice';
import { trucksReducer } from './trucks/slice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    trucks: trucksReducer,
  },
});

export default store;
