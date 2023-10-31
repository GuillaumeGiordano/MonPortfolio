"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// STYLE
import styles from "./ImgSlider.module.css";

export default function ImageSlider({ imageToDisplay }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgPath, setImgPath] = useState("/profil_001.png");
  const [isImageToDisplay, setIsImageToDisplay] = useState(false);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      const valueMaxArray = imageToDisplay.length;

      if (imageToDisplay && valueMaxArray > 0) {
        setIsImageToDisplay(true);
        setImgPath(imageToDisplay[currentImageIndex]);
        setCurrentImageIndex((currentImageIndex + 1) % valueMaxArray);
      } else {
        setImgPath("profil_001.png");
      }
    }, 3000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [currentImageIndex, imageToDisplay]);

  return (
    <>
      {isImageToDisplay && (
        <Image
          src={imgPath}
          alt='photos de profil'
          className={styles.img}
          width={290}
          height={290}
        />
      )}
    </>
  );
}
