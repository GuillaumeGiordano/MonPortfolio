"use client";

import React, { useEffect, useState } from "react";

// STYLE
import styles from "./SectionAvis.module.css";
import SectionRegular from "@components/sections/sectionRegular/page";

const SectionAvis = () => {
  return (
    <SectionRegular sectionTitle={"Les Avis"} sectionId={"avis"}>
      <div>salut je suis un childreen</div>
    </SectionRegular>
  );
};

export default SectionAvis;
