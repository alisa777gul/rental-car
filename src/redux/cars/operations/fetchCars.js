import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
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

      return { ...response.data };
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "Oops...Try again!",
        position: "topRight",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
