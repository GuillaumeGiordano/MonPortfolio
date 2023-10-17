"use client";
// STYLE
import styles from "./Dashboard.module.css";
// CONTEXTE
import { useThemeContext } from "../../context/theme";
import { useLoginModalContext } from "../../context/loginForm";
// COMPONENTS
import AddProject from "../../components/addProject/AddProject";
import Header from "../../components/header/page";
import LoginForm from "../../components/elements/modal/page";
import Footer from "../../components/footer/page";

export default function Dashboard() {
  const { isLightTheme } = useThemeContext;
  const { isOpen } = useLoginModalContext;

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      <AddProject />
      <Footer />
    </body>
  );
}
