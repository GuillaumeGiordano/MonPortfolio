/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import styles from "./Contact.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Envoi de l'e-mail avec Nodemailer
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Votre message a été envoyé avec succès, merci de votre confiance.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Une erreur s'est produite lors de l'envoi du formulaire.");
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de l'envoi du formulaire.");
    }
  };

  return (
    <div className={`${styles.contact}`}>
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <div className={`${styles.ctn}`}>
          <label className={`${styles.label}`} htmlFor='name'>
            Nom :
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className={`${styles.input}`}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.ctn}`}>
          <label className={`${styles.label}`} htmlFor='email'>
            Adresse e-mail :
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className={`${styles.input}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.ctn}`}>
          <label className={`${styles.label}`} htmlFor='message'>
            Message :
          </label>
          <textarea
            id='message'
            name='message'
            className={`${styles.textarea}`}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button className={`${styles.btn}`} type='submit'>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
