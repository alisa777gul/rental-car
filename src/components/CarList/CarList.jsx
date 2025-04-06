import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { selectCarList } from "../../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";
import { useSearchParams } from "react-router-dom";
import { buildSearchParams } from "../../utils/buildParams";
// import { clearState, setPage } from "../../redux/cars/slice";
// import { setFilter } from "../../redux/filters/slice";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);
  const [searchParams, setSearchParams] = useSearchParams();
  const didFetch = useRef();

  useEffect(() => {
    if (didFetch.current || cars.length > 0) return;
    didFetch.current = true;
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams(buildSearchParams(params));

    dispatch(
      fetchCars({
        ...params,
        limit: 12,
      })
    );
  }, [dispatch, cars.length, searchParams, setSearchParams]);

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
