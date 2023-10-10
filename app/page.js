/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
// STYLE
import styles from "./page.module.css";
// CONTEXTE
import { useThemeContext } from "./context/theme";
import { useLoginModalContext } from "./context/loginForm";
// COMPONENTS
import Footer from "./components/footer/page";
import Header from "./components/header/page";
import ScrollUp from "./components/buttons/scrollToTop/page";
import LoginForm from "./components/elements/modal/page";
import SectionRegular from "./components/sections/sectionRegular/page";
import SectionHead from "./components/sections/sectionHead/page";
import ImageSlider from "./components/elements/imageSlider/page";
import CardCoding from "./components/cards/cardCoding/page";
import CardScore from "./components/cards/cardScore/CardScore";
import CardService from "./components/cards/CardService/page";
import SloganText from "./components/elements/sloganText/page";

export default function Home() {
  const { isLightTheme } = useThemeContext();
  const { isOpen } = useLoginModalContext();

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
    '0 I am jedi, "May the force be with YOU !"',
    '1 Best vilain, "Why are you sOooOOoo serious :)"',
    "2 Texte 3",
    "3 Texte 4",
    "4 Texte 5",
    "5 Texte 6",
    "6 Texte 7",
    "7 Texte 8",
  ];
  // DATA = RANDOM IMAGES
  const imageToDisplay = ["/profil_001.jpg", "/profil_002.jpg", "/profil_003.png"];

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      <main className={`${styles.main}`}>
        {/* HEAD */}
        <SectionHead
          sectionId={"head"}
          sectionImage={"/profil_002.jpg"}
          sectionSlogan={" J'aime développer, et vous allez adorer le résultat ! "}
          wordToTypeAndErase={wordToTypeAndErase}></SectionHead>

        {/* ABOUT */}
        <SectionRegular sectionTitle={"A Propos de moi"} sectionId={"about"}>
          <div className={styles.about__body}>
            {/* ELEM 1 : PRESENTATION*/}
            <div className={`${styles.body__elem} ${styles.elem1}`}>
              <h3>Un développeur web passionné !</h3>
              <p>
                Ma reconversion professionnelle en tant que Développeur Web découle de ma
                passion constante pour la technologie et mon désir d'apporter des
                solutions innovantes. Avec détermination, j'ai débuté mon apprentissage en
                commencant par les langages de bases tels que l'HTML, CSS, PHP et
                JavaScript. J'ai également eu l'opportunité, dans ma formation, de me
                familiariser avec des frameworks tel que React. Mon expérience antérieure
                m'a doté d'une approche analytique et méticuleuse, des compétences qui
                s'avèrent précieuses dans la résolution de problèmes techniques et
                l'optimisation des performances.
              </p>

              <SloganText
                slogan={
                  "Les développeurs ne sont pas des créateurs de bugs, ce sont des chercheurs de solutions."
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
        {/* <SectionRegular sectionTitle={"Mes Services"} sectionId={"services"}>
          <SloganText slogan={"Si tu peux le rêver, je peux le coder"} />
          <div className={styles.services__ctn}>
            <CardService
              icone={"css.svg"}
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
        </SectionRegular> */}

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
      <Footer />
    </body>
  );
}
