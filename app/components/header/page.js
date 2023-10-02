"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import { useThemeContext } from "@/app/context/theme";
import ScrollProgressBar from "../scrollProgressBar/page";

const Header = () => {
  const { isLightTheme } = useThemeContext();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Fonction de gestionnaire de scroll
    const handleScroll = () => {
      // Obtenez la position actuelle de défilement
      const scrollPosition = window.scrollY;

      // Définissez la hauteur à partir de laquelle vous souhaitez modifier le background
      const scrollThreshold = 1; // Par exemple, changez cette valeur selon vos besoins

      // Vérifiez si la position de défilement a dépassé le seuil
      if (scrollPosition > scrollThreshold) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Écoutez l'événement de défilement lorsque le composant est monté
    window.addEventListener("scroll", handleScroll);

    // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolling ? styles.scrolledBackground : ""} ${
          isLightTheme ? styles.header__dark : styles.header__light
        }`}
        id='header'>
        <ScrollProgressBar />

        <div className={styles.logo}>
          <img src='/G2WebApplication.svg' className={styles.logo__img} alt='logo'></img>
          <span
            className={`${styles.logo__title} ${
              isLightTheme ? styles.logo__title__light : styles.logo__title__dark
            }`}>
            {" "}
            Guillaume Giordano
          </span>
        </div>

        <nav className={styles.nav}>
          <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href='/'>
            Home
          </Link>

          <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href=''>
            Portfolio
          </Link>

          <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href='/contact'>
            contact
          </Link>

          <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href=''>
            Connexion
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
