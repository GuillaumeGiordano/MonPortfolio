"use client";

// UTIL
import scrollToSection from "@util/scrollToSection";
// STYLES
import styles from "./scrollToDown.module.css";

const ScrollToDown = () => {
  const handleClick = () => {
    scrollToSection("about");
    console.log("clic");
  };

  return (
    <div
      className={styles.container_mous}
      onClick={() => {
        handleClick();
      }}>
      <span className={styles.mouse_btn}>
        <span className={styles.mouse_scroll}></span>
      </span>
    </div>
  );
};

export default ScrollToDown;
