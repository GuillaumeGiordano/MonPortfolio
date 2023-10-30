"use client";

import React, { ChangeEvent, useState } from "react";
import styles from "./AddProject.module.css";
import Image from "next/image";

const AddProject = ({ formData, setFormData, handleCreateProject }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setFormData({
        ...formData,
        image: imageFile,
      });
    }
    // formRef.current.reset();
  };

  return (
    <form className={`${styles.form}`} action=''>
      <div className={`${styles.ctn} ${styles.ctn__image}`}>
        <label className={`${styles.label}`} htmlFor='image'>
          Image URL:
        </label>
        {formData.image && (
          <Image
            src={URL.createObjectURL(formData.image)}
            alt='Image Preview'
            className={`${styles.imagePreview}`}
            width={100}
            height={100}
          />
        )}
        <input
          type='file'
          id='image'
          name='image'
          accept='image/*' // Limitez les types de fichiers à des images
          className={`${styles.input}`}
          onChange={handleImageChange} // Gérez le changement d'image
        />
      </div>

      <div className={`${styles.ctn}`}>
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
      </div>
      <div className={`${styles.ctn}`}>
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
      </div>
      <div className={`${styles.ctn}`}>
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
      </div>
      <div className={`${styles.ctn}`}>
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
      </div>
      <div className={`${styles.ctn}`}>
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
      </div>
      <button
        type='button'
        className={`${styles.button}`}
        onClick={() => {
          handleCreateProject();
        }}>
        Submit
      </button>
    </form>
  );
};

export default AddProject;
