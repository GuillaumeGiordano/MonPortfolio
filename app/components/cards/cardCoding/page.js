"use client";

import React, { useState } from "react";
import styles from "./CardCoding.module.css";

const CardCoding = ({ facts }) => {
  const [randomText, setRandomText] = useState("Click pour en savoir plus");
  const [randomIndexText, setRandomIndexText] = useState(0);

  const handleRandomTextClick = () => {
    const valueMaxArray = facts.length;
    const randomIndex = Math.floor(Math.random() * valueMaxArray);

    if (randomIndexText === randomIndex) {
      return handleRandomTextClick();
    }

    setRandomText(facts[randomIndex]);
    setRandomIndexText(randomIndex);
  };

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.tools}`}>
          <div className={`${styles.circle}`}>
            <span className={`${styles.red} ${styles.box}`}></span>
          </div>

          <div className={`${styles.circle}`}>
            <span className={`${styles.yellow} ${styles.box}`}></span>
          </div>

          <div className={`${styles.circle}`}>
            <span className={`${styles.green} ${styles.box}`}></span>
          </div>
        </div>
        <button
          className={`${styles.button}`}
          onClick={() => {
            {
              handleRandomTextClick();
            }
          }}>
          <image
            src='/icones/rafraichir.svg'
            alt='icone'
            className={`${styles.img}`}></image>
        </button>
      </div>

      <div className={`${styles.card__content}`}>{randomText}</div>
      <div className={`${styles.card__line}`}></div>
    </div>
  );
};

export default CardCoding;
