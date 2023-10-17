"use client";

import React, { useState } from "react";
import styles from "./AddProject.module.css";

const AddProject = ({ formData, setFormData, handleCreateProject }) => {
  // const [formData, setFormData] = useState({
  //   image: "",
  //   title: "",
  //   mission: "",
  //   description: "",
  //   languages: "",
  //   url: "",
  // });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleCreateProject = async () => {
  //   try {
  //     const response = await fetch("/api/project/new", {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       setFormData({
  //         image: "",
  //         title: "",
  //         mission: "",
  //         description: "",
  //         languages: "",
  //         url: "",
  //       });
  //       console.log("Project created successfully");
  //       alert("Project created successfully");
  //     } else {
  //       console.error("Failed to create Project");
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // };

  return (
    <div className={`${styles.form}`}>
      <div>
        <label htmlFor='image'>Image URL:</label>
        <input
          type='text'
          id='image'
          name='image'
          value={formData.image}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='mission'>Mission:</label>
        <input
          type='text'
          id='mission'
          name='mission'
          value={formData.mission}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='languages'>Languages:</label>
        <input
          type='text'
          id='languages'
          name='languages'
          value={formData.languages}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='url'>URL:</label>
        <input
          type='text'
          id='url'
          name='url'
          value={formData.url}
          onChange={(e) => handleChange(e)}
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
