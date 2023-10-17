/* eslint-disable react/no-unescaped-entities */
"use client";

require("dotenv").config();
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

// STYLE
import styles from "./Main.module.css";
// COMPONENTS
import SectionHead from "../sections/sectionHead/page";
import SectionRegular from "../sections/sectionRegular/page";
import SloganText from "../elements/sloganText/page";
import ImageSlider from "../elements/imageSlider/page";
import CardCoding from "../cards/cardCoding/page";
import CardScore from "../cards/cardScore/CardScore";
import ScrollUp from "../buttons/scrollUp/page";
import ArticleOneColum from "../articles/articleOneColum/page";
import ArticleTreeColums from "../articles/articleTreeColums/page";
import ServiceCollapse from "../elements/ServiceCollapse/page";
import CardPortfolio from "../cards/cardPortfolio/page";
// DATA
import { dataServices } from "../../data/dataServices";
import { dataScores } from "../../data/dataScore";
import { dataCompetences } from "../../data/dataCompetences";
import { dataTextSlider } from "../../data/dataTextSlider";
import { dataRandomText } from "../../data/dataRandomText";
import { dataImageProfil } from "../../data/dataImageProfil";
import { dataProjects } from "../../data/dataProjects";

const Main = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isDataProject, setIsDataProject] = useState(false);

  // FETCH
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/project/all");
      const data = await response.json();
      setAllProjects(data);
      setIsDataProject(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

  // ABOUT
  const aboutItem1 = (
    <div className={`${styles.aboutArticle}`}>
      <h3 className={`${styles.titre}`}> Un développeur web passionné! </h3>
      <p className={`${styles.text}`}>
        Ma reconversion professionnelle en tant que Développeur Web découle de ma passion
        constante pour la technologie et mon désir d'apporter des solutions innovantes.
        Avec détermination, j'ai débuté mon apprentissage en commencant par les langages
        de bases tels que l'HTML, CSS, PHP et JavaScript. J'ai également eu l'opportunité,
        dans ma formation, de me familiariser avec des frameworks tel que React.Mon
        expérience antérieure m'a doté d'une approche analytique et méticuleuse, des
        compétences qui s'avèrent précieuses dans la résolution de problèmes techniques et
        l'optimisation des performances.
      </p>

      <SloganText
        slogan={
          ' " Les développeurs ne sont pas des créateurs de bugs, ce sont des chercheurs de solutions. " '
        }
      />
    </div>
  );
  const aboutItem2 = (
    <>
      <ImageSlider imageToDisplay={dataImageProfil} />
    </>
  );
  const aboutItem3 = (
    <div className={`${styles.aboutArticle}`}>
      <h3 className={`${styles.titre}`}> Expérience en développement </h3>
      <p className={`${styles.text}`}>
        Mon expérience acquise, en tant que chef de projet, me permet de mieux comprendre
        les attentes d'un client et de répondre précisement au besoin demandé en fonction
        du domaine d'activité. Du site vitrine au projet plus complexe, je vous propose
        une expertise et un développement web qui correspond à vos attentes et à vos
        besoins.
      </p>
      <h3 className={`${styles.titre}`}> Mieux me connaitre </h3>
      <CardCoding facts={dataRandomText} />
    </div>
  );

  return (
    <main className={`${styles.main}`}>
      {/* HEAD */}
      <SectionHead
        sectionId={"head"}
        sectionImage={"/profil_002.jpg"}
        sectionSlogan={' " J\'aime développer, et vous allez adorer le résultat ! " '}
        wordToTypeAndErase={dataTextSlider}>
        {" "}
      </SectionHead>

      {/* ABOUT */}
      <SectionRegular sectionTitle={"A Propos de moi"} sectionId={"about"}>
        <ArticleTreeColums
          articleOne={aboutItem1}
          articleTwo={aboutItem2}
          articleTree={aboutItem3}
        />
        <ArticleOneColum className={`${styles.score}`}>
          {dataScores &&
            dataScores.map((item, index) => (
              <CardScore
                key={index}
                img={item.imagePath}
                score={item.score}
                libelle={item.libelle}
              />
            ))}
        </ArticleOneColum>
        {/* <Image
          className={`${styles.deco} ${styles.aboutDeco}`}
          src={"/background004.png"}
          alt='Decoration'
          width={500}
          height={500}
        /> */}
      </SectionRegular>

      {/* SERVICES */}
      <SectionRegular sectionTitle={"Mes Services"} sectionId={"services"}>
        <ArticleOneColum>
          <SloganText slogan={' " Si tu peux le rêver, je peux le coder. " '} />
        </ArticleOneColum>

        {dataServices &&
          dataServices.map((item, index) => (
            <ArticleOneColum key={index}>
              <ServiceCollapse key={index} data={item} />
            </ArticleOneColum>
          ))}

        <h3 className={`${styles.titre}`}> Mes compétences </h3>
        <ArticleOneColum className={`${styles.tags}`}>
          {dataCompetences &&
            dataCompetences.map((item, index) => (
              <div key={index} className={`${styles.card_tag}`}>
                <Image
                  key={index}
                  className={`${styles.tag}`}
                  src={item}
                  alt='tag techno'
                  width={70}
                  height={70}
                />
              </div>
            ))}
        </ArticleOneColum>

        {/* <Image
          className={`${styles.deco} ${styles.serviceDeco}`}
          src={"/background003.png"}
          alt='Decoration'
          width={500}
          height={500}
        /> */}
      </SectionRegular>

      {/* PORTFOLIO */}
      <SectionRegular sectionTitle={"Mon Portfolio"} sectionId={"portfolio"}>
        <ArticleOneColum className={`${styles.ctn_portfolio}`}>
          {!isDataProject ? (
            <p>Chargement </p>
          ) : allProjects.length > 0 ? (
            allProjects.map((item) => <CardPortfolio key={item._id} item={item} />)
          ) : (
            <p>Il n'y a pas de encore de projet enregistré</p>
          )}
        </ArticleOneColum>
      </SectionRegular>

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