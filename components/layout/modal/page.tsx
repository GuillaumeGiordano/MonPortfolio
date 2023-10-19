"use client";

import React, { useEffect } from "react";
import styles from "./LoginForm.module.css";
import { useLoginModalContext } from "@context/loginForm";
import Login from "./login/page";
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
    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey, isOpen]);

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
            <div className={styles.modalContent}>
              <h2 className={styles.title}>Connexion</h2>
              {/* CNX GITHUB */}
              <Login />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
