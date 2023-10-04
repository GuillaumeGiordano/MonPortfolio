import React from "react";
import styles from "./btnNormal.module.css";

const BtnNormal = ({ libelle, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {libelle}
    </button>
  );
};

export default BtnNormal;
