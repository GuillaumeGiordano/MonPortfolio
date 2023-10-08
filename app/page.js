/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
// CONTEXTE
import { useThemeContext } from "./context/theme";
import { useLoginModalContext } from "./context/loginForm";

// STYLE
import styles from "./page.module.css";
// COMPONENTS
import Social from "./components/social/page";
import TextSlider from "./components/textSlider/page";
import ScrollUp from "./components/scrollToTop/page";
import ScrollToDown from "./components/scrollToDown/page";
import BtnNormal from "./components/buttons/btnNormal/page";
// import Tab from "./components/tab/page";
import ImageSlider from "./components/imageSlider/page";
import CardScore from "./components/cards/cardScore/CardScore";
import CardService from "./components/cards/CardService/page";
import CardCoding from "./components/cards/cardCoding/page";
import LoginForm from "./components/modal/page";
// FUNCTION
import scrollToSection from "./util/scrollToSection";
import Footer from "./components/footer/page";
import Header from "./components/header/page";

export default function Home() {
  const { isLightTheme } = useThemeContext();
  const { isOpen, toggleModal } = useLoginModalContext();

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

  // TEXTSLIDER
  const wordToTypeAndErase = ["Guillaume.", "Développeur.", "Entrepreneur."];

  // SERVICE 1 TECHNO
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

  // RANDOM TEXT FACT
  const texts = [
    '0 I am jedi, "May the force be with YOU !"',
    '1 Best vilain, "Why are you sOooOOoo serious :)"',
    "2 Texte 3",
    "3 Texte 4",
    "4 Texte 5",
    "5 Texte 6",
    "6 Texte 7",
    "7 Texte 8",
  ];
  const [randomText, setRandomText] = useState("Click pour en savoir plus");
  const [randomIndexText, setRandomIndexText] = useState(0);
  const randomTextClick = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    if (randomIndexText === randomIndex) {
      return randomTextClick();
    }
    const selectedText = texts[randomIndex];
    setRandomText(selectedText);
    setRandomIndexText(randomIndex);
  };

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm
        isOpen={isOpen}
        toggleModal={() => {
          toggleModal();
        }}
      />
      <main className={`${styles.main}`}>
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
                " J'aime développer, et vous allez adorer le résultat ! "
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
        <section
          className={`${styles.section} ${styles.about}`}
          id='about'
          data-id='about'>
          <h2 className={styles.section__titre}>About Me</h2>
          <div className={styles.about__ctn}>
            <div className={styles.about__body}>
              {/* ELEM 1 : PRESENTATION*/}
              <div className={`${styles.body__elem} ${styles.elem1}`}>
                <h3>Un développeur web passionné !</h3>
                <p>
                  Ma passion pour le développement web commence en 2003 et m'a demandé un
                  changement radical de cursus afin de pouvoir pleinement l'exploiter. Dès
                  lors, je mis tout en oeuvre pour percer dans cette voie, tout en prenant
                  du plaisir sur les divers projets développés. En Mai 2009, je décide de
                  devenir développeur web indépendant après plusieurs postes en tant que
                  développeur web « full-stack » réussis, qui me conforteront dans cette
                  idée afin de toucher un plus large panel de domaines d'activités, voir
                  du pays et conquérir le monde !
                </p>
                <p className={`${styles.section__citation} `}>
                  "Les développeurs ne sont pas des créateurs de bugs, ce sont des
                  chercheurs de solutions."{" "}
                </p>
              </div>
              {/* ELEM 2 : IMAGE */}
              <div className={`${styles.body__elem} ${styles.elem2}`}>
                <ImageSlider wordToTypeAndErase={wordToTypeAndErase} />
              </div>
              {/* ELEM 3 : DIVERS */}
              <div className={`${styles.body__elem} ${styles.elem3}`}>
                <h3>Expérience en développement</h3>
                <p>
                  Mon expérience acquise au fil des projets me permet de mieux comprendre
                  les attentes d'un client et de répondre précisement au besoin demandé en
                  fonction du domaine d'activité. Du site vitrine au projet plus complexe,
                  je vous propose une expertise et un développement web qui correspond à
                  vos attentes & à vos besoins.
                </p>
                <h3>Mieux me connaitre</h3>
                <CardCoding
                  onClick={() => {
                    randomTextClick();
                  }}
                  randomText={randomText}
                />
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
          </div>
        </section>

        {/* SERVICES */}
        <section
          className={`${styles.section} ${styles.services}`}
          id='services'
          data-id='services'>
          <h2 className={styles.section__titre}>Mes Compétence</h2>
          <p className={styles.section__citation}>
            " Si tu peux le rêver, je peux le coder "
          </p>
          <div className={styles.services__ctn}>
            <CardService
              icone={"css.svg"}
              // titre={"Création de Sites Web Modernes"}
              slogan={"Transformez vos idées en sites web captivants !"}
              competences={
                <ul className={`${styles.service__ul}`}>
                  <li className={`${styles.service__li}`}>
                    Conception Visuelle : Je rend votre site web incroyable et attrayant.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Interactivité : J'ajoute des éléments interactifs pour que les
                    visiteurs puissent cliquer et interagir avec votre site.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Adaptabilité : Votre site fonctionne bien sur tous les types
                    d'appareils, ordinateurs, tablettes et téléphones.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Optimisation des Performances : Je veille à ce que votre site se
                    charge rapidement, sans faire attendre les visiteurs.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Facilité de Navigation : J'organise votre site pour qu'il soit facile
                    à parcourir et à trouver ce que les utilisateurs recherchent.
                  </li>
                </ul>
              }
              dataTechnos={serviceOne}
            />
            <CardService
              icone={"creation-de-sites-web.svg"}
              // titre={"Développement d'Applications Web Rapides"}
              slogan={"Modernisez vos sites web en toute simplicité !"}
              competences={
                <ul className={`${styles.service__ul}`}>
                  <li className={`${styles.service__li}`}>
                    Analyse de Site Web : J'examine votre site web pour identifier les
                    problèmes et les améliorations possibles.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Migration de Plateformes : Si nécessaire, je déplaçe votre site vers
                    une nouvelle technologie pour le maintenir à jour.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Mise à Niveau de Versions : Je actualise les logiciels et
                    bibliothèques de votre site pour qu'il fonctionne avec les dernières
                    versions.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Sauvegarde et Récupération de Données : Je met en place des systèmes
                    de sauvegarde pour protéger vos données et assurer une récupération
                    rapide en cas de problème.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Sécurité et Mise à Niveau des Protocoles : Je renforçe la sécurité de
                    votre site avec des mesures de protection et des protocoles modernes
                    pour protéger vos données.
                  </li>
                </ul>
              }
              dataTechnos={serviceTwo}
            />
            <CardService
              icone={"api.svg"}
              // titre={"Création d'Applications Web Sécurisées et Robustes"}
              slogan={"Sécurité et robustesse au cœur de chaque application web."}
              competences={
                <ul className={`${styles.service__ul}`}>
                  <li className={`${styles.service__li}`}>
                    Serveurs et Bases de Données : Je met en place l'infrastructure
                    nécessaire pour faire fonctionner votre application et j'assure la
                    gestion de vos données.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Sécurité : Je protége votre application contre les pirates
                    informatiques et contrôle qui y a accès.
                  </li>
                  <li className={`${styles.service__li}`}>
                    API Fiables : je crée des "routes" pour que votre application
                    communique correctement entre ses différentes parties.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Sauvegarde des Données : Je met en place des systèmes de sauvegarde
                    pour éviter la perte de données précieuses.
                  </li>
                  <li className={`${styles.service__li}`}>
                    Maintenance et Support : Je suis là pour résoudre les problèmes et
                    assurer le bon fonctionnement continu de votre application.
                  </li>
                </ul>
              }
              dataTechnos={serviceTree}
            />
          </div>
        </section>

        {/* PORTFOLIO */}
        <section
          className={`${styles.section} ${styles.services}`}
          id='portfolio'
          data-id='portfolio'>
          <h2 className={styles.section__titre}>Portfolio</h2>
          <p>filtre + cards</p>
        </section>

        {/* AVIS */}
        <section className={`${styles.section} ${styles.avis}`} id='avis' data-id='avis'>
          <h2 className={styles.section__titre}>Avis</h2>
          <p>mettre un carrouselle</p>
        </section>

        {/* CONTACT */}
        <section
          className={`${styles.section} ${styles.services}`}
          id='contact'
          data-id='contact'>
          <h2 className={styles.section__titre}>Say hello !</h2>
          <p>une carte + formulaire de contact</p>
        </section>

        {/* Bouton pour remonter en haut */}
        {showButton && <ScrollUp />}
      </main>
      <Footer />
    </body>
  );
}
