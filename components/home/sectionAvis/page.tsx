"use client";

import React from "react";

// STYLE
import styles from "./SectionAvis.module.css";
import SectionRegular from "@components/lib/sections/sectionRegular/page";

const SectionAvis = () => {
  return (
    <SectionRegular className={""} sectionTitle={"Les Avis"} sectionId={"avis"}>
      <div>salut je suis un childreen</div>
    </SectionRegular>
  );
};

export default SectionAvis;
