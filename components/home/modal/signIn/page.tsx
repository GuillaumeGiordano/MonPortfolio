"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLoginModalContext } from "@context/loginForm";
import { FormEvent } from "react";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const { toggleModal } = useLoginModalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid e-mail or passeword");
        return;
      }

      setError("");
      toggleModal();
    } catch (error) {
      console.log(error);
      setError("Failed to sign In");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      {error && <div>{error}</div>}

      <div className={styles.ctn}>
        <label className={styles.label}>Email:</label>
        <input
          className={styles.input}
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.ctn}>
        <label className={styles.label}>Password:</label>
        <input
          className={styles.input}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className={styles.btn}>Sign In</button>
    </form>
  );
};

export default SignIn;
