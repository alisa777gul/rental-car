import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      console.log("Setting filters: ", payload); // log filter values
      state.filters = {
        ...state.filters,
        brand: payload?.brand || "",
        rentalPrice: payload?.rentalPrice || "",
        minMileage: payload?.minMileage || "",
        maxMileage: payload?.maxMileage || "",
        page: 1,
        limit: payload?.limit || 12,
      };
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
