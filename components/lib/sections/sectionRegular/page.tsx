"use client";

import React from "react";
// STYLES
import styles from "./SectionRegular.module.css";

const SectionRegular = ({ sectionId, sectionTitle, children, addClass }) => {
  return (
    <section className={`${styles.section} `} id={sectionId} data-id={sectionId}>
      {sectionTitle && (
        <div className={`${styles.sectionHead}`}>
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        </div>
      )}
      <div className={`${styles.sectionBody} ${addClass || ""}`}>{children}</div>
    </section>
  );
};

export default SectionRegular;
