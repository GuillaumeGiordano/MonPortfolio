"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// AUTH
import { useSession } from "next-auth/react";
// STYLES
import styles from "./Header.module.css";
// CONTEXTES
import { useThemeContext } from "@context/theme";
import { useLoginModalContext } from "@context/loginForm";
// COMPONENTS
import ScrollProgressBar from "@components/layout/header/scrollProgressBar/page";
import Logo from "@components/layout/header/logo/page";
// UTILS
import scrollToSection from "@util/scrollToSection";

const Header = () => {
  // const router = useRouter();
  const { data: session } = useSession();
  // CONTEXTES
  const { isLightTheme } = useThemeContext();
  const { toggleModal } = useLoginModalContext();
  // VARIABLES
  const [scrolling, setScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isBurger, setIsBurger] = useState(false);

  // BUTTON SCROLL UP
  useEffect(() => {
    // Gestionnaire de scroll pour le bouton Scroll Up
    const handleScrollForScrollUpButton = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 1;

      if (scrollPosition > scrollThreshold) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScrollForScrollUpButton);
    // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScrollForScrollUpButton);
    };
  }, [scrolling]);
  // LINK ACTIVE SUIVANT SCROLL
  useEffect(() => {
    // Gestionnaire de scroll pour activer les liens suivant le scroll
    const handleScrollForActiveLinks = () => {
      const sections = document.querySelectorAll("[data-id]");
      let active = "";

      sections.forEach((section) => {
        const offset = 65;
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        const scrollY = window.scrollY;

        if (
          scrollY + offset >= sectionTop &&
          scrollY < sectionTop + sectionHeight + offset
        ) {
          active = (section as HTMLElement).getAttribute("data-id");
        }
      });

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScrollForActiveLinks);

    // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScrollForActiveLinks);
    };
  }, []);

  const handleClickBurger = () => {
    setIsBurger(!isBurger);
  };
  const handleClickToSection = (sectionId: string) => {
    // router.push(`/#${sectionId}`);
    scrollToSection(sectionId);
    handleClickBurger();
  };
  const handleClickToDashboard = () => {
    handleClickBurger();
  };
  const handleClickConnexion = () => {
    handleClickBurger();
    toggleModal();
  };
  const handleSignOut = () => {
    signOut();
  };

  return (
    <header
      className={`${styles.header} ${scrolling ? styles.scrolledBackground : ""} ${
        isLightTheme ? styles.header__dark : styles.header__light
      }`}
      id='header'>
      <ScrollProgressBar />

      <div className={styles.logo}>
        <Logo />
        <span
          className={`${styles.logo__title} ${
            isLightTheme ? styles.logo__title__light : styles.logo__title__dark
          }`}>
          {" "}
          Guillaume Giordano
        </span>
      </div>

      <nav className={styles.nav}>
        <ul className={`${styles.nav__ul} ${isBurger ? styles.ul__active : ""}`}>
          <li className={`${styles.nav__li}  `}>
            <Link
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "head" ? styles.active : ""}`}
              href='/#head'
              scroll={false}
              onClick={() => handleClickToSection("head")}>
              Home
            </Link>
          </li>

          <li className={`${styles.nav__li}  `}>
            <Link
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "about" ? styles.active : ""}`}
              href='/#about'
              scroll={false}
              onClick={() => handleClickToSection("about")}>
              A Propos
            </Link>
          </li>

          <li className={`${styles.nav__li}  `}>
            <Link
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "services" ? styles.active : ""}`}
              href='/#services'
              scroll={false}
              onClick={() => handleClickToSection("services")}>
              Compétences
            </Link>
          </li>

          <li className={`${styles.nav__li}  `}>
            <Link
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "portfolio" ? styles.active : ""}`}
              href='/#portfolio'
              scroll={false}
              onClick={() => handleClickToSection("portfolio")}>
              Portfolio
            </Link>
          </li>

          <li className={`${styles.nav__li}  `}>
            <Link
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "avis" ? styles.active : ""}`}
              href='/#avis'
              scroll={false}
              onClick={() => handleClickToSection("avis")}>
              Avis
            </Link>
          </li>

          <li className={`${styles.nav__li}`}>
            <Link
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "contact" ? styles.active : ""}`}
              href='/#contact'
              scroll={false}
              onClick={() => handleClickToSection("contact")}>
              Contact
            </Link>
          </li>

          {session?.user.role === "admin" ? (
            <li className={`${styles.nav__li}`}>
              <Link
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                } ${activeSection === "dashboard" ? styles.active : ""}`}
                onClick={() => handleClickToDashboard()}
                href='/dashboard'
                scroll={false}>
                Dashboard
              </Link>
            </li>
          ) : (
            ""
          )}

          <li className={`${styles.nav__li}  `}>
            {session ? (
              <Link
                href={""}
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                }`}
                onClick={() => {
                  handleSignOut();
                }}>
                Sign Out
              </Link>
            ) : (
              <Link
                href={""}
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                }`}
                onClick={() => {
                  handleClickConnexion();
                }}>
                Sign In
              </Link>
            )}
          </li>
        </ul>
        <div
          className={`${styles.burger}`}
          onClick={() => {
            handleClickBurger();
          }}>
          <div
            className={`${styles.burger_item} ${isBurger ? styles.item1_on : ""}`}></div>
          <div
            className={`${styles.burger_item} ${isBurger ? styles.item2_on : ""}`}></div>
          <div
            className={`${styles.burger_item} ${isBurger ? styles.item3_on : ""}`}></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
