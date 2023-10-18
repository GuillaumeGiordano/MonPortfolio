/* eslint-disable react/no-unescaped-entities */
"use client";

require("dotenv").config();
import React, { useEffect, useState } from "react";

// STYLE
import styles from "./SectionPortfolio.module.css";
import SectionRegular from "@components/sections/sectionRegular/page";
import ArticleOneColum from "@components/articles/articleOneColum/page";
import CardPortfolio from "@components/cards/cardPortfolio/page";
// COMPONENTS

// DATA

const SectionPortfolio = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isDataProject, setIsDataProject] = useState(false);

  // FETCH
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/project/all");
      const data = await response.json();
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
    <SectionRegular sectionTitle={"Mon Portfolio"} sectionId={"portfolio"}>
      <ArticleOneColum className={`${styles.ctn_portfolio}`}>
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
