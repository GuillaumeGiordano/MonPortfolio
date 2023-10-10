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

  // const tabs = [
  //   {
  //     label: "Tab 1",
  //     content: <p>Contenu du premier onglet.</p>,
  //   },
  //   {
  //     label: "Tab 2",
  //     content: <p>Contenu du deuxième onglet.</p>,
  //   },
  //   {
  //     label: "Tab 3",
  //     content: <p>Contenu du troisième onglet.</p>,
  //   },
  // ];

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
