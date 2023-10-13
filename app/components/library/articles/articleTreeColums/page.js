import React from "react";
import styles from "./ArticleTreeColums.module.css";

const ArticleTreeColums = ({ articleOne, articleTwo, articleTree, className }) => {
  return (
    <div className={`${styles.ctn} ${className}`}>
      <article className={`${styles.article} ${styles.articleOne}`}>{articleOne}</article>
      <article className={`${styles.article} ${styles.articleTwo}`}>{articleTwo}</article>
      <article className={`${styles.article} ${styles.articleTree}`}>
        {articleTree}
      </article>
    </div>
  );
};

export default ArticleTreeColums;
