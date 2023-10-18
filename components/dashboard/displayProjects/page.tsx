import styles from "./DisplayProjects.module.css";
import Image from "next/image";
import React from "react";
import { IProject } from "../../../types";

const DisplayProjects = ({ data, onEdit, onDelete }) => {
  return (
    <table className={`${styles.table}`}>
      <thead className={`${styles.thead}`}>
        <tr className={`${styles.tr}`}>
          <th className={`${styles.th}`}>Image</th>
          <th className={`${styles.th}`}>Title</th>
          <th className={`${styles.th}`}>Description</th>
          <th className={`${styles.th}`}>Actions</th>
        </tr>
      </thead>
      <tbody className={`${styles.tbody}`}>
        {data.map((item: IProject) => (
          <tr key={item._id} className={`${styles.tr}`}>
            <td className={`${styles.td}`}>
              {/* <Image src={item.image} alt={item.title} width='50' height='50' /> */}
            </td>
            <td className={`${styles.td}`}>{item.title}</td>
            <td className={`${styles.td}`}>{item.description}</td>
            <td className={`${styles.td}`}>
              <button className={`${styles.button}`} onClick={() => onEdit(item)}>
                Modifier
              </button>
              <button className={`${styles.button}`} onClick={() => onDelete(item)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayProjects;
