import React from "react";
import styles from "./ArticleTwoColums.module.css";

const ArticleTwoColums = ({ articleOne, articleTwo }) => {
  return (
    <div className={`${styles.ctn}`}>
      <article className={`${styles.articleOne}`}>{articleOne}</article>
      <article className={`${styles.articleTwo}`}>{articleTwo}</article>
    </div>
  );
};

export default ArticleTwoColums;
