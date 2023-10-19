"use client";

import React, { useEffect, useState } from "react";

// STYLE
import styles from "./SectionContact.module.css";
import SectionRegular from "@components/lib/sections/sectionRegular/page";

const SectionContact = () => {
  return (
    <SectionRegular className={""} sectionTitle={"Me Contacter"} sectionId={"contact"}>
      <div>Ici mon formulaire</div>
    </SectionRegular>
  );
};

export default SectionContact;
