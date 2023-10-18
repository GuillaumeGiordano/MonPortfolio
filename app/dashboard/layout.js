"use client";

import { useThemeContext } from "../../context/theme";
import { useLoginModalContext } from "../../context/loginForm";

import Header from "../../components/header/page";
import LoginForm from "../../components/elements/modal/page";
import Footer from "../../components/footer/page";

export default function RootLayout({ children }) {
  const { isLightTheme } = useThemeContext;
  const { isOpen } = useLoginModalContext;
  return (
    <body
      className={`${isLightTheme ? "dark" : "light"} ${isOpen ? "body__module" : ""}`}>
      <Header />
      <LoginForm />
      {children}
      <Footer />
    </body>
  );
}
