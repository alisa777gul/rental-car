import styles from "./CarCard.module.css";
import icons from "../../assets/sprite.svg";
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", { useGrouping: true })
      .format(number)
      .replace(/,/g, " ");
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgCont}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model} ${car.year}`}
          className={styles.photo}
        />
        <button type="button" className={styles.like}>
          <svg className={styles.icon} width={16} height={16}>
            <use href={icons + "#icon-like"} />
          </svg>
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
          <div className={styles.elem}>Kiev</div>
          <div className={styles.elem}>Ukraine</div>
          <div className={styles.elem}>{car.rentalCompany}</div>
        </div>
        <div className={styles.secondLine}>
          <div className={styles.elem}>{car.type}</div>
          <div className={styles.elem}>
            {car.mileage ? formatNumber(car.mileage) : "N/A"} km
          </div>
        </div>
      </div>
      <Link className={styles.readMore}>Read more</Link>
    </div>
  );
}
