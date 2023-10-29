"use client";
import { useState } from "react";
import { FormEvent } from "react";
import styles from "./Signup.module.css";

const SignUp = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Sign-up successful
        console.log("Sign-up successful");
        setPage("signIn");
      } else {
        // Sign-up failed
        console.error("Sign-up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErr(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
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
      <button className={styles.btn}>Sign Up</button>
      {err && <div>{err}</div>}
    </form>
  );
};

export default SignUp;
