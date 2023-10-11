import React from "react";
import styles from "./ArticleOneColum.module.css";

const ArticleOneColum = ({ children }) => {
  return <article className={`${styles.ctn}`}>{children}</article>;
};

export default ArticleOneColum;
