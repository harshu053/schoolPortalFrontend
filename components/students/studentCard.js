import React from "react";
import styles from "./studentCard.module.scss";

const StudentCard = ({ student, onDetails }) => {
  return (
    <div className={styles.studentCard}>
      <img
        src={student.image || "/image.jpg"}
        alt={student.name}
        className={styles.studentImage}
      />
      <div className={styles.studentName}>{student.name}</div>
      <div className={styles.studentClass}>Class: {student.class || "-"}</div>
      <button className={styles.detailsButton} onClick={() => onDetails(student)}>
        More Details
      </button>
    </div>
  );
};

export default StudentCard;
