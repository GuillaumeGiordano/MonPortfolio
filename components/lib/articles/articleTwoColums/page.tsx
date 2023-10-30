import React from "react";
import styles from "./ArticleTwoColums.module.css";

const ArticleTwoColums = ({ articleOne, articleTwo, addClass }) => {
  return (
    <div className={`${styles.ctn} ${addClass}`}>
      <article className={`${styles.articleOne}`}>{articleOne}</article>
      <article className={`${styles.articleTwo}`}>{articleTwo}</article>
    </div>
  );
};

export default ArticleTwoColums;
