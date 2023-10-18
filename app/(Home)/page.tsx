"use client";

import React, { useState, useEffect } from "react";
// STYLE
import styles from "./page.module.css";
// LIB
import Main from "@components/main/page";
// COMPONENTS
import LoginForm from "@components/elements/modal/page";
import Header from "@components/header/page";
import Footer from "@components/footer/page";
import SectionAbout from "@components/main/sectionAbout/page";
import SectionServices from "@components/main/sectionServices/page";
import SectionPortfolio from "@components/main/sectionPortfolio/page";
import SectionAvis from "@components/main/sectionAvis/page";
import SectionContact from "@components/main/sectionContact/page";
import SectionHead from "@components/main/sectionHead/page";
import ScrollUp from "@components/main/scrollUp/page";

// DATA
import { dataTextSlider } from "@data/dataTextSlider";

export default function Home() {
  // DISPLAY SCROLLBUTTON
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    // Fonction de gestionnaire de scroll
    const handleScroll = () => {
      // position actuelle de défilement
      const scrollPosition = window.scrollY;

      // hauteur à partir de laquelle afficher le bouton
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
  }, [showButton]);

  return (
    <Main>
      <>
        {/* HEAD */}
        <SectionHead
          sectionId={"head"}
          sectionImage={"/profil_002.jpg"}
          sectionSlogan={
            ' " J\'aime développer, et vous allez adorer le résultat ! " '
          }></SectionHead>

        {/* ABOUT */}
        <SectionAbout />

        {/* SERVICES */}
        <SectionServices />

        {/* PORTFOLIO */}
        <SectionPortfolio />

        {/* AVIS */}
        <SectionAvis />

        {/* CONTACT */}
        <SectionContact />

        {/* BUTTON SCROLL TO UP */}
        {showButton && <ScrollUp />}
      </>
    </Main>
  );
}
