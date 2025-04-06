// cars/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import { fetchCars } from "./operations/fetchCars.js";
import { fetchCarById } from "./operations/fetchCarById.js";

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearState: (state) => {
      state.carList = [];
      state.page = null;
      state.totalPages = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, page, totalPages, totalCars } = action.payload;
        state.loading = false;

        state.carList = [...state.carList, ...cars];
        state.totalCars = totalCars;
        state.totalPages = totalPages;
        state.page = page;
      })

      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;

        state.singleCar = action.payload;
      })

      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, clearState } = carSlice.actions;
export default carSlice.reducer;
