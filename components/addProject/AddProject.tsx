"use client";

import React, { useState } from "react";
import styles from "./AddProject.module.css";

// MON TYPE TS
import { AddProjectProps } from "../../types/index";

const AddProject = () => {
  const [project, setProject] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateProject = async () => {
    alert("ca marche");
    setIsLoading(true);
    try {
      const response = await fetch("/api/project/new", {
        method: "POST",
        body: JSON.stringify({
          project: project,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setProject("");
        console.log("Project created successfully");
      } else {
        console.error("Failed to create Project");
      }
    } catch (error) {
      console.error("Error: ", error);
    }

    setIsLoading(false);
  };

  return (
    <div className={`${styles.form}`}>
      <div>
        <label htmlFor='image'>Image URL:</label>
        <input
          type='text'
          id='image'
          name='image'
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='mission'>Mission:</label>
        <input
          type='text'
          id='mission'
          name='mission'
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          name='description'
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='languages'>Languages:</label>
        <input
          type='text'
          id='languages'
          name='languages'
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='url'>URL:</label>
        <input
          type='text'
          id='url'
          name='url'
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <button
        type='button'
        onClick={() => {
          handleCreateProject();
        }}>
        Submit
      </button>
    </div>
  );
};

export default AddProject;
