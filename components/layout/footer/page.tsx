"use client";

import React from "react";
// STYLES
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} id='footer'>
      Portfolio - by &copy; <a href='#'>Guillaume Giordano</a> - All right Reserved
    </footer>
  );
};

export default Footer;
