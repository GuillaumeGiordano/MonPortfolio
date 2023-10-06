import { useEffect } from "react";
import styles from "./scrollProgressBar.module.css";

function ScrollProgressBar() {
  useEffect(() => {
    const handleScrollProgressBar = () => {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");

      if (header && footer) {
        header.classList.add("shadowHeader");
        footer.classList.add("shadowFooter");

        setTimeout(() => {
          header.classList.remove("shadowHeader");
          footer.classList.remove("shadowFooter");
        }, 1000);
      }

      const page = document.documentElement; // Element HTML
      const totalHeight = page.scrollHeight; // Height Total of page
      const visibleHeight = page.clientHeight; // Height visible
      const scrolling = page.scrollTop; // Size of scroll
      const max = totalHeight - visibleHeight;

      const progressBar = document.getElementById("progressBar");

      if (progressBar) {
        progressBar.style.width = Math.floor((scrolling / max) * 100) + "%"; // Width in %

        if (progressBar.style.width === "100%") {
          progressBar.style.backgroundColor = "green";
        } else {
          progressBar.style.backgroundColor = "rgb(192, 127, 6)";
        }
      }
    };

    window.addEventListener("scroll", handleScrollProgressBar);

    return () => {
      window.removeEventListener("scroll", handleScrollProgressBar);
    };
  }, []);

  return (
    <div className={styles.progressBar_container}>
      <div className={styles.progressBar} id='progressBar'></div>
    </div>
  );
}

export default ScrollProgressBar;
