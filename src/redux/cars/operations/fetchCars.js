import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (
    { brand, rentalPrice, minMileage, maxMileage, limit, page },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`/cars`, {
        params: { brand, rentalPrice, minMileage, maxMileage, limit, page },
      });
      console.log("Fetched cars response: ", response.data);
      return { ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
