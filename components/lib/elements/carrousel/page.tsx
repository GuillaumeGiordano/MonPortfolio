"use client";

import React, { useState, useEffect } from "react";
// STYLES
import styles from "./Carrousel.module.css";
// DATAS
import { dataServices } from "@data/dataServices";

const Carrousel = () => {
  // VARIABLES
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState([]);

  const numItems = dataServices.length;

  // Fonction pour avancer le carrousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numItems);
    console.log(currentIndex);
  };

  // Fonction pour reculer le carrousel
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numItems) % numItems);
    console.log(currentIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataServices && numItems > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % numItems);
        console.log(currentIndex);
      }
    }, 12000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, numItems]);

  useEffect(() => {
    if (dataServices) {
      setData(dataServices);
      setIsData(true);
    }
  }, [isData, data]);

  if (!isData) {
    console.log("Je ne trouve pas la data !");
    return null;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.slides}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : styles.inactive
            }`}>
            {/* Mettre notre component ICI */}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          prevSlide();
        }}
        className={styles.prevButton}>
        Précédent
      </button>
      <button
        onClick={() => {
          nextSlide();
        }}
        className={styles.nextButton}>
        Suivant
      </button>
    </div>
  );
};

export default Carrousel;
