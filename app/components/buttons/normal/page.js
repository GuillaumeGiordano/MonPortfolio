import React from "react";
import styles from "./Btnnormal.module.css";

const BtnNormal = ({ libelle, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {libelle}
    </button>
  );
};

export default BtnNormal;
