"use client";

import React from "react";
import styles from "./CardScore.module.css";
import Image from "next/image";
const CardScore = ({ img, score, libelle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.bg}>
        <Image
          src={img}
          alt='icone'
          className={styles.card__img}
          width={42}
          height={42}
        />

        <div className={styles.card__info}>
          <div className={styles.card__score}>{score}</div>
          <div className={styles.card__libelle}>{libelle}</div>
        </div>
      </div>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
    </div>
  );
};

export default CardScore;
