import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./cars/slice";
import filterSlice from "./filters/slice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    filters: filterSlice,
  },
});
