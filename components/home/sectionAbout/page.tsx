/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
// STYLE
import styles from "./SectionAbout.module.css";
// LIB
import SloganText from "@components/lib/elements/sloganText/page";
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ArticleTreeColums from "@components/lib/articles/articleTreeColums/page";
import ArticleOneColum from "@components/lib/articles/articleOneColum/page";
// COMPONENTS
import ImageSlider from "@components/home/sectionAbout/imageSlider/page";
import CardCoding from "@components/home/sectionAbout/cardCoding/page";
import CardScore from "@components/home/sectionAbout/cardScore/page";
// DATA
import { dataRandomText } from "@data/dataRandomText";
import { dataScores } from "@data/dataScore";
import { dataImageProfil } from "@data/dataImageProfil";
import Image from "next/image";
import Link from "next/link";

const SectionAbout = () => {
  const aboutItem1 = (
    <div className={`${styles.aboutArticle}`}>
      <h3 className={`${styles.titre}`}> Un développeur web passionné ! </h3>
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
      <h3 className={`${styles.titre}`}>
        <Image
          src={"/icones/telecharger-le-pdf.png"}
          alt='icone pdf'
          className={`${styles.cv__img}`}
          width={30}
          height={30}
          priority={true}
        />
        Mon CV
      </h3>
      <div className={`${styles.cv}`}>
        <p className={`${styles.cv__text}`}>Cliquer sur un drapeau.</p>
        <Link href={"/CV_GG_2023_Dev_v2.pdf"} target='_blank'>
          <Image
            src={"/icones/france.png"}
            alt='icone pdf'
            className={`${styles.cv__img}`}
            width={50}
            height={50}
            priority={true}
          />
        </Link>
        <Link href={"/CV_GG_2023_Dev_v2_EN.pdf"} target='_blank'>
          <Image
            src={"/icones/royaume-uni.png"}
            alt='icone pdf'
            className={`${styles.cv__img}`}
            width={50}
            height={50}
            priority={true}
          />
        </Link>
      </div>
    </div>
  );
  const aboutItem2 = (
    <>
      <ImageSlider imageToDisplay={dataImageProfil} />
    </>
  );
  const aboutItem3 = (
    <div className={`${styles.aboutArticle}`}>
      <h3 className={`${styles.titre}`}> Mon expérience en développement. </h3>
      <p className={`${styles.text}`}>
        Mon expérience acquise, en tant que chef de projet, me permet de mieux comprendre
        les attentes d'un client et de répondre précisement au besoin demandé en fonction
        du domaine d'activité. Du site vitrine au projet plus complexe, je vous propose
        une expertise et un développement web qui correspond à vos attentes et à vos
        besoins.
      </p>
      <h3 className={`${styles.titre}`}>Pour mieux me connaitre.</h3>
      <CardCoding facts={dataRandomText} />
    </div>
  );

  return (
    <SectionRegular addClass={""} sectionTitle={"A Propos de moi"} sectionId={"about"}>
      <SloganText
        slogan={
          ' " Les développeurs ne sont pas des créateurs de bugs, ce sont des chercheurs de solutions. " '
        }
      />
      <ArticleTreeColums
        articleOne={aboutItem1}
        articleTwo={aboutItem2}
        articleTree={aboutItem3}
        addClass={""}
      />
      <ArticleOneColum addClass={`${styles.score}`}>
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
    </SectionRegular>
  );
};

export default SectionAbout;
