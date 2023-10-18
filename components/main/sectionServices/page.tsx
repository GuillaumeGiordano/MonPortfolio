"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// STYLE
import styles from "./SectionServices.module.css";
// COMPONENTS
import SectionRegular from "@components/sections/sectionRegular/page";
import ArticleOneColum from "@components/articles/articleOneColum/page";
import SloganText from "@components/elements/sloganText/page";
import ServiceCollapse from "@components/elements/ServiceCollapse/page";
// DATA
import { dataCompetences } from "@data/dataCompetences";
import { dataServices } from "@data/dataServices";

const SectionServices = () => {
  return (
    <SectionRegular sectionTitle={"Mes Services"} sectionId={"services"}>
      <ArticleOneColum className={""}>
        <SloganText slogan={' " Si tu peux le rêver, je peux le coder. " '} />
      </ArticleOneColum>

      {dataServices &&
        dataServices.map((item, index) => (
          <ArticleOneColum key={index} className={""}>
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
  );
};

export default SectionServices;
