import { useState, useEffect } from "react";
// STYLE
import styles from "./ImgSlider.module.css";

export default function ImageSlider({ wordToTypeAndErase }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [imgPath, setImgPath] = useState("/profil_001.jpg");

  useEffect(() => {
    const imgInterval = setInterval(() => {
      switch (currentTextIndex) {
        case 0:
          setImgPath("/profil_001.jpg");
          break;
        case 1:
          setImgPath("/profil_002.jpg");
          break;
        case 2:
          setImgPath("/profil_003.png");
          break;
        default:
          console.log("erreur img");
      }

      setCurrentTextIndex((currentTextIndex + 1) % wordToTypeAndErase.length);
    }, 3000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [currentTextIndex]);

  return (
    <div className={styles.ctn}>
      <img src={imgPath} alt='' className={styles.img}></img>
    </div>
  );
}
