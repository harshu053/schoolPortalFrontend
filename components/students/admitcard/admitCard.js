import React from "react";
import styles from "./admitCard.module.scss";
import { useAuth } from "@/contexts/AuthContext";


const AdmitCard = ({ student }) => {
     
  const { user,schoolDeatils } = useAuth();  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={schoolDeatils?.schoolLogo || "/school-logo.png"} alt="School Logo" className={styles.logo} />
        <div className={styles.schoolname}>{schoolDeatils?.schoolName || "School Name"}</div>
        <div className={styles.schooladdress}>{schoolDeatils?.address?.city},{schoolDeatils?.address?.state},{user?.address?.pinCode}</div>
      </div>
      <h2 className={styles.title}>Admit Card</h2>
      <div className={styles.cardbody}>
        <div className={styles.left}>
          <img src={student?.studentImageUrl || "/image.jpg"} alt="Student" className={styles.studentphoto} />
        </div>
        <div className={styles.right}>
          <div><strong>Name:</strong> {student?.name}</div>
          <div><strong>Roll No:</strong> {student?.rollNumber || "N/A"}</div>
          <div><strong>Class:</strong> {student?.class} {student?.section}</div> 
          <div><strong>Father's Name:</strong> {student?.parentInfo?.fatherName || "N/A"}</div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.signatureBlock}>
          <div>Teacher's Signature</div>
          <div className={styles.signatureLine}></div>
        </div>
        <div className={styles.signatureBlock}>
          <div>Student's Signature</div>
          <div className={styles.signatureLine}></div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCard;
