/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
// COMPONENTS
import SectionHead from "../sections/sectionHead/page";
import SectionRegular from "../sections/sectionRegular/page";
import SloganText from "../elements/sloganText/page";
import ImageSlider from "../elements/imageSlider/page";
import CardCoding from "../cards/cardCoding/page";
import CardScore from "../cards/cardScore/CardScore";
import CardService from "../cards/CardService/page";
import ScrollUp from "../buttons/scrollToTop/page";
import Collapsible from "../elements/Collapsible/page";
import { dataService } from "@/app/data/dataServices";

const Main = () => {
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

  // DATA = TEXTSLIDER
  const wordToTypeAndErase = ["Guillaume.", "Développeur.", "Entrepreneur."];

  // DATA = SERVICE TECHNOS
  const serviceOne = [
    "html.png",
    "css.png",
    "js.png",
    "ts.png",
    "react.png",
    "responsive.png",
    "sass.png",
    "bootstrap.png",
  ];
  const serviceTwo = [];
  const serviceTree = ["php.png", "node.png", "express.png", "mongoDB.png", "mysql.png"];

  // DATA = RANDOM TEXT FACT
  const facts = [
    'I am jedi, "May the force be with YOU !"',
    'Best vilain, "Why are you sOooOOoo serious :)"',
    'J\'ai surnommé mon clavier "QWERTY le Clavier Magique" et je lui parle quand je suis bloqué sur un bug.',
    "Je suis un grand mangeur de pizza",
    "Mes sport favoris sont la boxe, le foot et le VTT",
    "5 Texte 6",
    "6 Texte 7",
    "7 Texte 8",
  ];
  // DATA = RANDOM IMAGES
  const imageToDisplay = ["/profil_001.jpg", "/profil_002.jpg", "/profil_003.png"];

  console.log(dataService);

  return (
    <main className={`${styles.main}`}>
      {/* HEAD */}
      <SectionHead
        sectionId={"head"}
        sectionImage={"/profil_002.jpg"}
        sectionSlogan={' " J\'aime développer, et vous allez adorer le résultat ! " '}
        wordToTypeAndErase={wordToTypeAndErase}></SectionHead>

      {/* ABOUT */}
      <SectionRegular sectionTitle={"A Propos de moi"} sectionId={"about"}>
        <div className={styles.about__body}>
          {/* ELEM 1 : PRESENTATION*/}
          <div className={`${styles.body__elem} ${styles.elem1}`}>
            <h3>Un développeur web passionné !</h3>
            <p>
              Ma reconversion professionnelle en tant que Développeur Web découle de ma
              passion constante pour la technologie et mon désir d'apporter des solutions
              innovantes. Avec détermination, j'ai débuté mon apprentissage en commencant
              par les langages de bases tels que l'HTML, CSS, PHP et JavaScript. J'ai
              également eu l'opportunité, dans ma formation, de me familiariser avec des
              frameworks tel que React. Mon expérience antérieure m'a doté d'une approche
              analytique et méticuleuse, des compétences qui s'avèrent précieuses dans la
              résolution de problèmes techniques et l'optimisation des performances.
            </p>

            <SloganText
              slogan={
                ' " Les développeurs ne sont pas des créateurs de bugs, ce sont des chercheurs de solutions. " '
              }
            />
          </div>
          {/* ELEM 2 : IMAGE */}
          <div className={`${styles.body__elem} ${styles.elem2}`}>
            <ImageSlider imageToDisplay={imageToDisplay} />
          </div>
          {/* ELEM 3 : DIVERS */}
          <div className={`${styles.body__elem} ${styles.elem3}`}>
            <h3>Expérience en développement</h3>
            <p>
              Mon expérience acquise, en tant que chef de projet, me permet de mieux
              comprendre les attentes d'un client et de répondre précisement au besoin
              demandé en fonction du domaine d'activité. Du site vitrine au projet plus
              complexe, je vous propose une expertise et un développement web qui
              correspond à vos attentes et à vos besoins.
            </p>
            <h3>Mieux me connaitre</h3>
            <CardCoding facts={facts} />
          </div>
        </div>
        <div className={styles.about__footer}>
          <CardScore
            img={"./icones/code-daffichage.svg"}
            score={"10"}
            libelle={"Projects"}
          />

          <CardScore
            img={"./icones/code-daffichage.svg"}
            score={"10"}
            libelle={"Expériences"}
          />

          <CardScore
            img={"./icones/code-daffichage.svg"}
            score={"10"}
            libelle={"Diplômes"}
          />

          <CardScore
            img={"./icones/code-daffichage.svg"}
            score={"10"}
            libelle={"Diplômes"}
          />
        </div>
      </SectionRegular>

      {/* SERVICES */}
      <SectionRegular sectionTitle={"Mes Services"} sectionId={"services"}>
        <SloganText slogan={' " Si tu peux le rêver, je peux le coder. " '} />
        {dataService &&
          dataService.map((item, index) => <Collapsible key={index} data={item} />)}
      </SectionRegular>

      {/* PORTFOLIO */}
      {/* <SectionRegular sectionTitle={"Mon Portfolio"} sectionId={"portfolio"}>
      <div>salut je suis un childreen</div>
    </SectionRegular> */}

      {/* AVIS */}
      {/* <SectionRegular sectionTitle={"Les Avis"} sectionId={"avis"}>
      <div>salut je suis un childreen</div>
    </SectionRegular> */}

      {/* CONTACT */}
      {/* <SectionRegular sectionTitle={"Me Contacter"} sectionId={"contact"}>
      <div>salut je suis un childreen</div>
    </SectionRegular> */}

      {/* Bouton pour remonter en haut */}
      {showButton && <ScrollUp />}
    </main>
  );
};

export default Main;
