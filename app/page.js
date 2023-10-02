"use client";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "./context/theme";
import styles from "./page.module.css";
import Social from "./components/social/page";
import TextSlider from "./components/textSlider/page";

export default function Home() {
  const { isLightTheme } = useThemeContext();
  const [showButton, setShowButton] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    // Fonction de gestionnaire de scroll
    const handleScroll = () => {
      // position actuelle de défilement
      const scrollPosition = window.scrollY;

      // hauteur à partir de laquelle vous souhaitez afficher le bouton
      const scrollThreshold = 1;

      // Vérifiez si la position de défilement a dépassé le seuil
      if (scrollPosition > scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Écoutez l'événement de défilement lorsque le composant est monté
    window.addEventListener("scroll", handleScroll);

    // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    setButtonClicked(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Réinitialisez le bouton cliqué après un court délai
    setTimeout(() => {
      setButtonClicked(false);
    }, 1000);
  };

  return (
    <main className={`${styles.main} ${isLightTheme ? "dark" : "light"}`}>
      <Social />
      <section className={`${styles.section} ${styles.head}`} id='head'>
        {/* Faire un compenent !!! */}
        <div className={styles.head__info}>
          <img src='/profil_002.jpg' alt='' className={styles.head__img}></img>
          <h1 className={styles.head__title}>
            Salut, je suis <TextSlider />
          </h1>
        </div>
      </section>

      <section className={styles.section} id='about'>
        <h2>About Me</h2>
      </section>

      <section className={styles.section} id=''>
        <h2>Competances</h2>
      </section>

      <section className={styles.section}>
        <h2>Portfolio</h2>
      </section>

      <section className={styles.section}>
        <h2>Services</h2>
      </section>

      {/* Bouton pour remonter en haut */}
      {showButton && (
        <button
          className={`${styles.scrollToTopButton} ${
            buttonClicked ? styles.clickedButton : ""
          }`}
          onClick={() => {
            scrollToTop();
          }}>
          ^
        </button>
      )}
    </main>
  );
}
