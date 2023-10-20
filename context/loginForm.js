"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LoginModalContext = createContext();

export function LoginModalContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((value) => !value);
  };

  // BODY NO SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body__module");
    } else {
      document.body.classList.remove("body__module");
    }
  }, [isOpen]);

  return (
    <LoginModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModalContext() {
  return useContext(LoginModalContext);
}
