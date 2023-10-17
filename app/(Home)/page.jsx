"use client";

import React, { useState } from "react";
require("dotenv").config();

// STYLE
import styles from "./page.module.css";
// CONTEXTE
import { useLoginModalContext } from "../../context/loginForm";
import { useThemeContext } from "../../context/theme";
// COMPONENTS
import LoginForm from "../../components/elements/modal/page";
import Main from "../../components/main/page";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";

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
