import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page, filters }, thunkAPI) => {
    try {
      const response = await axios.get(`/cars`, {
        params: {
          page,
          filters,
        },
      });
      console.log("Fetched cars response: ", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
