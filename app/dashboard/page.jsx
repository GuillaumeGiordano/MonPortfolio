"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
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
import SectionRegular from "../../components/sections/sectionRegular/page";

export default function Dashboard() {
  const { isLightTheme } = useThemeContext;
  const { isOpen } = useLoginModalContext;
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }

  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      {/* PROJECT */}
      <SectionRegular sectionTitle={"Dashboard"} sectionId={"dashboard"}>
        <AddProject />
      </SectionRegular>
      <Footer />
    </body>
  );
}
