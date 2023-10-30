/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import axios from "axios";

// STYLE
import styles from "./SectionAbout.module.css";
// COMPONENTS
import SloganText from "@components/lib/elements/sloganText/page";
import ImageSlider from "@components/home/sectionAbout/imageSlider/page";
import CardCoding from "@components/home/sectionAbout/cardCoding/page";
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ArticleTreeColums from "@components/lib/articles/articleTreeColums/page";
import ArticleOneColum from "@components/lib/articles/articleOneColum/page";
import CardScore from "@components/home/sectionAbout/cardScore/page";

// DATA
import { dataRandomText } from "@data/dataRandomText";
import { dataScores } from "@data/dataScore";
import { dataImageProfil } from "@data/dataImageProfil";

const SectionAbout = () => {
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
    <SectionRegular className={""} sectionTitle={"A Propos de moi"} sectionId={"about"}>
      <ArticleTreeColums
        articleOne={aboutItem1}
        articleTwo={aboutItem2}
        articleTree={aboutItem3}
        className={""}
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
  );
};

export default SectionAbout;
