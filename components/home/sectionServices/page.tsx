"use client";

import React from "react";
import Image from "next/image";

// STYLE
import styles from "./SectionServices.module.css";
// COMPONENTS
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ArticleOneColum from "@components/lib/articles/articleOneColum/page";
import SloganText from "@components/lib/elements/sloganText/page";
import ServiceCollapse from "@components/home/sectionServices/ServiceCollapse/page";
// DATA
import { dataCompetences } from "@data/dataCompetences";
import { dataServices } from "@data/dataServices";

const SectionServices = () => {
  return (
    <SectionRegular className={""} sectionTitle={"Mes Services"} sectionId={"services"}>
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
    </SectionRegular>
  );
};

export default SectionServices;
