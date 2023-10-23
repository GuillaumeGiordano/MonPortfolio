"use client";

import React from "react";
import { dataAvis } from "@data/dataAvis";

// STYLE
import styles from "./SectionAvis.module.css";
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import Image from "next/image";

const SectionAvis = () => {
  return (
    <SectionRegular className={""} sectionTitle={"Les Avis"} sectionId={"avis"}>
      <div className={`${styles.testimonials}`}>
        {dataAvis.map((testimonial, index) => (
          <div key={index} className={`${styles.testimonial}`}>
            {/* <Image src={testimonial.image} alt={testimonial.name} /> */}
            <p className={`${styles.quote}`}>{testimonial.quote}</p>
            <p className={`${styles.name}`}>{testimonial.name}</p>
          </div>
        ))}
      </div>
    </SectionRegular>
  );
};

export default SectionAvis;
