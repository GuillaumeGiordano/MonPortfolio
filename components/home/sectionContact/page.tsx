/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";

// STYLE
import styles from "./SectionContact.module.css";
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ContactForm from "./contact/page";
import SloganText from "@components/lib/elements/sloganText/page";

const SectionContact = () => {
  return (
    <SectionRegular className={""} sectionTitle={"Me Contacter"} sectionId={"contact"}>
      <SloganText
        slogan={
          "Prêt à donner vie à vos idées ? Contactez-moi pour transformer votre vision en réalité numérique."
        }
      />
      <ContactForm />
    </SectionRegular>
  );
};

export default SectionContact;
