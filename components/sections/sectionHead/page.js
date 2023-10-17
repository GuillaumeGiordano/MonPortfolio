"use client";

import React from "react";
import Image from "next/image";
// STYLES
import styles from "./SectionHead.module.css";
// COMPONENTS
import ScrollToDown from "../../buttons/scrollToDown/page";
import BtnNormal from "../../buttons/buttonRegular/page";
import Social from "../../buttons/buttonSocial/page";
import TypingAndErasing from "../../elements/TypingAndErasing/page";

const SectionHead = ({ sectionId, sectionImage, sectionSlogan, wordToTypeAndErase }) => {
  return (
    <section className={`${styles.section}`} id={sectionId} data-id={sectionId}>
      <ScrollToDown />
      <Social />
      <div className={styles.sectionBody}>
        <Image
          src={sectionImage}
          alt='Image de profil'
          className={styles.SectionImage}
          width={450}
          height={450}
        />

        <div className={styles.presentation}>
          <h1 className={styles.title}>
            Salut, je suis
            <TypingAndErasing wordToTypeAndErase={wordToTypeAndErase} />
          </h1>
          <p className={styles.slogan}>{sectionSlogan}</p>
          <div className={styles.nav}>
            <BtnNormal libelle={"Mes Services"} goToSectionID={"services"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHead;
