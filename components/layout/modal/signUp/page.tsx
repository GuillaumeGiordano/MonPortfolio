"use client";
import { useState } from "react";
import { FormEvent } from "react";

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
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <div>
        <div>
          <label>Email:</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Sign Up</button>
        {err && <div>{err}</div>}
      </div>
    </form>
  );
};

export default SignUp;
