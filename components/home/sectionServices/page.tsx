"use client";

import React from "react";
import Image from "next/image";
// STYLES
import styles from "./SectionServices.module.css";
// LIB
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ArticleOneColum from "@components/lib/articles/articleOneColum/page";
import SloganText from "@components/lib/elements/sloganText/page";
// COMPONENTS
import ServiceCollapse from "@components/home/sectionServices/ServiceCollapse/page";
// DATA
import { dataCompetences } from "@data/dataCompetences";
import { dataServices } from "@data/dataServices";

const SectionServices = () => {
  return (
    <SectionRegular addClass={""} sectionTitle={"Mes Services"} sectionId={"services"}>
      <ArticleOneColum addClass={""}>
        <SloganText slogan={' " Si tu peux le rêver, je peux le coder. " '} />
      </ArticleOneColum>

      {dataServices &&
        dataServices.map((item, index) => (
          <ArticleOneColum key={index} addClass={""}>
            <ServiceCollapse key={index} data={item} />
          </ArticleOneColum>
        ))}

      <SloganText
        slogan={
          ' " Mes compétences en développement sont à toute épreuve, tout comme ma capacité à trouver le dernier cookie caché dans la cuisine. " '
        }
      />
      <ArticleOneColum addClass={`${styles.tags}`}>
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
