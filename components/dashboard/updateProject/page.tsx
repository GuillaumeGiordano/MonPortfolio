"use client";

import Image from "next/image";
import styles from "./UpdateProject.module.css";

import React, { useState } from "react";

const UpdateProject = ({ handleUpdateProject, formData, setFormData }) => {
  const [isFile, setIsFile] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setIsFile(true);
      setFormData({
        ...formData,
        image: imageFile,
      });
    }
  };

  return (
    <div className={`${styles.form}`}>
      <div className={`${styles.ctn}`}>
        <label className={`${styles.label}`} htmlFor='image'>
          Image URL:
        </label>
        {!isFile ? (
          <Image
            src={formData.image}
            alt='Image Preview'
            className={`${styles.imagePreview}`}
            width={100}
            height={100}
          />
        ) : (
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
          handleUpdateProject();
        }}>
        Submit
      </button>
    </div>
  );
};

export default UpdateProject;
