"use client";

import { useState, useEffect } from "react";
// STYLE
import styles from "./ImgSlider.module.css";

export default function ImageSlider({ imageToDisplay }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgPath, setImgPath] = useState(imageToDisplay[currentImageIndex]);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      const valueMaxArray = imageToDisplay.length;

      setImgPath(imageToDisplay[currentImageIndex]);
      setCurrentImageIndex((currentImageIndex + 1) % valueMaxArray);
    }, 3000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [currentImageIndex]);

  return (
    <div className={styles.ctn}>
      <img src={imgPath} alt='' className={styles.img}></img>
    </div>
  );
}
