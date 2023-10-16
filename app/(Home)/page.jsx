/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
require("dotenv").config();

// STYLE
import styles from "./page.module.css";
// CONTEXTE
import { useLoginModalContext } from "../../src/context/loginForm";
import { useThemeContext } from "../../src/context/theme";
// COMPONENTS
import LoginForm from "../../components/elements/modal/page";
import Main from "../../src/feature/layout/main/page";
import Header from "../../src/feature/layout/header/page";
import Footer from "../../src/feature/layout/footer/page";

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
