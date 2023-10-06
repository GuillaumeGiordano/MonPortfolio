/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
// CONTEXTE
import { useThemeContext } from "./context/theme";
// STYLE
import styles from "./page.module.css";
// COMPONENTS
import Social from "./components/social/page";
import TextSlider from "./components/textSlider/page";
import ScrollUp from "./components/scrollToTop/page";
import ScrollToDown from "./components/scrollToDown/page";
import BtnNormal from "./components/buttons/normal/page";
// import Tab from "./components/tab/page";
import ImageSlider from "./components/imageSlider/page";
import CardScore from "./components/cards/cardScore/CardScore";
// FUNCTION
import scrollToSection from "./util/scrollToSection";
import CardService from "./components/cards/CardService/page";

export default function Home() {
  const { isLightTheme } = useThemeContext();

  // Pour faire apparaitre le bouton du scrollUp
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
  }, []);

  // const tabs = [
  //   {
  //     label: "Tab 1",
  //     content: <p>Contenu du premier onglet.</p>,
  //   },
  //   {
  //     label: "Tab 2",
  //     content: <p>Contenu du deuxième onglet.</p>,
  //   },
  //   {
  //     label: "Tab 3",
  //     content: <p>Contenu du troisième onglet.</p>,
  //   },
  // ];

  const wordToTypeAndErase = ["Guillaume.", "Développeur.", "Entrepreneur."];

  // RANDOM TEXT FACT
  const texts = [
    'I am jedi, "May the force be with YOU !"',
    'Best vilain, "Why are you sOooOOoo serious :)"',
    "Texte 3",
    "Texte 4",
    "Texte 5",
    "Texte 6",
    "Texte 7",
    "Texte 8",
  ];

  const [randomText, setRandomText] = useState("");
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedText = texts[randomIndex];
    setRandomText(selectedText);
  };

  return (
    <main className={`${styles.main} ${isLightTheme ? "dark" : "light"}`}>
      {/* HEAD */}
      <section className={`${styles.section} ${styles.head}`} id='head' data-id='head'>
        <ScrollToDown />
        <Social />
        <div className={styles.head__info}>
          <img src='/profil_002.jpg' alt='' className={styles.head__img}></img>
          <div className={styles.head__details}>
            <h1 className={styles.head__title}>
              Salut, je suis
              <TextSlider wordToTypeAndErase={wordToTypeAndErase} />
            </h1>
            <p className={styles.head__presentation}>
              Je suis développeur web et j'aime ça !
            </p>
            <div className={styles.head__nav}>
              <BtnNormal
                libelle={"Mes Services"}
                onClick={() => scrollToSection("services")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className={`${styles.section} ${styles.about}`} id='about' data-id='about'>
        <h2 className={styles.section__titre}>About Me</h2>
        <div className={styles.about__ctn}>
          <div className={styles.about__body}>
            <div className={`${styles.body__elem} ${styles.elem1}`}>
              <h2>Un développeur web passionné !</h2>
              <p>
                Ma passion pour le développement web commence en 2003 et m'a demandé un
                changement radical de cursus afin de pouvoir pleinement l'exploiter. Dès
                lors, je mis tout en oeuvre pour percer dans cette voie, tout en prenant
                du plaisir sur les divers projets développés. En Mai 2009, je décide de
                devenir développeur web indépendant après plusieurs postes en tant que
                développeur web « full-stack » réussis, qui me conforteront dans cette
                idée afin de toucher un plus large panel de domaines d'activités, voir du
                pays et conquérir le monde !
              </p>
            </div>
            <div className={`${styles.body__elem} ${styles.elem2}`}>
              <ImageSlider wordToTypeAndErase={wordToTypeAndErase} />
            </div>
            <div className={`${styles.body__elem} ${styles.elem3}`}>
              <h2>Expérience en développement</h2>
              <p>
                Mon expérience acquise au fil des projets me permet de mieux comprendre
                les attentes d'un client et de répondre précisement au besoin demandé en
                fonction du domaine d'activité. Du site vitrine au projet plus complexe,
                je vous propose une expertise et un développement web qui correspond à vos
                attentes & à vos besoins.
              </p>
              <h2>Mieux me connaitre</h2>
              <BtnNormal
                libelle={"More ?"}
                onClick={() => {
                  handleClick();
                }}
              />
              {randomText && <p className={`${styles.elem3__p} }`}>{randomText}</p>}
            </div>
          </div>
          <div className={styles.about__footer}>
            <div className={styles.footer__elem}>
              <CardScore
                img={"./icones/code-daffichage.svg"}
                score={"10"}
                libelle={"Projects"}
              />
            </div>
            <div className={styles.footer__elem}>
              <CardScore
                img={"./icones/code-daffichage.svg"}
                score={"10"}
                libelle={"Expériences"}
              />
            </div>
            <div className={styles.footer__elem}>
              <CardScore
                img={"./icones/code-daffichage.svg"}
                score={"10"}
                libelle={"Diplômes"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className={`${styles.section} ${styles.services}`}
        id='services'
        data-id='services'>
        <h2>Ce que je sais faire.</h2>
        <div className={styles.services__ctn}>
          <CardService
            icone={"creation-de-sites-web.svg"}
            service={"Intégration Web"}
            slogan={
              "Transformons votre vision en réalité numérique. Ensemble, créons une expérience en ligne exceptionnelle."
            }
          />
          <CardService
            icone={"api.svg"}
            service={"Développeur Web"}
            slogan={
              "Transformez vos idées en réalité numérique avec un code de qualité et une expérience utilisateur exceptionnelle"
            }
          />
          <CardService
            icone={"css.svg"}
            service={"Optimisation "}
            slogan={
              "Transformez vos sites web en performances optimales avec notre expertise en optimisation et débogage. Faites briller votre présence en ligne."
            }
          />
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        className={`${styles.section} ${styles.services}`}
        id='portfolio'
        data-id='portfolio'>
        <h2>Portfolio</h2>
        <p>filtre + cards</p>
      </section>

      {/* AVIS */}
      <section className={`${styles.section} ${styles.avis}`} id='avis' data-id='avis'>
        <h2>Avis</h2>
        <p>mettre un carrouselle</p>
      </section>

      {/* CONTACT */}
      <section
        className={`${styles.section} ${styles.services}`}
        id='contact'
        data-id='contact'>
        <h2>Say hello !</h2>
        <p>une carte + formulaire de contact</p>
      </section>

      {/* Bouton pour remonter en haut */}
      {showButton && <ScrollUp />}
    </main>
  );
}
