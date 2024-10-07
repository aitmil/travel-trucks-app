import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/';

export const fetchTrucks = createAsyncThunk(
  'trucks/fetchAll',
  async ({ page, filters = {}, reset = false }, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '4',
      });

      if (filters) {
        Object.entries(filters.truckEquipment).forEach(
          ([equipmentKey, value]) => {
            if (value) {
              params.append(equipmentKey, 'true');
            }
          }
        );

        if (filters.form) {
          params.append('form', filters.form);
        }

        if (filters.location) {
          params.append('location', filters.location);
        }

        if (filters.transmission) {
          params.append('transmission', filters.transmission);
        }
      }

      const { data } = await axios.get(`/campers?${params.toString()}`);
      return { reset, ...data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTruckById = createAsyncThunk(
  'truck/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
