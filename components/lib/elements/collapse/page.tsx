"use client";

import React, { useState, useRef } from "react";

import styles from "./Collapse.module.css";

const Collapse = ({ header, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
          <div
            className={`${styles.button} ${
              isOpen ? styles.iconOpen : styles.iconClosed
            }`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              viewBox='0 0 512 512'
              className={`${styles.svg} ${isOpen ? styles.iconOpen : styles.iconClosed}`}
              width='35'
              height='35'>
              <g>
                <path d='M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z' />
              </g>
            </svg>
          </div>
        </div>
      </div>
      {/* ******CONTENT***** */}
      <div
        ref={contentRef}
        className={`${styles.ctn_content}`}
        style={
          isOpen ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }
        }>
        <div className={`${styles.content}`}>{content}</div>
      </div>
      {/* *********** */}
    </div>
  );
};

export default Collapse;
