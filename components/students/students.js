import React from "react";  
import StudentCard from "../students/studentCard";
import styles from "../students/students.module.scss"; 

const StudentsMain = ({studentData}) => {
  

  const handleDetails = (student) => {
    // Show more details modal or navigate
    alert(`Show more details for ${student.name}`);
  };

  return ( 
      <div className={styles.container}> 
        <div className={styles.studentsContainer}>
          {studentData.length === 0 ? (
            <div>No students found.</div>
          ) : (
            studentData.map((student) => (
              <StudentCard
                key={student._id || student.name}
                student={student}
                onDetails={handleDetails}
              />
            ))
          )}
        </div>
      </div> 
  );
};

export default StudentsMain;
