import React, { useEffect, useState } from "react";
import styles from "./CardService.module.css";

const CardService = ({ icone, slogan, competences, dataTechnos }) => {
  const [isDataTechnos, setIsDataTechnos] = useState(true);
  useEffect(() => {
    const size = dataTechnos.length;

    if (size === 0) {
      setIsDataTechnos(false);
    } else {
      setIsDataTechnos(true);
    }
  }, []);

  return (
    <article className={`${styles.card}`}>
      <div className={`${styles.cardDetails}`}>
        <div>
          <div className={`${styles.cardImg}`}>
            <img src={`/icones/${icone}`} alt='icone' className={`${styles.img}`}></img>
          </div>
          <h3 className={`${styles.slogan}`}>{slogan}</h3>
          <div className={`${styles.competences}`}>{competences}</div>
        </div>

        {isDataTechnos && (
          <div className={`${styles.ctn}`}>
            <h3 className={`${styles.textTitle}`}>Langages utilisés</h3>
            <div className={`${styles.cardFooter}`}>
              {dataTechnos.map((article, index) => (
                <img
                  key={index}
                  src={`/icones/techno/${article}`}
                  alt='Tag'
                  className={`${styles.cardTag}`}></img>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className={`${styles.cardButton}`}>Ask Me</button>
    </article>
  );
};

export default CardService;
