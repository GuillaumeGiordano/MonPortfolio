import React, { useState } from "react";
import styles from "./Tab.module.css";

const Tab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className={styles.tab__buttons}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? `${styles.active}` : ""}
            onClick={() => handleTabClick(index)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tab__content}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tab;
