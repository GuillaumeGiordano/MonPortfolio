"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// STYLE
import styles from "./Header.module.css";
// CONTEXTES
import { useThemeContext } from "../../context/theme";
import { useLoginModalContext } from "../../context/loginForm";
// COMPONENTS
import ScrollProgressBar from "../../components/elements/scrollProgressBar/page";
import Logo from "../../components/elements/logo/page";
import SwitchTheme from "../../components/buttons/buttonSwitchTheme/page";

import scrollToSection from "../../util/scrollToSection";

const Header = () => {
  const { data: session } = useSession();

  const { isLightTheme } = useThemeContext();
  const { toggleModal } = useLoginModalContext();

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
        const offset = 60;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;

        if (
          scrollY + offset >= sectionTop &&
          scrollY < sectionTop + sectionHeight + offset
        ) {
          active = section.getAttribute("data-id");
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

  const handleClickToSection = (sectionId) => {
    scrollToSection(sectionId);
    handleClickBurger();
  };

  const handleClickConnexion = () => {
    handleClickBurger();
    toggleModal();
  };

  return (
    <header
      className={`${styles.header} ${scrolling ? styles.scrolledBackground : ""} ${
        isLightTheme ? styles.header__dark : styles.header__light
      }`}
      id='header'>
      <ScrollProgressBar />

      <div className={styles.logo}>
        <SwitchTheme />
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
          {session ? (
            <li className={`${styles.nav__li}`}>
              <Link
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                } ${activeSection === "dashboard" ? styles.active : ""}`}
                href='/dashboard'
                scroll={false}>
                Dashboard
              </Link>
            </li>
          ) : (
            ""
          )}

          <li className={`${styles.nav__li}  `}>
            <button
              className={`${styles.link} ${
                isLightTheme ? styles.link__light : styles.link__dark
              } ${activeSection === "connexion" ? styles.active : ""}`}
              href='#'
              onClick={() => {
                handleClickConnexion();
              }}>
              {session ? "Signe Out" : "Signe IN"}
            </button>
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
