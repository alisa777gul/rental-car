import React from "react";
import icons from "../../assets/sprite.svg";
import styles from "./ArrowSvg.module.css";
import clsx from "clsx";

const ArrowSvg = ({ isOpen }) => {
  return (
    <svg
      width={16}
      height={16}
      className={clsx(styles.icon, isOpen && styles.rotated)}
    >
      <use href={icons + "#icon-arrow"} />
    </svg>
  );
};

export default ArrowSvg;
