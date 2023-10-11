/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
// STYLE
import styles from "./page.module.css";
// CONTEXTE
import { useThemeContext } from "./context/theme";
import { useLoginModalContext } from "./context/loginForm";
// COMPONENTS
import Footer from "./components/footer/page";
import Header from "./components/header/page";
import LoginForm from "./components/elements/modal/page";
import Main from "./components/main/page";

export default function Home() {
  const { isLightTheme } = useThemeContext();
  const { isOpen } = useLoginModalContext();

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      <Main />
      <Footer />
    </body>
  );
}
