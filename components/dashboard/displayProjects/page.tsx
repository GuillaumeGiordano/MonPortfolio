"use client";

import React from "react";
import styles from "./DisplayProjects.module.css";
import Image from "next/image";
import { IProject } from "@types";

const DisplayProjects = ({ allProjects, handleEditProject, handleDeleteProject }) => {
  return (
    <>
      <table className={`${styles.table}`}>
        <thead className={`${styles.thead}`}>
          <tr className={`${styles.tr}`}>
            <th className={`${styles.th}`}>Image</th>
            <th className={`${styles.th}`}>Title</th>
            <th className={`${styles.th} ${styles.th__display}`}>Description</th>
            <th className={`${styles.th}`}>Actions</th>
          </tr>
        </thead>
        <tbody className={`${styles.tbody}`}>
          {allProjects?.map((item: IProject) => (
            <tr key={item._id} className={`${styles.tr}`}>
              <td className={`${styles.td}`}>
                <Image src={item.image} alt={item.title} width={80} height={80} />
              </td>
              <td className={`${styles.td}`}>{item.title}</td>
              <td className={`${styles.td} ${styles.th__display}`}>{item.description}</td>
              <td className={`${styles.td}`}>
                <span
                  className={`${styles.button}`}
                  onClick={() => handleEditProject(item)}>
                  <Image
                    src={"/icones/icones/editer.svg"}
                    alt='icone modifier'
                    width={40}
                    height={40}
                  />
                </span>
                <span
                  className={`${styles.button}`}
                  onClick={() => handleDeleteProject(item)}>
                  <Image
                    src={"/icones/icones/supprimer-le-document.svg"}
                    alt='icone modifier'
                    width={40}
                    height={40}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DisplayProjects;
