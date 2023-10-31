"use client";

import React from "react";
// STYLES
import styles from "./ButtonRegular.module.css";
// UTILS
import scrollToSection from "@util/scrollToSection";

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
