import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (carsState) => carsState.carList
);

export const selectCurrentPage = createSelector(
  selectCars,
  (carsState) => carsState.page
);

export const selectTotalPages = createSelector(
  selectCars,
  (carsState) => carsState.totalPages
);

export const selectTotalCars = createSelector(
  selectCars,
  (carsState) => carsState.totalCars
);

export const selectLoading = createSelector(
  selectCars,
  (carsState) => carsState.loading
);

export const selectError = createSelector(
  selectCars,
  (carsState) => carsState.error
);

export const selectSingleCar = createSelector(
  selectCars,
  (carsState) => carsState.singleCar
);
