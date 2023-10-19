import React from "react";
import styles from "./ArticleOneColum.module.css";

const ArticleOneColum = ({ className, children }) => {
  return <article className={`${styles.ctn} ${className}`}>{children}</article>;
};

export default ArticleOneColum;
