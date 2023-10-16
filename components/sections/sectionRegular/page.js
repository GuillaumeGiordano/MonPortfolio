"use client";

import React from "react";
import styles from "./SectionRegular.module.css";

const SectionRegular = ({ sectionId, sectionTitle, children }) => {
  return (
    <section className={`${styles.section} `} id={sectionId} data-id={sectionId}>
      <div className={`${styles.sectionHead}`}>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
      </div>
      <div className={`${styles.sectionBody}`}>{children}</div>
    </section>
  );
};

export default SectionRegular;
