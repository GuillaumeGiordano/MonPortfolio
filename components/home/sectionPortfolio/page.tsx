/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
// STYLE
import styles from "./SectionPortfolio.module.css";
// LIB
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ArticleOneColum from "@components/lib/articles/articleOneColum/page";
import SloganText from "@components/lib/elements/sloganText/page";
// COMPONENTS
import CardPortfolio from "@components/home/sectionPortfolio/cardPortfolio/page";

const SectionPortfolio = () => {
  // VARIABLES
  const [allProjects, setAllProjects] = useState([]);
  const [isDataProject, setIsDataProject] = useState(false);
  // FETCH METHODES
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/project/all");
      const data = await response.json();

      if (!response.ok) {
        console.log("Il y a un probleme avec API project All");
        return;
      }

      setAllProjects(data);
      setIsDataProject(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <SectionRegular addClass={""} sectionTitle={"Mon Portfolio"} sectionId={"portfolio"}>
      <SloganText slogan={' " Du design à la réalité, mes projets prennent vie. " '} />

      <ArticleOneColum addClass={`${styles.ctn_portfolio}`}>
        {!isDataProject ? (
          <p>Chargement </p>
        ) : allProjects.length > 0 ? (
          allProjects.map((item) => <CardPortfolio key={item._id} item={item} />)
        ) : (
          <p>Il n'y a pas de encore de projet enregistré</p>
        )}
      </ArticleOneColum>
    </SectionRegular>
  );
};

export default SectionPortfolio;
