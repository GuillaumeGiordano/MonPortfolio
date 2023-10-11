"use client";

import React, { useState } from "react";

import styles from "./Collapse.module.css";

const Collapse = ({ header, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.collapse} ${isOpen ? styles.open : ""}`}>
      <div
        className={`${styles.header}`}
        onClick={() => {
          toggleCollapsible();
        }}>
        {/* ******HEADER***** */}
        <div className={`${styles.header__body}`}>{header}</div>
        {/* *********** */}
        <div className={`${styles.header__nav}`}>
          <div className={isOpen ? styles.iconOpen : styles.iconClosed}>+</div>
        </div>
      </div>
      {/* ******CONTENT***** */}
      <div className={`${styles.content}`}>{content}</div>
      {/* *********** */}
    </div>
  );
};

export default Collapse;
