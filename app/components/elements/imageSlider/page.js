"use client";

import { useState, useEffect } from "react";
// STYLE
import styles from "./ImgSlider.module.css";

export default function ImageSlider({ imageToDisplay }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgPath, setImgPath] = useState("");

  useEffect(() => {
    const imgInterval = setInterval(() => {
      const valueMaxArray = imageToDisplay.length;
      if (currentImageIndex && valueMaxArray >= 0) {
        setImgPath(imageToDisplay[currentImageIndex]);
        setCurrentImageIndex((currentImageIndex + 1) % valueMaxArray);
      }
    }, 3000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [currentImageIndex, imageToDisplay]);

  return (
    <div className={styles.ctn}>
      <image src={imgPath} alt='' className={styles.img}></image>
    </div>
  );
}
