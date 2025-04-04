import axios from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export async function getAllCars() {
  try {
    const response = await api.get("/cars");
    console.log(response.data);

    return response.data.cars;
  } catch (error) {
    console.error(error);
    return [];
  }
}
