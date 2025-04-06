import styles from "./CarCard.module.css";
import icons from "../../assets/sprite.svg";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";
import { extractCity, extractCountry } from "../../utils/getCityAndCountry";
import { useState } from "react";

export default function CarCard({ car }) {
  const city = extractCity(car?.address);
  const country = extractCountry(car?.address);
  const [isFav, setIsFav] = useState(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavs.includes(car.id);
  });

  const handleFav = () => {
    setIsFav((prev) => {
      const newFav = !prev;
      const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];

      const updatedFavs = newFav
        ? [...storedFavs, car.id]
        : storedFavs.filter((id) => id !== car.id);

      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      return newFav;
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgCont}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model} ${car.year}`}
          className={styles.photo}
        />
        <button type="button" className={styles.like} onClick={handleFav}>
          {isFav ? (
            <svg className={styles.icon} width={16} height={16}>
              <use href={icons + "#icon-fav"} />
            </svg>
          ) : (
            <svg className={styles.icon} width={16} height={16}>
              <use href={icons + "#icon-like"} />
            </svg>
          )}
        </button>
      </div>
      <div className={styles.nameNprice}>
        <p className={styles.name}>
          {car.brand}&nbsp;
          <span className={styles.model}>{car.model}, </span>
          {car.year}
        </p>
        <p className={styles.price}>${car.rentalPrice}</p>
      </div>
      <div className={styles.characteristics}>
        <div className={styles.firstLine}>
          <div className={styles.elem}>{city}</div>
          <div className={styles.elem}>{country}</div>
          <div className={styles.elem}>{car.rentalCompany}</div>
        </div>
        <div className={styles.secondLine}>
          <div className={styles.elem}>{car.type}</div>
          <div className={styles.elem}>
            {car.mileage ? formatNumber(car.mileage) : "N/A"} km
          </div>
        </div>
      </div>
      <Link to={`/catalog/${car.id}`} className={styles.readMore}>
        Read more
      </Link>
    </div>
  );
}
