import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./cars/slice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});
