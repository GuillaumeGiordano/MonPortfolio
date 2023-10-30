"use client";
require("dotenv").config();

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
// AUTH
import { useSession } from "next-auth/react";
// COMPONENTS
import UpdateProject from "@components/dashboard/updateProject/page";
import SectionRegular from "@components/lib/sections/sectionRegular/page";
import ArticleOneColum from "@components/lib/articles/articleOneColum/page";
import Main from "@components/lib/main/page";

export default function Project({ params }: { params: { slug: string } }) {
  const router = useRouter();

  // CONTROL AUTH
  const { data: session } = useSession();
  if (session?.user.role === "user" && session !== undefined) {
    redirect("/");
  }

  // VARIABLES
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    mission: "",
    description: "",
    languages: "",
    url: "",
  });
  const [isDataProject, setIsDataProject] = useState(false);

  // FETCH
  const fetchOneProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/project/one/${projectId}`);

      if (response.status === 400) {
        setError(`The project doesn't existe !`);
        return;
      }
      if (response.status === 500) {
        setError("I can't connect to mongoDB");
        return;
      }

      const data = await response.json();
      setFormData(data);
      setIsDataProject(true);
      setError("");
    } catch (error) {
      setError("Error server");
      console.log(error);
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
      console.log("fetchCreateCloudinary");
      console.log(imageData.secure_url);
      return imageData.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLES METHODES
  const handleUpdateProject = async () => {
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

    const data = new FormData();

    if (formData.image instanceof File) {
      const imageUrl = await fetchCreateCloudinary(formData.image);
      data.append("fileURL", imageUrl);
    }

    data.append("file", formData.image);
    data.append("title", formData.title);
    data.append("mission", formData.mission);
    data.append("description", formData.description);
    data.append("languages", formData.languages);
    data.append("url", formData.url);
    try {
      const response = await fetch(`/api/project/update/${params.slug}`, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) {
        setError("Error data");
        console.error("Failed to update Project");
        return;
      }

      setError("");
      console.log("Project update successfully");
      router.push(`/dashboard`);
    } catch (error) {
      setError("Error server");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchOneProject(params.slug);
  }, [params.slug]);

  console.log(formData);
  return (
    <>
      {session?.user.role === "admin" ? (
        <Main addClass={""}>
          <SectionRegular addClass={""} sectionId={"projet"} sectionTitle={`Mon projet`}>
            {error && <div className={""}>{error}</div>}
            <ArticleOneColum addClass={""}>
              {!isDataProject ? (
                <p>Chargement</p>
              ) : (
                <UpdateProject
                  handleUpdateProject={handleUpdateProject}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </ArticleOneColum>
          </SectionRegular>
        </Main>
      ) : (
        ""
      )}
    </>
  );
}
