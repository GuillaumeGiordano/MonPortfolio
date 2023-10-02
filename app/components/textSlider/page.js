import { useState, useEffect } from "react";
import styles from "./textSlider.module.css";

export default function TypingAndErasing() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const wordToTypeAndErase = ["Guillaume.", "Développeur.", "Entrepreneur."];

  //   1
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prevCursorVisible) => !prevCursorVisible);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, [cursorVisible]);

  // 2
  useEffect(() => {
    const generateRandomSpeed = () => {
      return Math.floor(Math.random() * (800 - 100 + 1)) + 100;
    };

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
    }, generateRandomSpeed());

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, currentIndex, currentTextIndex]);

  return (
    <>
      {text} {cursorVisible && <span className={styles.cursor}>|</span>}
    </>
  );
}
