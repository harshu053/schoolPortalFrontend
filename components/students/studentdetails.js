import React, { useState, useEffect } from "react";
import styles from "./studentdetails.module.scss";
import Spinner from "../spinner/spinner";
import { apibaseUrl } from "@/utils/utils";
import { useAuth } from "@/contexts/AuthContext";
import { updateStudentService } from "@/services/studentsServices";

const StudentDetails = ({ student, onSave }) => {
  const [section, setSection] = useState("contactInfo");
  const [detail, setDetail] = useState("parentInfo");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user}=useAuth();
  const schoolId=user?.schoolId;
  // Local state for editable fields
  const [formData, setFormData] = useState({});

  useEffect(() => { 
    setFormData(student);
    setLoading(false);
  }, [student]);

  // Handle input changes
  const handleChange = (e, path) => {
    const value = e.target.value;
    // Deep update for nested fields
    setFormData((prev) => {
      const newData = { ...prev };
      if (path.length === 1) {
        newData[path[0]] = value;
      } else if (path[0] === "professionalInfo") {
        if (path[1] === "experience") {
          newData.professionalInfo.experience[0][path[2]] = value;
        } else if (path[1] === "qualification") {
          newData.professionalInfo.qualification[0][path[2]] = value;
        } else {
          newData.professionalInfo[path[1]] = value;
        }
      } else if (path[0] === "contactInfo") {
        if (path[1] === "address") {
          newData.contactInfo.address[path[2]] = value;
        } else {
          newData.contactInfo[path[1]] = value;
        }
      }
      return newData;
    });
  };

  // Save handler
  const handleSave = () => {
    setIsEditing(false); 
    if(schoolId && student.studentId) updateStudentService(schoolId, student.studentId, formData);
    
    if (onSave) {
      onSave(formData);
    } 
  };

  return (
    <div>
      {!loading ? (
        <div className={styles.wrapper}>
          <div className={styles.topCard}>
            <div className={styles.profileImage}>
              <img src="/image.jpg" alt="Profile" />
            </div>
            <div className={styles.infoSection}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData?.name || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["name"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Student ID</label>
                <input
                  type="text"
                  value={formData?.studentId || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["studentId"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Roll Number</label>
                <input
                  type="text"
                  value={formData?.rollNumber || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["rollNumber"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Class</label>
                <input
                  type="text"
                  value={formData?.class || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["class"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Section</label>
                <input
                  type="text"
                  value={formData?.section || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["section"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData?.dateOfBirth ? formData.dateOfBirth.slice(0,10) : ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["dateOfBirth"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={formData?.gender || ""}
                    onChange={(e) => handleChange(e, ["gender"])}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData?.gender || ""}
                    readOnly
                  />
                )}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              {isEditing ? (
                <button className={styles.editBtn} onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button
                  className={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.title}>Contact Information</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="text"
                  value={formData?.contactInfo?.email || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["contactInfo", "email"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone</label>
                <input
                  type="text"
                  value={formData?.contactInfo?.phone || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["contactInfo", "phone"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Street</label>
                <input
                  type="text"
                  value={formData?.contactInfo?.address?.street || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["contactInfo", "address", "street"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>City</label>
                <input
                  type="text"
                  value={formData?.contactInfo?.address?.city || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["contactInfo", "address", "city"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>State</label>
                <input
                  type="text"
                  value={formData?.contactInfo?.address?.state || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["contactInfo", "address", "state"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Pincode</label>
                <input
                  type="text"
                  value={formData?.contactInfo?.address?.pinCode || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["contactInfo", "address", "pinCode"])}
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.title}>Parent Information</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Father's Name</label>
                <input
                  type="text"
                  value={formData?.parentInfo?.fatherName || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["parentInfo", "fatherName"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Mother's Name</label>
                <input
                  type="text"
                  value={formData?.parentInfo?.motherName || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["parentInfo", "motherName"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Guardian Contact</label>
                <input
                  type="text"
                  value={formData?.parentInfo?.guardianContact || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["parentInfo", "guardianContact"])}
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.title}>Academic Information</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Previous School</label>
                <input
                  type="text"
                  value={formData?.academicInfo?.previousSchool || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["academicInfo", "previousSchool"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Academic Year</label>
                <input
                  type="text"
                  value={formData?.academicInfo?.academicYear || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["academicInfo", "academicYear"])}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Admission Date</label>
                <input
                  type="date"
                  value={formData?.academicInfo?.admissionDate ? formData.academicInfo.admissionDate.slice(0,10) : ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, ["academicInfo", "admissionDate"])}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner showSpinner={loading} />
      )}
    </div>

  );
};

export default StudentDetails;
