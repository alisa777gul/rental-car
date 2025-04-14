import styles from "./Header.module.css";
import icons from "../../assets/sprite.svg";
import { NavLink, Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa6";

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
          <span className={styles.icon}>
            <IoHomeSharp size={24} />
          </span>
          <span className={styles.text}> Home</span>
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          end
        >
          <span className={styles.icon}>
            <FaCar size={24} />
          </span>
          <span className={styles.text}> Catalog</span>
        </NavLink>
      </nav>
    </header>
  );
}
