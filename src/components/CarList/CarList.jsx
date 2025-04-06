import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { selectCarList } from "../../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";

import { useSearchParams } from "react-router-dom";
import { clearState, setPage } from "../../redux/cars/slice";
import { setFilter } from "../../redux/filters/slice";
// import { selectFilters } from "../../redux/filters/selectors";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);
  const [searchParams, setSearchParams] = useSearchParams();
  // const filters = useSelector(selectFilters);
  // const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    const page = searchParams.get("page");

    const newParams = page === 1;

    setSearchParams(newParams);
  }, []);

  // useEffect(() => {
  //   dispatch(fetchCars({ limit: 12, page }));
  // }, [dispatch, page]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    dispatch(fetchCars(params));
  }, [dispatch, searchParams]);

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
