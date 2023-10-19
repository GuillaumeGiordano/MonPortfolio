"use client";

import Image from "next/image";
// STYLES
import styles from "./SectionHead.module.css";
import "./add.css";

// COMPONENTS
import ScrollToDown from "@components/lib/buttons/scrollToDown/page";
import Social from "@components/lib/buttons/buttonSocial/page";
import TypingAndErasing from "@components/lib/elements/TypingAndErasing/page";
import BtnNormal from "@components/lib/buttons/buttonRegular/page";
import SectionRegular from "@components/lib/sections/sectionRegular/page";

const SectionHead = ({ sectionId, sectionImage, sectionSlogan }) => {
  return (
    <SectionRegular sectionId={sectionId} sectionTitle={""} className={"head"}>
      <ScrollToDown />
      <Social />
      <Image
        src={sectionImage}
        alt='Image de profil'
        className={styles.SectionImage}
        width={450}
        height={450}
      />

      <div className={styles.presentation}>
        <div className={styles.ctn_title}>
          <h1 className={styles.title}>
            Salut, je suis <TypingAndErasing />
          </h1>
        </div>
        <p className={styles.slogan}>{sectionSlogan}</p>
        <div className={styles.nav}>
          <BtnNormal libelle={"Mes Services"} goToSectionID={"services"} />
          <BtnNormal libelle={"Me Contacter"} goToSectionID={"contact"} />
        </div>
      </div>
    </SectionRegular>
  );
};

export default SectionHead;
