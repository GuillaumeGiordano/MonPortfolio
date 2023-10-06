"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// STYLE
import styles from "./header.module.css";
// CONTEXTE
import { useThemeContext } from "@/app/context/theme";
// COMPONENT
import ScrollProgressBar from "../scrollProgressBar/page";
import Logo from "../logo/page";
import SwitchTheme from "../switchTheme/page";
// FUNCTION
import scrollToSection from "@/app/util/scrollToSection";

const Header = () => {
  const { isLightTheme } = useThemeContext();
  const [scrolling, setScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
  }, []);

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

  return (
    <>
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
          <ul className={styles.nav__ul}>
            <li className={`${styles.nav__li}  `}>
              <Link
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                } ${activeSection === "head" ? styles.active : ""}`}
                href='/'>
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
                onClick={() => scrollToSection("about")}>
                About
              </Link>
            </li>

            <li className={`${styles.nav__li}  `}>
              <Link
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                } ${activeSection === "services" ? styles.active : ""}`}
                href='/#services'
                scroll={false}
                onClick={() => scrollToSection("services")}>
                Services
              </Link>
            </li>

            <li className={`${styles.nav__li}  `}>
              <Link
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                } ${activeSection === "portfolio" ? styles.active : ""}`}
                href='/#portfolio'
                scroll={false}
                onClick={() => scrollToSection("portfolio")}>
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
                onClick={() => scrollToSection("contact")}>
                Contact
              </Link>
            </li>

            <li className={`${styles.nav__li}  `}>
              <Link
                className={`${styles.link} ${
                  isLightTheme ? styles.link__light : styles.link__dark
                } ${activeSection === "connexion" ? styles.active : ""}`}
                href='/'>
                Connexion
              </Link>
            </li>
          </ul>

          {/* <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href='/'>
            Home
          </Link> */}

          {/* <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href='#about'>
            About
          </Link> */}

          {/* <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href='#services'>
            Services
          </Link> */}

          {/* <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href=''>
            Portfolio
          </Link> */}

          {/* <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href='/contact'>
            contact
          </Link> */}

          {/* <Link
            className={`${styles.link} ${
              isLightTheme ? styles.link__light : styles.link__dark
            }`}
            href=''>
            Connexion
          </Link> */}
        </nav>
      </header>
    </>
  );
};

export default Header;
