import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      console.log("Setting filters: ", payload); // log filter values
      state.filters = {
        brand: payload?.brand || "",
        rentalPrice: payload?.rentalPrice || "",
        minMileage: payload?.minMileage || "",
        maxMileage: payload?.maxMileage || "",
      };
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
