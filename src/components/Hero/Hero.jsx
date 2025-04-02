import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link to="/cars" className={styles.link}>
        View Catalog
      </Link>
    </section>
  );
}
