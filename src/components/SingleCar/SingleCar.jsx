import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations/fetchCarById";
import styles from "./SingleCar.module.css";
import { useParams } from "react-router";
import { selectSingleCar } from "../../redux/cars/selectors";

export default function SingleCar() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector(selectSingleCar);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <p>No car data available.</p>;

  return (
    <div className={styles.cont}>
      <div className={styles.imgNform}>
        <img
          src={car.img}
          alt={`${car.brand}+${car.model}`}
          className={styles.img}
        />
        <form></form>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.nameNid}>
          <p className={styles.name}>
            {car.brand} {car.model}, {car.year}
          </p>
          <p className={styles.id}>Id: {car.id}</p>
        </div>
      </div>
    </div>
  );
}
