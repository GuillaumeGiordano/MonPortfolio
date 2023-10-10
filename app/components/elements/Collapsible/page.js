import { useState, useEffect } from "react";
import styles from "./Collapsible.module.css";
import Image from "next/image";

const Collapsible = ({ key, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    if (data) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data, isData]);

  console.log(data.slogan);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  if (!isData) {
    console.log("ca ne marche pas CarService !");
    return null;
  }
  // return;
  return (
    // <>
    <div key={key} className={`${styles.collapsible} ${isOpen ? styles.open : ""}`}>
      <div
        key={key}
        className={styles.header}
        onClick={() => {
          toggleCollapsible();
        }}>
        <Image
          src={`/icones/${data.imagePath}`}
          alt='icone'
          className={`${styles.img}`}
          width={90}
          height={90}
        />
        <div className={`${styles.infos}`}>
          <h3 key={key}>{data.slogan}</h3>
          <div className={`${styles.tags}`}>
            {data.langages.map((path, index) => (
              <Image
                key={index}
                src={`/icones/techno/${path}`}
                alt='Tag'
                className={`${styles.tag}`}
                width={40}
                height={40}
              />
            ))}
          </div>
        </div>
        <span key={key} className={isOpen ? styles.iconOpen : styles.iconClosed}>
          +
        </span>
      </div>

      {isOpen && (
        <div key={key} className={styles.content}>
          {data.content}
        </div>
      )}
    </div>
    // </>
  );
};

export default Collapsible;
