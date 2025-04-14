import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations/fetchCarById";
import styles from "./SingleCar.module.css";
import { useParams } from "react-router";
import { selectLoading, selectSingleCar } from "../../redux/cars/selectors";
import { extractCity, extractCountry } from "../../utils/getCityAndCountry";
import icons from "../../assets/sprite.svg";
import { formatNumber } from "../../utils/formatNumber";
import BookingForm from "../BookingForm/BookingForm";
import Loader from "../Loader/Loader";
import { clearSingleCar } from "../../redux/cars/slice";

export default function SingleCar() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector(selectSingleCar);
  const city = extractCity(car?.address);
  const country = extractCountry(car?.address);
  const carId = car?.id.slice(0, 7);
  const loading = useSelector(selectLoading);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchCarById(id));
    return () => {
      dispatch(clearSingleCar(id));
    };
  }, [dispatch, id]);

  if (!car && loading) {
    return <Loader />;
  }

  if (!car && !loading) {
    return <p className={styles.noData}>No car data available.</p>;
  }

  return (
    <div className={styles.cont}>
      <div className={styles.imgNform}>
        <div className={styles.imgCont}>
          {!imageLoaded && <div className={styles.imgPlaceholder}></div>}{" "}
          <img
            src={car?.img}
            alt={`${car?.brand} ${car?.model}`}
            className={`${styles.img} ${
              imageLoaded ? styles.visible : styles.hidden
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <BookingForm />
      </div>
      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <div className={styles.nameNid}>
            <p className={styles.name}>
              {car?.brand} {car?.model}, {car?.year}
            </p>
            <p className={styles.id}>Id: {carId}</p>
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
              {car?.rentalConditions?.map((condition, index) => (
                <li key={index} className={styles.condition}>
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
                Year: {car?.year}
              </li>
              <li className={styles.specification}>
                <svg width={16} height={16}>
                  <use href={icons + "#icon-car"}></use>
                </svg>
                Type: {car?.type}
              </li>
              <li className={styles.specification}>
                <svg width={16} height={16}>
                  <use href={icons + "#icon-fuel"}></use>
                </svg>
                Fuel Consumption: {car?.fuelConsumption}
              </li>
              <li className={styles.specification}>
                <svg width={16} height={16}>
                  <use href={icons + "#icon-gear"}></use>
                </svg>
                Engine Size: {car?.engineSize}
              </li>
            </ul>
          </div>

          <div className={styles.accessories}>
            <p className={styles.accessTitle}>
              Accessories and functionalities:
            </p>
            <ul className={styles.accessList}>
              {car?.accessories?.map((access, index) => (
                <li key={index} className={styles.access}>
                  <svg width={16} height={16}>
                    <use href={icons + "#icon-check-circle"} />
                  </svg>
                  {access}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
