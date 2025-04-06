import { BeatLoader } from "react-spinners";
import styles from "./Loader.module.css";
export default function Loader() {
  return (
    <div className={styles.loader}>
      <p>Loading...</p>
    </div>
  );
}
