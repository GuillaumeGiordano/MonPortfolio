"use client";

import { useState, useEffect } from "react";
// STYLE
import styles from "./Text.module.css";
// FONCTION
import generateRandomSpeed from "../../../util/generateRandomSpeed";

export default function TypingAndErasing({ wordToTypeAndErase }) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  //   MON CURSOR
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prevCursorVisible) => !prevCursorVisible);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, [cursorVisible]);

  // WRITING
  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentText = wordToTypeAndErase[currentTextIndex];
      const maxiLenght = currentText.length;

      if (isTyping) {
        setText((prevText) => prevText + currentText[currentIndex]);
        setCurrentIndex(currentIndex + 1);

        if (currentIndex === maxiLenght - 1) {
          setIsTyping(false);
        }
      }

      if (!isTyping) {
        setText((prevText) => prevText.slice(0, -1));

        if (text === "") {
          setCurrentTextIndex((currentTextIndex + 1) % wordToTypeAndErase.length);
          setCurrentIndex(0);
          setIsTyping(true);
        }
      }
    }, generateRandomSpeed(200, 800));

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, currentIndex, currentTextIndex, wordToTypeAndErase, isTyping]);

  return (
    <div className={styles.ctn}>
      {text} {cursorVisible && <div className={styles.cursor}></div>}
    </div>
  );
}
