"use client";

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
    image: "",
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
  const fetchUpdateProject = async (projectId: string) => {
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
    data.append("file", formData.image);
    data.append("title", formData.title);
    data.append("mission", formData.mission);
    data.append("description", formData.description);
    data.append("languages", formData.languages);
    data.append("url", formData.url);
    try {
      const response = await fetch(`/api/project/update/${projectId}`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        setError("");
        console.log("Project update successfully");
        router.push(`/dashboard`);
      } else {
        setError("Error data");
        console.error("Failed to update Project");
      }
    } catch (error) {
      setError("Error server");
      console.error("Error: ", error);
    }
  };

  // HANDLES METHODES
  const handleUpdateProject = () => {
    fetchUpdateProject(params.slug);
  };

  useEffect(() => {
    fetchOneProject(params.slug);
  }, [params.slug]);

  console.log(error);
  return (
    <>
      {session?.user.role === "admin" ? (
        <Main>
          <SectionRegular className={""} sectionId={"projet"} sectionTitle={`Mon projet`}>
            {error && <div className={""}>{error}</div>}
            <ArticleOneColum className={""}>
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
