import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations/fetchCars";
import { selectCarList, selectLoading } from "../../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";
import { useSearchParams } from "react-router-dom";
import { buildSearchParams } from "../../utils/buildParams";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarList);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFetched = useRef();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (cars.length > 0 || isFetched.current) return;
    isFetched.current = true;
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams(buildSearchParams(params));

    dispatch(
      fetchCars({
        ...params,
        limit: 12,
      })
    );
  }, [dispatch, searchParams, setSearchParams]);

  if (cars.length === 0 && !loading) {
    return <p className={styles.noCars}>No cars found.</p>;
  }

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
