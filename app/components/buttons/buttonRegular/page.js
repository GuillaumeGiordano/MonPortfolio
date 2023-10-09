import React from "react";
import styles from "./ButtonRegular.module.css";
import scrollToSection from "@/app/util/scrollToSection";

const ButtonRegular = ({ libelle, goToSectionID }) => {
  return (
    <button
      className={styles.btn}
      onClick={() => {
        scrollToSection(goToSectionID);
      }}>
      {libelle}
    </button>
  );
};

export default ButtonRegular;
