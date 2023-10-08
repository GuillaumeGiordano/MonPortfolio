import styles from "./scrollToDown.module.css";
// UTIL
import scrollPosition from "@/app/util/scrollPosition";

const ScrollToDown = () => {
  return (
    <div
      className={styles.container_mous}
      onClick={() => {
        scrollPosition(900);
      }}>
      <span className={styles.mouse_btn}>
        <span className={styles.mouse_scroll}></span>
      </span>
    </div>
  );
};

export default ScrollToDown;