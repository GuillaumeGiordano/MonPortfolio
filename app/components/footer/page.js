import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} id='footer'>
      {/* &copy;<a href="mailto:gcc.giordano@gmail.com">Guillaume Giordano</a> - All right Reserved  */}
      Portfolio - by &copy; <a href='#'>Guillaume Giordano</a> - All right Reserved
    </footer>
  );
};

export default Footer;
