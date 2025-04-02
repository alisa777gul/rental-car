import styles from "./Header.module.css";
import icons from "../../assets/sprite.svg";

export default function Header() {
  return (
    <header>
      <a className={styles.logo}>
        <svg className={styles.icon} width={104} height={16}>
          <use href={icons + "#icon-logo"} />
        </svg>
      </a>
      <p className={styles.text}>dffffffff</p>
    </header>
  );
}
