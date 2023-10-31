import React from "react";
// STYLES
import styles from "./ArticleTreeColums.module.css";

const ArticleTreeColums = ({ articleOne, articleTwo, articleTree, addClass }) => {
  return (
    <div className={`${styles.ctn} ${addClass}`}>
      <article className={`${styles.article} ${styles.articleOne}`}>{articleOne}</article>
      <article className={`${styles.article} ${styles.articleTwo}`}>{articleTwo}</article>
      <article className={`${styles.article} ${styles.articleTree}`}>
        {articleTree}
      </article>
    </div>
  );
};

export default ArticleTreeColums;
