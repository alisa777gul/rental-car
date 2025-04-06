import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations/fetchCarById";
import styles from "./SingleCar.module.css";
import { useParams } from "react-router";
import { selectSingleCar } from "../../redux/cars/selectors";
import { extractCity, extractCountry } from "../../utils/getCityAndCountry";
import icons from "../../assets/sprite.svg";
import { formatNumber } from "../../utils/formatNumber";

export default function SingleCar() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector(selectSingleCar);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <p>No car data available.</p>;

  const city = extractCity(car?.address);
  const country = extractCountry(car?.address);

  return (
    <div className={styles.cont}>
      <div className={styles.imgNform}>
        <img
          src={car?.img}
          alt={`${car?.brand}+${car?.model}`}
          className={styles.img}
        />
        <form></form>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.nameNid}>
          <p className={styles.name}>
            {car?.brand} {car?.model}, {car?.year}
          </p>
          <p className={styles.id}>Id: {car?.id}</p>
        </div>

        <div className={styles.locationNmileage}>
          <p className={styles.location}>
            <svg width={16} height={16}>
              <use href={icons + "#icon-location"}></use>
            </svg>
            {city}, {country}
          </p>
          <p className={styles.mileage}>
            {car?.mileage ? formatNumber(car?.mileage) : "N/A"} km
          </p>
        </div>
        <p className={styles.price}>${car?.rentalPrice}</p>
        <p className={styles.description}>{car?.description}</p>
      </div>
      <div className={styles.secInfo}>
        <div className={styles.conditions}>
          <p className={styles.rentalTitle}>Rental Conditions: </p>
          <ul className={styles.condList}>
            {car.rentalConditions.map((condition, index) => (
              <li key={index}>
                <svg width={16} height={16}>
                  <use href={icons + "#icon-check-circle"}></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.specifications}>
          <p className={styles.specifTitle}>Car Specifications: </p>
          <ul className={styles.specifList}>
            <li className={styles.specification}>
              <svg width={16} height={16}>
                <use href={icons + "#icon-calendar"}></use>
              </svg>
              Year: {car.year}
            </li>
            <li className={styles.specification}>
              <svg width={16} height={16}>
                <use href={icons + "#icon-car"}></use>
              </svg>
              Type: {car.type}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
