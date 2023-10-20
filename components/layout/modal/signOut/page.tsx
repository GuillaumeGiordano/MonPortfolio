"use client";
import React from "react";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <button
      onClick={() => {
        handleSignOut();
      }}>
      Sign Out
    </button>
  );
};

export default SignOut;
