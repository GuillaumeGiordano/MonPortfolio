"use client";
require("dotenv").config();

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
// STYLE
import styles from "./Dashboard.module.css";
// AUTH
import { useSession } from "next-auth/react";
// COMPONENTS
import AddProject from "@components/dashboard/addProject/page";
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import DisplayProjects from "@components/dashboard/displayProjects/page";
import ArticleTwoColums from "@components/lib/articles/articleTwoColums/page";
import Main from "@components/lib/main/page";
import { IProject } from "@types";

export default function Dashboard() {
  const router = useRouter();

  // AUTH
  const { data: session } = useSession();
  if (session?.user.role === "user" && session !== undefined) {
    redirect("/");
  }

  // VARIABLES
  const [error, setError] = useState("");
  const [isDataProject, setIsDataProject] = useState(false);
  const [isloading, setIsLaoding] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    mission: "",
    description: "",
    languages: "",
    url: "",
  });
  const [fileURL, setFileURL] = useState("");

  // FETCH PROJECT => GET ALL + POST ONE + DELETE ONE
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/project/all");
      const data = await response.json();
      console.log(data);
      setAllProjects(data);
      setIsDataProject(true);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDeleteProjects = async (item: IProject) => {
    const projectId = item._id;
    try {
      const response = await fetch(`/api/project/delete/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Project delete successfully");
        fetchProjects();
      } else {
        setError("Failed to delete Project");
        console.error("Failed to delete Project");
      }
    } catch (error) {
      setError("Error server");
      console.error("Error: ", error);
    }
  };
  const fetchCreateCloudinary = async (file: File) => {
    if (!file) {
      return console.log("il manque l'image !");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolioPreset");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dvnqubycm/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Upload failed");
        throw new Error("failed upload image !");
      }

      const imageData = await res.json();
      const imageUrl = await imageData.secure_url;
      console.log("fetchCreateCloudinary");
      console.log(imageData.secure_url);
      return imageData.secure_url;
      setFileURL(imageUrl);
      console.log(fileURL);
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLES METHODES
  const handleCreateProject = async () => {
    if (
      formData.image === null ||
      formData.title === "" ||
      formData.mission === "" ||
      formData.description === "" ||
      formData.languages === "" ||
      formData.url === ""
    ) {
      setError("Il est important de remplir entierement le formulaire, merci");
      console.log(error);
      return;
    }

    const imageUrl = await fetchCreateCloudinary(formData.image);
    console.log("imageUrl");
    console.log(imageUrl);

    const data = new FormData();
    data.append("file", formData.image);
    data.append("fileURL", imageUrl);
    data.append("title", formData.title);
    data.append("mission", formData.mission);
    data.append("description", formData.description);
    data.append("languages", formData.languages);
    data.append("url", formData.url);

    try {
      setIsLaoding(true);
      const response = await fetch("/api/project/new", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        setError("Failed to create Project");
        console.error("Failed to create Project");
        return;
      }

      setFormData({
        image: null,
        title: "",
        mission: "",
        description: "",
        languages: "",
        url: "",
      });
      setError("");
      fetchProjects();
      setIsLaoding(false);
      console.log("Project created successfully");
    } catch (error) {
      setError("Error server");
      console.error("Error: ", error);
    }
  };
  const handleEditProject = async (item: IProject) => {
    router.push(`/dashboard/project/${item._id}`);
    fetchProjects();
  };
  const handleDeleteProject = async (item: IProject) => {
    fetchDeleteProjects(item);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {session?.user.role === "admin" ? (
        <Main addClass={styles.main}>
          {isloading && <p>Is loading</p>}
          {/* SETTING PORTFOLIO */}
          <SectionRegular
            sectionTitle={"Mes Projets"}
            sectionId={"projects"}
            addClass={""}>
            {error && <div className={""}>{error}</div>}
            <ArticleTwoColums
              addClass={""}
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
                    allProjects={allProjects}
                    handleEditProject={handleEditProject}
                    handleDeleteProject={handleDeleteProject}
                  />
                ) : (
                  // eslint-disable-next-line react/no-unescaped-entities
                  <p>Il n'y a pas de encore de projet enregistré</p>
                )
              }></ArticleTwoColums>
          </SectionRegular>
        </Main>
      ) : (
        ""
      )}
    </>
  );
}
