"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginModalContext } from "@context/loginForm";
import { FormEvent } from "react";

const SignIn = () => {
  const router = useRouter();
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

      toggleModal();
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
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
      <button>Sign In</button>

      {error && <div>{error}</div>}
    </form>
  );
};

export default SignIn;
