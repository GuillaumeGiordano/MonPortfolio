"use client";

import React from "react";

// STYLE
import styles from "./SectionAvis.module.css";
// LIB
import SectionRegular from "@components/lib/sections/sectionRegular/page";
// DATAS
import { dataAvis } from "@data/dataAvis";

const SectionAvis = () => {
  return (
    <SectionRegular addClass={""} sectionTitle={"Les Avis"} sectionId={"avis"}>
      <div className={`${styles.testimonials}`}>
        {dataAvis.map((testimonial, index) => (
          <div key={index} className={`${styles.testimonial}`}>
            <p className={`${styles.quote}`}>{testimonial.quote}</p>
            <p className={`${styles.name}`}>{testimonial.name}</p>
          </div>
        ))}
      </div>
    </SectionRegular>
  );
};

export default SectionAvis;
