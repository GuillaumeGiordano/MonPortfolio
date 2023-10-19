"use client";

import React, { useEffect, useState } from "react";
import styles from "./CardService.module.css";
import Image from "next/image";

const CardService = ({ dataService }) => {
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    if (dataService) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [dataService]);

  // console.log(dataService);

  if (!isData) {
    console.log("ca ne marche pas CarService !");
    return null;
  }

  const { imagePath, slogan, content, langages } = dataService;

  return (
    <article className={`${styles.card}`}>
      <div className={`${styles.cardDetails}`}>
        <div>
          <div className={`${styles.cardImg}`}>
            <Image
              src={`/icones/${imagePath}`}
              alt='icone'
              className={`${styles.img}`}
              width={90}
              height={90}
            />
          </div>
          <h3 className={`${styles.slogan}`}>{slogan}</h3>
          {content.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
          {/* <div className={`${styles.competences}`}>{content}</div> */}
        </div>

        <div className={`${styles.ctn}`}>
          <h3 className={`${styles.textTitle}`}>Langages utilisés</h3>
          <div className={`${styles.cardFooter}`}>
            {langages.map((article, index) => (
              <Image
                key={index}
                src={`/icones/techno/${article}`}
                alt='Tag'
                className={`${styles.cardTag}`}
                width={20}
                height={20}
              />
            ))}
          </div>
        </div>
      </div>
      <button className={`${styles.cardButton}`}>Ask Me</button>)
    </article>
  );
};

export default CardService;
