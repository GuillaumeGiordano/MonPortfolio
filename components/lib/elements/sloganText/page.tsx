"use client";
import React from "react";
// STYLES
import styles from "./SloganText.module.css";

const SloganText = ({ slogan }) => {
  return <p className={styles.slogan}>{slogan}</p>;
};

export default SloganText;
