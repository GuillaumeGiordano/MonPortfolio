/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLoginModalContext } from "@context/loginForm";
// STYLE
import styles from "./LoginForm.module.css";
// COMPONENTS
import SignIn from "./signIn/page";
import SignUp from "./signUp/page";

const LoginForm = () => {
  const { data: session } = useSession();
  const { isOpen, toggleModal } = useLoginModalContext();
  const [page, setPage] = useState("signIn");

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Empêcher la propagation de l'événement vers le conteneur parent (la modal)
    e.stopPropagation();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setPage("signIn");
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
            setPage("signIn");
            toggleModal();
          }}>
          {/* CARD */}
          <div className={styles.card} onClick={handleCardClick}>
            {/* NAV */}
            <div className={styles.nav}>
              {page === "signUp" ? (
                <button onClick={() => setPage("signIn")}>retour</button>
              ) : (
                ""
              )}
              <button
                className={styles.btnClose}
                onClick={() => {
                  setPage("signIn");
                  toggleModal();
                }}>
                X
              </button>
            </div>

            {/* SIGN IN */}
            <div className={styles.modalContent}>
              {page === "signIn" ? (
                <>
                  <h2 className={styles.title}>Se connecter</h2>
                  <SignIn />
                  <p>
                    Je souhaite m'inscrir{" "}
                    <button onClick={() => setPage("signUp")}>click ici</button>
                  </p>
                </>
              ) : (
                ""
              )}

              {/* SIGN UP */}
              {page === "signUp" ? (
                <>
                  <h2 className={styles.title}>S'inscrire</h2>
                  <SignUp setPage={setPage} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
