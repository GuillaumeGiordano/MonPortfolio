/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
// STYLE
import styles from "./page.module.css";
// CONTEXTE
import { useThemeContext } from "../src/context/theme";
import { useLoginModalContext } from "../src/context/loginForm";
// COMPONENTS
import Footer from "../src/feature/layout/footer/page";
import Header from "../src/feature/layout/header/page";
import LoginForm from "../components/elements/modal/page";
import Main from "../src/feature/layout/main/page";

export default function Home() {
  const { isLightTheme } = useThemeContext();
  const { isOpen } = useLoginModalContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = "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";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/GuillaumeGiordano/repos"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      // NEttoyage au démontage du comportement
    };
  }, []);

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      {loading ? <p>Chargement ....</p> : <Main data={data} />}
      <Footer />
    </body>
  );
}
