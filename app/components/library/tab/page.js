"use client";

import React, { useState, useEffect } from "react";
import styles from "./Tab.module.css";

// const tabs = [
//   {
//     label: "Tab 1",
//     content: <p>Contenu du premier onglet.</p>,
//   },
//   {
//     label: "Tab 2",
//     content: <p>Contenu du deuxième onglet.</p>,
//   },
//   {
//     label: "Tab 3",
//     content: <p>Contenu du troisième onglet.</p>,
//   },
// ];

const Tab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isDataTabs, setIsDataTabs] = useState(false);

  useEffect(() => {
    const size = tabs.length;

    if (tabs && size > 0) {
      setIsDataTabs(true);
    } else {
      setIsDataTabs(false);
    }
  }, [tabs]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

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
