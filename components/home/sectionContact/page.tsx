/* eslint-disable react/no-unescaped-entities */
"use client";

// LIB
import SectionRegular from "@components/lib/sections/sectionRegular/page";
// COMPONENTS
import ContactForm from "./contact/page";
import SloganText from "@components/lib/elements/sloganText/page";

const SectionContact = () => {
  return (
    <SectionRegular addClass={""} sectionTitle={"Me Contacter"} sectionId={"contact"}>
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
