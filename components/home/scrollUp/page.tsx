"use client";

// STYLE
import styles from "./scrollUp.module.css";
// UTIL
import scrollToSection from "@util/scrollToSection";

const ScrollUp = () => {
  const handleClick = () => {
    scrollToSection("head");
  };

  return (
    <button
      className={`${styles.scrollToTopButton} `}
      onClick={() => {
        handleClick();
      }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        id='arrow-circle-down'
        className={styles.svg}
        viewBox='0 0 24 24'
        width='40'
        height='40'>
        <path d='M12,24A12,12,0,1,0,0,12,12.013,12.013,0,0,0,12,24ZM12,8a2.993,2.993,0,0,1,1.987.752c.327.291.637.574.84.777L17.7,12.353a1,1,0,1,1-1.4,1.426L13.42,10.95c-.188-.187-.468-.441-.759-.7a1,1,0,0,0-1.323,0c-.29.258-.57.512-.752.693L7.7,13.779a1,1,0,0,1-1.4-1.426L9.178,9.524c.2-.2.507-.48.833-.769A2.99,2.99,0,0,1,12,8Z' />
      </svg>
    </button>
  );
};

export default ScrollUp;
