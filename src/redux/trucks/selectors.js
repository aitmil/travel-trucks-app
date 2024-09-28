import { createSelector } from '@reduxjs/toolkit';
import { selectFilters } from '../filters/selectors';

export const selectTrucks = state => state.trucks.items;
export const selectTotal = state => state.trucks.total;
export const selectLoading = state => state.trucks.loading;
export const selectError = state => state.trucks.error;

export const selectFilteredTrucks = createSelector(
  [selectTrucks, selectFilters],
  (trucks, filters) => {
    return trucks.filter(truck => {
      const matchesLocation =
        filters.location === '' ||
        truck.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesTruckType =
        Object.keys(filters.truckType).some(key => {
          return filters.truckType[key] && truck.form === key;
        }) || Object.values(filters.truckType).every(val => !val);

      const matchesEquipment = Object.keys(filters.truckEquipment).every(
        key => {
          if (key === 'automatic') {
            return filters.truckEquipment[key]
              ? truck.transmission === 'automatic'
              : true;
          }
          return !filters.truckEquipment[key] || truck[key];
        }
      );

      return matchesLocation && matchesTruckType && matchesEquipment;
    });
  }
);

export const selectTruck = state => state.trucks.truck;
