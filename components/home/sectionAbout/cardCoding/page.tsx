"use client";

import React, { useState } from "react";
import styles from "./CardCoding.module.css";
import Image from "next/image";

const CardCoding = ({ facts }) => {
  // VARIAVBLES
  const [randomText, setRandomText] = useState(
    "Cliquez sur le bouton pour en savoir plus"
  );
  const [randomIndexText, setRandomIndexText] = useState(0);
  // HANDLES METHODES
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
          <Image
            src='/icones/rafraichir.svg'
            alt='icone'
            className={`${styles.img}`}
            width={19}
            height={19}
          />
        </button>
      </div>

      <div className={`${styles.card__content}`}>{randomText}</div>
      <div className={`${styles.card__line}`}></div>
    </div>
  );
};

export default CardCoding;
