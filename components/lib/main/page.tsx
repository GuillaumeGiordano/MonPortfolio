// STYLE
import styles from "./Main.module.css";

const Main = ({ children, addClass }) => {
  return <main className={`${styles.main} ${addClass}`}>{children}</main>;
};

export default Main;
