"use client";

// STYLES
import styles from "./scrollToDown.module.css";
// UTIL
import scrollToSection from "@util/scrollToSection";

const ScrollToDown = () => {
  const handleClick = () => {
    scrollToSection("about");
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
