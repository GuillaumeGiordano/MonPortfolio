"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// STYLES
import styles from "./ServiceCollapse.module.css";
// LIB
import Collapse from "@components/lib/elements/collapse/page";

const ServiceCollapse = ({ data }) => {
  // VARIABLES
  const [isOpen, setIsOpen] = useState(false);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    if (data) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [data, isData]);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  if (!isData) {
    return null;
  }

  const serviceHeader = (
    <>
      <div className={`${styles.ctn_img}`}>
        <Image
          src={`${data.imagePath}`}
          alt='icone'
          className={`${styles.img}`}
          width={80}
          height={80}
        />
      </div>

      <div className={`${styles.infos}`}>
        <h3 className={`${styles.titre}`}>{data.slogan}</h3>
      </div>
    </>
  );

  const serviceContent = (
    <>
      {data.content.map((item: string, index: number) => (
        <div className={`${styles.service}`} key={index}>
          {item}
        </div>
      ))}
    </>
  );

  return <Collapse header={serviceHeader} content={serviceContent} />;
};

export default ServiceCollapse;
