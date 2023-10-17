"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// STYLE
import styles from "./Dashboard.module.css";
// CONTEXTE
import { useThemeContext } from "../../context/theme";
import { useLoginModalContext } from "../../context/loginForm";
// COMPONENTS
import AddProject from "../../components/addProject/AddProject";
import Header from "../../components/header/page";
import LoginForm from "../../components/elements/modal/page";
import Footer from "../../components/footer/page";
import SectionRegular from "../../components/sections/sectionRegular/page";
import ArticleOneColum from "../../components/articles/articleOneColum/page";
import CardPortfolio from "../../components/cards/cardPortfolio/page";

export default function Dashboard() {
  // VARIABLES
  const { isLightTheme } = useThemeContext;
  const { isOpen } = useLoginModalContext;
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    mission: "",
    description: "",
    languages: "",
    url: "",
  });
  const [allProjects, setAllProjects] = useState([]);
  const [isDataProject, setIsDataProject] = useState(false);

  // CONTROL AUTH
  if (!session && session !== undefined) {
    redirect("/");
  }
  // FETCH ALL
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
  // FETCH CREATE ONE PROJECT
  const handleCreateProject = async () => {
    try {
      const response = await fetch("/api/project/new", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setFormData({
          image: "",
          title: "",
          mission: "",
          description: "",
          languages: "",
          url: "",
        });
        console.log("Project created successfully");
        alert("Project created successfully");
        fetchProjects();
      } else {
        console.error("Failed to create Project");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      <main className={`${styles.main}`}>
        {/* PORTFOLIO */}
        <SectionRegular sectionTitle={"Mes Projets"} sectionId={"projects"}>
          <ArticleOneColum>
            <AddProject
              formData={formData}
              setFormData={setFormData}
              handleCreateProject={handleCreateProject}
            />
          </ArticleOneColum>

          <ArticleOneColum className={`${styles.ctn_portfolio}`}>
            {!isDataProject ? (
              <p>Chargement </p>
            ) : allProjects.length > 0 ? (
              allProjects.map((item) => <CardPortfolio key={item._id} item={item} />)
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>Il n'y a pas de encore de projet enregistré</p>
            )}
          </ArticleOneColum>
        </SectionRegular>
      </main>

      <Footer />
    </body>
  );
}
