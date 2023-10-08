import React from "react";
import styles from "./CardCoding.module.css";

const CardCoding = ({ onClick, randomText }) => {
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
              onClick();
            }
          }}>
          <img
            src='/icones/rafraichir.svg'
            alt='icone rafraichir'
            className={`${styles.img}`}></img>
        </button>
      </div>

      <div className={`${styles.card__content}`}>{randomText}</div>
      <div className={`${styles.card__line}`}></div>
    </div>
  );
};

export default CardCoding;
