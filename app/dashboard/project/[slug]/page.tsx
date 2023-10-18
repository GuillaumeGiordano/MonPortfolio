"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import UpdateProject from "../../../../components/dashboard/updateProject/page";
import SectionRegular from "../../../../components/sections/sectionRegular/page";
import ArticleOneColum from "../../../../components/articles/articleOneColum/page";

export default function Project({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  // VARIABLES
  const [oneProject, setOneProject] = useState({
    image: "",
    title: "",
    mission: "",
    description: "",
    languages: "",
    url: "",
  });
  const [isDataProject, setIsDataProject] = useState(false);

  // CONTROL AUTH
  if (!session && session !== undefined) {
    redirect("/");
  }

  const fetchOneProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/project/one/${projectId}`);
      const data = await response.json();
      setOneProject(data);
      setIsDataProject(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdateProject = async (projectId: string) => {
    // const updatedData = { ...oneProject };
    // delete updatedData["_id"];
    // delete updatedData["__v"];

    try {
      const response = await fetch(`/api/project/update/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(oneProject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Project update successfully");
        alert("Project update successfully");
        // fetchOneProject(projectId);
      } else {
        console.error("Failed to update Project");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdateProject = () => {
    console.log("modifier");
    fetchUpdateProject(params.slug);
    router.push(`/dashboard`);
  };

  useEffect(() => {
    fetchOneProject(params.slug);
  }, [params.slug]);

  return (
    <main>
      <SectionRegular sectionId={"projet"} sectionTitle={`Mon projet ${params.slug}`}>
        <ArticleOneColum className={""}>
          {!isDataProject ? (
            <p>Chargement</p>
          ) : (
            <UpdateProject
              formData={oneProject}
              setFormData={setOneProject}
              handleUpdateProject={handleUpdateProject}
            />
          )}
        </ArticleOneColum>
      </SectionRegular>
    </main>
  );
}
