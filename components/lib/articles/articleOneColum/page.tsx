import React from "react";
import styles from "./ArticleOneColum.module.css";

const ArticleOneColum = ({ addClass, children }) => {
  return <article className={`${styles.ctn} ${addClass}`}>{children}</article>;
};

export default ArticleOneColum;
