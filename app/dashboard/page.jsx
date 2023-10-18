"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
// STYLE
import styles from "./Dashboard.module.css";
// COMPONENTS
import AddProject from "../../components/dashboard/addProject/AddProject";
import SectionRegular from "../../components/sections/sectionRegular/page";
import ArticleOneColum from "../../components/articles/articleOneColum/page";
import DisplayProjects from "../../components/dashboard/displayProjects/page";
import ArticleTwoColums from "@components/articles/articleTwoColums/page";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  // VARIABLES
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

  // FETCH GET ALL
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
  // FETCH POST ONE PROJECT
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
  // FETCH DELETE
  const fetchDeleteProjects = async (item) => {
    const projectId = item._id;
    console.log(projectId);
    try {
      const response = await fetch(`/api/project/delete/${projectId}`, {
        method: "DELETE",
      });
      // const data = await response.json();
      if (response.ok) {
        console.log("Project delete successfully");
        alert("Project delete successfully");
        fetchProjects();
      } else {
        console.error("Failed to delete Project");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // HANDLE UPDATE ONE PROJECT
  const handleEditProject = async (item) => {
    router.push(`/dashboard/project/${item._id}`);
  };
  // HANDLE ONE PROJECT
  const handleDeleteProject = async (item) => {
    console.log("Supprimer :", item);
    fetchDeleteProjects(item);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className={`${styles.main} `}>
      {/* PORTFOLIO */}
      <SectionRegular sectionTitle={"Mes Projets"} sectionId={"projects"}>
        <ArticleTwoColums
          articleOne={
            <AddProject
              formData={formData}
              setFormData={setFormData}
              handleCreateProject={handleCreateProject}
            />
          }
          articleTwo={
            !isDataProject ? (
              <p>Chargement </p>
            ) : allProjects.length > 0 ? (
              <DisplayProjects
                data={allProjects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>Il n'y a pas de encore de projet enregistré</p>
            )
          }></ArticleTwoColums>
      </SectionRegular>
    </main>
  );
}
