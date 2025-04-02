import styles from "./Header.module.css";
import icons from "../../assets/sprite.svg";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <svg className={styles.icon} width={104} height={16}>
          <use href={icons + "#icon-logo"} />
        </svg>
      </a>
      <nav className={styles.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/cars"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          end
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
