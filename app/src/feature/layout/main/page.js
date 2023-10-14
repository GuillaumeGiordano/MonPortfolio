/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

// STYLE
import styles from "./Main.module.css";
// COMPONENTS
import SectionHead from "../../../../components/sections/sectionHead/page";
import SectionRegular from "../../../../components/sections/sectionRegular/page";
import SloganText from "../../../../components/elements/sloganText/page";
import ImageSlider from "../../../../components/elements/imageSlider/page";
import CardCoding from "../../../../components/cards/cardCoding/page";
import CardScore from "../../../../components/cards/cardScore/CardScore";
import ScrollUp from "../../../../components/buttons/scrollUp/page";
import ArticleOneColum from "../../../../components/library/articles/articleOneColum/page";
import ArticleTreeColums from "../../../../components/library/articles/articleTreeColums/page";
import ServiceCollapse from "../../../../components/elements/ServiceCollapse/page";
// DATA
import { dataService } from "@/app/src/data/dataServices";
import { dataScores } from "@/app/src/data/dataScore";
import { dataCompetences } from "@/app/src/data/dataCompetences";
import { dataTextSlider } from "@/app/src/data/dataTextSlider";
import { dataRandomText } from "@/app/src/data/dataRandomText";
import { dataImageProfil } from "@/app/src/data/dataImageProfil";
import Link from "next/link";
import CardPortfolio from "@/app/components/cards/cardPortfolio/page";

const Main = ({ data }) => {
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

  // FETCH
  const [dataLangage, setDataLangage] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = "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";

    const fetchData = async (item) => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/GuillaumeGiordano/${item.name}/languages`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const responseCommit = await axios.get(
          `https://api.github.com/repos/GuillaumeGiordano/${item.name}/commits`,
          // `https://api.github.com/repos/GuillaumeGiordano/${item.name}/stats/punch_card`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200 && responseCommit.status === 200) {
          // console.log(item);
          const data = response.data;
          const dataCommit = responseCommit.data;
          const myProject = {
            id: item.id,
            libelle: item.name,
            description: item.description,
            url: item.html_url,
            languages: data,
            nbCommit: dataCommit,
          };

          return myProject;
        } else {
          console.log("Erreur lors de la récupération des langages");
          return [];
        }
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    // Utilisez Promise.all pour attendre que toutes les requêtes se terminent
    Promise.all(data.map((item) => fetchData(item))).then((results) => {
      // Filtrer les résultats non nuls (en cas d'erreur)
      const validResults = results.filter((result) => result !== null);

      // Calculez la somme des valeurs de langages pour chaque projet
      const sums = validResults.map((result) => {
        const languages = result.languages;
        const sum = Object.values(languages).reduce((total, value) => total + value, 0);
        return {
          id: result.id,
          libelle: result.libelle,
          description: result.description,
          url: result.url,
          languages: languages,
          nbCommit: result.nbCommit.length,
          totalLigneLanguages: sum,
        };
      });

      // Mettez à jour l'état avec les valeurs cumulées
      // setDataLangage(validResults);
      setDataLangage(sums);

      setLoading(false);
    });
  }, [data]);

  console.log(dataLangage);
  console.log(dataLangage.length);

  // JE VERIFIE INPORT DES DATAS (NORMALEMENT JE DOIS FETCH !!!!!!!)
  if (
    !dataCompetences ||
    !dataScores ||
    !dataService ||
    !dataTextSlider ||
    !dataRandomText ||
    !dataImageProfil
  ) {
    return null;
  }

  // ABOUT
  const aboutItem1 = (
    <div className={`${styles.aboutArticle}`}>
      <h3 className={`${styles.titre}`}>Un développeur web passionné !</h3>
      <p className={`${styles.text}`}>
        Ma reconversion professionnelle en tant que Développeur Web découle de ma passion
        constante pour la technologie et mon désir d'apporter des solutions innovantes.
        Avec détermination, j'ai débuté mon apprentissage en commencant par les langages
        de bases tels que l'HTML, CSS, PHP et JavaScript. J'ai également eu l'opportunité,
        dans ma formation, de me familiariser avec des frameworks tel que React. Mon
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
      <h3 className={`${styles.titre}`}>Expérience en développement</h3>
      <p className={`${styles.text}`}>
        Mon expérience acquise, en tant que chef de projet, me permet de mieux comprendre
        les attentes d'un client et de répondre précisement au besoin demandé en fonction
        du domaine d'activité. Du site vitrine au projet plus complexe, je vous propose
        une expertise et un développement web qui correspond à vos attentes et à vos
        besoins.
      </p>
      <h3 className={`${styles.titre}`}>Mieux me connaitre</h3>
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
        wordToTypeAndErase={dataTextSlider}></SectionHead>

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

        {dataService &&
          dataService.map((item, index) => (
            <ArticleOneColum key={index}>
              <ServiceCollapse key={index} data={item} />
            </ArticleOneColum>
          ))}

        <h3 className={`${styles.titre}`}>Mes compétences</h3>
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
          {dataLangage &&
            dataLangage.map((item) => <CardPortfolio key={item.id} item={item} />)}
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
