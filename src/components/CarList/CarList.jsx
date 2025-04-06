import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { selectCarList } from "../../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";
import { useSearchParams } from "react-router-dom";
import { clearState, setPage } from "../../redux/cars/slice";
import { setFilter } from "../../redux/filters/slice";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Если в URL нет параметров фильтров, сбрасываем все
    const params = Object.fromEntries(searchParams.entries());

    if (Object.keys(params).length != 0 || params.page != "1") {
      // Reset the state and set page to 1 if no filters are present in the URL
      dispatch(clearState());
      setSearchParams({ page: "1" }); // Force page 1 if filters are empty
      dispatch(setPage(1)); // Set the page to 1 in the Redux state
    }
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    if (params) {
      dispatch(fetchCars(params));
    } else {
      dispatch(setFilter({}));
      dispatch(fetchCars({ page: 1 }));
    }
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
