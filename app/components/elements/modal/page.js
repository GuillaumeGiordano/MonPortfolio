"use client";

import React, { useEffect } from "react";
import styles from "./LoginForm.module.css";
import BtnNormal from "../../buttons/buttonRegular/page";
import { useLoginModalContext } from "@/app/context/loginForm";

const LoginForm = () => {
  const { isOpen, toggleModal } = useLoginModalContext();

  const handleCardClick = (e) => {
    // Empêcher la propagation de l'événement vers le conteneur parent (la modal)
    e.stopPropagation();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <>
      {isOpen && (
        // MODAL
        <div
          id='id01'
          className={styles.modal}
          onClick={() => {
            toggleModal();
          }}>
          {/* CARD */}
          <div className={styles.card} onClick={handleCardClick}>
            {/* NAV */}
            <div className={styles.nav}>
              <button
                className={styles.btnClose}
                onClick={() => {
                  toggleModal();
                }}>
                X
              </button>
            </div>

            {/* SIGN UP */}
            <form className={styles.modalContent} action='' method='post'>
              {/* <div className={styles.img}>
                <img src='/G2WebApplication.svg' alt='Avatar' className={styles.avatar} />
              </div> */}
              <h2 className={styles.title}>Connexion</h2>

              <div className={styles.container}>
                <label htmlFor='uname' className={styles.label}>
                  E mail :
                </label>
                <input
                  type='text'
                  placeholder='Enter Username'
                  id='uname'
                  name='uname'
                  className={styles.input}
                  required
                />

                <label htmlFor='psw' className={styles.label}>
                  Mot de passe :
                </label>
                <div className={styles.input}>
                  <input
                    type='password'
                    placeholder='Enter Password'
                    id='psw'
                    name='psw'
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className={styles.footer}>
                <label htmlFor='remember'>
                  <input
                    type='checkbox'
                    defaultChecked={true}
                    name='remember'
                    id='remember'
                  />
                  Remember me
                </label>
              </div>
              <BtnNormal libelle={"S'inscrire"} />
              <BtnNormal libelle={"Login"} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
