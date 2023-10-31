"use client";

import React, { useState, useEffect } from "react";
// STYLES
import styles from "./Tab.module.css";

const Tab = ({ tabs }) => {
  // VARIABLES
  const [activeTab, setActiveTab] = useState(0);
  const [isDataTabs, setIsDataTabs] = useState(false);
  // HANDLES METHODES
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const size = tabs.length;

    if (tabs && size > 0) {
      setIsDataTabs(true);
    } else {
      setIsDataTabs(false);
    }
  }, [tabs]);

  return (
    <div>
      <div className={styles.tab__buttons}>
        {isDataTabs &&
          tabs.map((tab, index) => (
            <button
              key={index}
              className={index === activeTab ? `${styles.active}` : ""}
              onClick={() => handleTabClick(index)}>
              {tab.label}
            </button>
          ))}
      </div>
      {isDataTabs && <div className={styles.tab__content}>{tabs[activeTab].content}</div>}
    </div>
  );
};

export default Tab;
