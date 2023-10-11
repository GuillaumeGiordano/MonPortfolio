import { useState, useEffect } from "react";
import styles from "./ServiceCollapse.module.css";
import Image from "next/image";
import Collapse from "../../library/collapse/page";

const ServiceCollapse = ({ data }) => {
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
          src={`/icones/${data.imagePath}`}
          alt='icone'
          className={`${styles.img}`}
          width={90}
          height={90}
        />
      </div>

      <div className={`${styles.infos}`}>
        <h3 className={`${styles.titre}`}>{data.slogan}</h3>
      </div>
    </>
  );

  const serviceContent = (
    <>
      {data.content.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </>
  );

  return <Collapse header={serviceHeader} content={serviceContent} />;
};

export default ServiceCollapse;
