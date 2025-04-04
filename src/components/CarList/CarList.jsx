import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";
import { getAllCars } from "../../utils/getAllCars";

export default function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const data = await getAllCars();
      setCars(data);
    }
    fetchCars();
  }, []);

  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
