import React, { useState } from "react";
import styles from "./teacher.module.css";

const TeacherDetail = ({ teacher, onClose }) => {
  console.log(teacher);
  const [section, setSection] = useState("experience");
  const [detail, setDetail] = useState("contact-Deatils");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topCard}>
        <div className={styles.profileImage}>
          <img src="/image.jpg" alt="Profile" />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.inputGroup}>
            <label>Employee ID</label>
            <input type="text" value={teacher?.employeeId } readOnly={!isEditing} />
          </div>
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <input type="text" value={teacher?.gender } readOnly={!isEditing} />
          </div>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" value={teacher?.name} readOnly={!isEditing} />
          </div>
          <div className={styles.inputGroup}>
            <label>DOB</label>
            <input type="text" value={teacher?.dateOfBirth} readOnly={!isEditing} />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.editBtn}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button className={styles.deleteBtn}>Delete</button>
        </div>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Professional Information</h1>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tab} ${
              section === "experience" ? styles.activeTab : ""
            }`}
            onClick={() => setSection("experience")}
          >
            Experience
          </button>
          <button
            className={`${styles.tab} ${
              section === "currentposition" ? styles.activeTab : ""
            }`}
            onClick={() => setSection("currentposition")}
          >
            Current Position
          </button>
          <button
            className={`${styles.tab} ${
              section === "qualification" ? styles.activeTab : ""
            }`}
            onClick={() => setSection("qualification")}
          >
            Qualification
          </button>
        </div>

        {section === "experience" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>From Year</label>
              <input readOnly={!isEditing} value={teacher?.professionalInfo?.experience?.[0].fromYear} />
            </div>

            <div className={styles.inputGroup}>
              <label>To Year</label>
              <input readOnly={!isEditing} value={teacher?.professionalInfo?.experience?.[0].toYear} />
            </div>

            <div className={styles.inputGroup}>
              <label>Institution Name</label>
              <input readOnly={!isEditing} value={teacher?.professionalInfo?.experience?.[0].institution} />
            </div>

            <div className={styles.inputGroup}>
              <label>Position</label>
              <input readOnly={!isEditing} value={teacher?.professionalInfo?.experience?.[0].position}  />
            </div>
          </div>
        )}

        {section === "currentposition" && (
          <div className={styles.inputGroup}>
            <label>Current Position</label>
            <input readOnly={!isEditing} value={teacher?.professionalInfo?.currentPosition} />
          </div>
        )}

        {section === "qualification" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Institute Name</label>
              <input readOnly={!isEditing} value={teacher?.professionalInfo?.qualification?.[0].institution} />
            </div>

            <div className={styles.inputGroup}>
              <label>Degree Name</label>
              <input readOnly={!isEditing}  value={teacher?.professionalInfo?.qualification?.[0].degree} />
            </div>

            <div className={styles.inputGroup}>
              <label>Specialization</label>
              <input readOnly={!isEditing}  value={teacher?.professionalInfo?.qualification?.[0].specialization}/>
            </div>

            <div className={styles.inputGroup}>
              <label>Year Of Completion</label>
              <input readOnly={!isEditing}  value={teacher?.professionalInfo?.qualification?.[0].yearOfCompletion}/>
            </div>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>Other Information</h2>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tab} ${
              detail === "contact-Deatils" ? styles.activeTab : ""
            }`}
            onClick={() => setDetail("contact-Deatils")}
          >
            Contact details
          </button>

          <button
            className={`${styles.tab} ${
              detail === "bank-details" ? styles.activeTab : ""
            }`}
            onClick={() => setDetail("bank-details")}
          >
            Bank details
          </button>
        </div>

        {detail == "contact-Deatils" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="text" readOnly={!isEditing} value={teacher?.contactInfo?.Email} />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input type="text" readOnly={!isEditing} value={teacher?.contactInfo?.phone} />
            </div>
            <div className={styles.inputGroup}>
              <label>Landmark</label>
              <input type="text" readOnly={!isEditing} value={teacher?.contactInfo?.address?.street}/>
            </div>
            <div className={styles.inputGroup}>
              <label>City</label>
              <input type="text" readOnly={!isEditing}value={teacher?.contactInfo?.address?.city} />
            </div>
            <div className={styles.inputGroup}>
              <label>Pincode</label>
              <input type="text" readOnly={!isEditing}value={teacher?.contactInfo?.address?.pinCode} />
            </div>
            <div className={styles.inputGroup}>
              <label>State</label>
              <input type="text" readOnly={!isEditing} value={teacher?.contactInfo?.address?.state}/>
            </div>
            <div className={styles.inputGroup}>
              <label>Country</label>
              <input type="text" readOnly={!isEditing} value={teacher?.contactInfo?.address?.country}/>
            </div>
          </div>
        )}

        {detail == "bank-details" && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Bank Name</label>
              <input type="text" readOnly={!isEditing} />
            </div>
            <div className={styles.inputGroup}>
              <label>Account Number</label>
              <input type="text" readOnly={!isEditing} />
            </div>
            <div className={styles.inputGroup}>
              <label>IFSC Code</label>
              <input type="text" readOnly={!isEditing} />
            </div>
            <div className={styles.inputGroup}>
              <label>Account Type</label>
              <input type="text" readOnly={!isEditing} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDetail;
