import React from "react";
import styles from "./CardService.module.css";

const CardService = ({ icone, service, slogan }) => {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.cardDetails}`}>
        <div className={`${styles.cardImg}`}>
          <img src={`/icones/${icone}`} alt='icone' className={`${styles.img}`}></img>
        </div>

        <h3 className={`${styles.textTitle}`}>{service}</h3>
        <p className={`${styles.textBody}`}>{slogan}</p>
        <h3 className={`${styles.textTitle}`}>Langages utilisés</h3>
        <div className={`${styles.cardFooter}`}>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
          <img src='' alt='Tag' className={`${styles.cardTag}`}></img>
        </div>
      </div>
      <button className={`${styles.cardButton}`}>Ask Me</button>
    </div>
  );
};

export default CardService;
