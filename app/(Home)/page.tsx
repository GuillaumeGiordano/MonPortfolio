"use client";
import React, { useState, useEffect } from "react";

// LIB
import Main from "@components/lib/main/page";
// COMPONENTS
import LoginForm from "@components/home/modal/page";
import ButtonSwitchTheme from "@components/home/buttonSwitchTheme/page";
import SectionAbout from "@components/home/sectionAbout/page";
import SectionServices from "@components/home/sectionServices/page";
import SectionPortfolio from "@components/home/sectionPortfolio/page";
import SectionAvis from "@components/home/sectionAvis/page";
import SectionContact from "@components/home/sectionContact/page";
import SectionHead from "@components/home/sectionHead/page";
import ScrollUp from "@components/home/scrollUp/page";

export default function Home() {
  // VARIABLE
  const [showButton, setShowButton] = useState(false);

  // Scroll Up
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
    <Main addClass={""}>
      {/* HEAD */}
      <SectionHead
        sectionId={"head"}
        sectionImage={"/profil_002.png"}
        sectionSlogan={
          ' " J\'aime développer et vous allez adorer le résultat ! " '
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

      {/* SWITCH THEME */}
      <ButtonSwitchTheme />

      {/* MODAL */}
      <LoginForm />

      {/* BUTTON SCROLL TO UP */}
      {showButton && <ScrollUp />}
    </Main>
  );
}
