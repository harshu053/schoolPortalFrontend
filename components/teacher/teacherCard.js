import React from "react";
import styles from "./teachercard.module.scss";

const TeacherCard = ({ teacher, onDetails }) => {
 

  return (
    <div className={styles.card}>
      <img
        src={teacher.image || "/image.jpg"}
        alt={teacher.name}
        className={styles.image}
      />
      <div className={styles.name}>{teacher.name}</div>
      <div className={styles.department}>{teacher.department}</div>
      <button
        className={styles.detailsBtn}
        onClick={() => onDetails && onDetails(teacher.employeeId, teacher.schoolId)}
      >
        More Details
      </button>
    </div>
  );
};

export default TeacherCard;
