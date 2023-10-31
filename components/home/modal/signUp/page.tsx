"use client";
import React, { useState } from "react";
import { FormEvent } from "react";
// STYLES
import styles from "./Signup.module.css";

const SignUp = ({ setPage }) => {
  // VARIABLES
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");

  // HANDLES METHODES
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password1 || !password2) {
      setErr("il faut remplir le formulaire, s'il vous plait");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password1, password2 }),
      });

      if (!response.ok) {
        setErr("Sign-up failed");
        console.error("Sign-up failed");

        if (response.status === 401) {
          setErr("You must complete the form");
        }
        if (response.status === 402) {
          setErr("The passwords are not the same!");
        }
        if (response.status === 403) {
          setErr("Email already registered");
        }
        if (response.status === 404) {
          setErr("The password is not long enough: =< 8 characters please");
        }
        if (response.status === 405) {
          setErr(
            "The password is not complicated enough : at least one lowercase letter, one uppercase letter, one number and one special character"
          );
        }
      } else {
        console.log("Sign-up successful");
        setErr("");
        setPage("signIn");
      }
    } catch (error) {
      console.error("Error:", error);
      setErr("Server failed");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      {err && <div>{err}</div>}

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
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
      </div>

      <div className={styles.ctn}>
        <label className={styles.label}>Password:</label>
        <input
          className={styles.input}
          type='password'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <button className={styles.btn}>Sign Up</button>
    </form>
  );
};

export default SignUp;
