"use client";
import React, { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((value) => !value);
  };

  return (
    <LoginModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModalContext() {
  return useContext(LoginModalContext);
}
