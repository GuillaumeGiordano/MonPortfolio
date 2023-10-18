"use client";

import React, { useState } from "react";
import styles from "./AddProject.module.css";

const AddProject = ({ formData, setFormData, handleCreateProject }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={`${styles.form}`}>
      <label className={`${styles.label}`} htmlFor='image'>
        Image URL:
      </label>
      <input
        type='text'
        id='image'
        name='image'
        className={`${styles.input}`}
        value={formData.image}
        onChange={(e) => handleChange(e)}
      />

      <label className={`${styles.label}`} htmlFor='title'>
        Title:
      </label>
      <input
        type='text'
        id='title'
        name='title'
        className={`${styles.input}`}
        value={formData.title}
        onChange={(e) => handleChange(e)}
      />

      <label className={`${styles.label}`} htmlFor='mission'>
        Mission:
      </label>
      <input
        type='text'
        id='mission'
        name='mission'
        className={`${styles.input}`}
        value={formData.mission}
        onChange={(e) => handleChange(e)}
      />

      <label className={`${styles.label}`} htmlFor='description'>
        Description:
      </label>
      <textarea
        id='description'
        name='description'
        className={`${styles.textarea}`}
        value={formData.description}
        onChange={(e) => handleChange(e)}
      />

      <label className={`${styles.label}`} htmlFor='languages'>
        Languages:
      </label>
      <input
        type='text'
        id='languages'
        name='languages'
        className={`${styles.input}`}
        value={formData.languages}
        onChange={(e) => handleChange(e)}
      />

      <label className={`${styles.label}`} htmlFor='url'>
        URL:
      </label>
      <input
        type='text'
        id='url'
        name='url'
        className={`${styles.input}`}
        value={formData.url}
        onChange={(e) => handleChange(e)}
      />

      <button
        type='button'
        className={`${styles.button}`}
        onClick={() => {
          handleCreateProject();
        }}>
        Submit
      </button>
    </div>
  );
};

export default AddProject;
