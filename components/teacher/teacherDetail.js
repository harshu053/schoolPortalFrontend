import React, { useEffect, useState } from "react";
import styles from "./teacherDetail.module.scss";
import Spinner from "../spinner/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { updateTeacherService } from "@/services/teacherServices";
import { useAcademicYear } from "@/contexts/academicYearContext";

const TeacherDetail = ({ teacher, onClose, onSave }) => {
  const { user } = useAuth();
  const { academicYearId } = useAcademicYear();
  const [section, setSection] = useState("experience");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const schoolId = user?.schoolId;

  // Local state for editable fields
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (teacher) {
      setFormData(teacher);
      setLoading(false);
    }
  }, [teacher]);

  // Handle input changes
  const handleChange = (e, field, index, type) => {
    const value = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev };

      if (type === "education") {
        updated.education[index][field] = value;
      } else if (type === "experience") {
        updated.experience[index][field] = value;
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    if (schoolId && teacher?.employeeId && academicYearId) {
      const payload = {
        academicYearId,
        schoolId,
        employeeId: teacher?.employeeId,
        data: formData,
      };
      updateTeacherService(payload);
    }
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div>
      {!loading ? (
        <div className={styles.wrapper}>
          {/* Top Card */}
          <div className={styles.topCard}>
            <div className={styles.profileImage}>
              <img src="/image.jpg" alt="Profile" />
            </div>

            <div className={styles.infoSection}>
              <div className={styles.inputGroup}>
                <label>Employee ID</label>
                <input type="text" value={formData?.employeeId} readOnly />
              </div>

              <div className={styles.inputGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData?.name || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "name")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>DOB</label>
                <input
                  type={isEditing ? "date" : "text"}
                  value={
                    formData?.dob
                      ? new Date(formData.dob).toISOString().slice(0, 10)
                      : ""
                  }
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "dob")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={formData?.gender || ""}
                    onChange={(e) => handleChange(e, "gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input type="text" value={formData?.gender || ""} readOnly />
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Marital Status</label>
                <input
                  type="text"
                  value={formData?.maritalStatus || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "maritalStatus")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Father/Spouse Name</label>
                <input
                  type="text"
                  value={formData?.fatherOrSpouseName || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "fatherOrSpouseName")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Occupation</label>
                <input
                  type="text"
                  value={formData?.fatherOrSpouseOccupation || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "fatherOrSpouseOccupation")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Category</label>
                {isEditing ? (
                  <select
                    value={formData?.category || ""}
                    onChange={(e) => handleChange(e, "category")}
                  >
                    <option value="">-- Select --</option>
                    <option value="OBC">OBC</option>
                    <option value="SC/ST">SC/ST</option>
                    <option value="General">General</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData?.category || ""}
                    readOnly
                  />
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="text"
                  value={formData?.email || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "email")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Phone</label>
                <input
                  type="text"
                  value={formData?.phone || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "phone")}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Address</label>
                <textarea
                  value={formData?.address || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e, "address")}
                />
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

          {/* Tabs for Education & Experience */}
          <div className={styles.card}>
            <h1 className={styles.title}>Details</h1>
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
                  section === "education" ? styles.activeTab : ""
                }`}
                onClick={() => setSection("education")}
              >
                Education
              </button>
              <button
                className={`${styles.tab} ${
                  section === "subjects" ? styles.activeTab : ""
                }`}
                onClick={() => setSection("subjects")}
              >
                Subjects
              </button>
            </div>

            {/* Experience Cards */}
            {section === "experience" &&
              formData?.experience?.map((exp, idx) => (
                <div key={idx} className={styles.entryCard}>
                  <h3 className={styles.entryTitle}>Experience {idx + 1}</h3>
                  <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                      <label>Organization</label>
                      <input
                        type="text"
                        value={exp.organization}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "organization", idx, "experience")
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "role", idx, "experience")
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>From</label>
                      <input
                        type={isEditing ? "date" : "text"}
                        value={
                          exp.from
                            ? new Date(exp.from).toISOString().slice(0, 10)
                            : ""
                        }
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "from", idx, "experience")
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>To</label>
                      <input
                        type={isEditing ? "date" : "text"}
                        value={
                          exp.to
                            ? new Date(exp.to).toISOString().slice(0, 10)
                            : ""
                        }
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "to", idx, "experience")
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

            {/* Education Cards */}
            {section === "education" &&
              formData?.education?.map((edu, idx) => (
                <div key={idx} className={styles.entryCard}>
                  <h3 className={styles.entryTitle}>Education {idx + 1}</h3>
                  <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                      <label>School</label>
                      <input
                        type="text"
                        value={edu.school}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "school", idx, "education")
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "degree", idx, "education")
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Year of Passing</label>
                      <input
                        type="number"
                        value={edu.yearOfPassing}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "yearOfPassing", idx, "education")
                        }
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Percentage</label>
                      <input
                        type="number"
                        value={edu.percentage}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          handleChange(e, "percentage", idx, "education")
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Spinner showSpinner={loading} />
      )}
    </div>
  );
};

export default TeacherDetail;
