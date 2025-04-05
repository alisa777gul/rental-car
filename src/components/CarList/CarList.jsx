import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import {
  selectCarList,
  selectCurrentPage,
  selectFilters,
} from "../../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import styles from "./CarList.module.css";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);

  const page = useSelector(selectCurrentPage);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  return (
    <div>
      <ul className={styles.list}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </div>
  );
}
