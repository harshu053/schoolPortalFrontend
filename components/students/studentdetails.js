import React, { useState, useEffect } from "react";
import styles from "./studentdetails.module.scss";
import Spinner from "../spinner/spinner";
import { apibaseUrl } from "@/utils/utils";
import { useAuth } from "@/contexts/AuthContext";
import { updateStudentService } from "@/services/studentsServices";
import { useAcademicYear } from "@/contexts/academicYearContext";

const StudentDetails = ({ student, onSave }) => { 

  const {academicYearId}=useAcademicYear();
  const [section, setSection] = useState("contactInfo");
  const [detail, setDetail] = useState("parentInfo");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  // Local state for editable fields
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(student);
    setLoading(false);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Save handler
  const handleSave = () => {
    setIsEditing(false);
    if (schoolId && student.studentId && academicYearId){
      const payload = { 
          academicYearId, 
          schoolId, 
          studentId: student?.studentId, 
          data:formData 
        };
      updateStudentService(payload);
    }

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
                  name="studentName"
                  value={formData?.studentName || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData?.studentId || ""}
                  readOnly={true}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData?.rollNumber || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Class</label>
                <input
                  type="text"
                  name="className"
                  value={formData?.className || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData?.section || ""}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={
                    formData?.dob
                      ? formData.dob.slice(0, 10)
                      : ""
                  }
                  readOnly={!isEditing}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={formData?.gender || ""}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <input name="gender" type="text" value={formData?.gender || ""} readOnly />
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

           
          <div className={styles.deatilsConatiner}>
            <div className={styles.card}>

              {/* Identification */}
              <h2 className={styles.title}>Identification</h2>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Caste</label>
                  <input
                    type="text"
                    name="caste"
                    value={formData?.caste || ""}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Sub Caste</label>
                  <input
                    type="text"
                    name="subCaste"
                    value={formData?.subCaste || ""}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Religion</label>
                  <input
                    type="text"
                    name="religion"
                    value={formData?.religion|| ""}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Aadhar No.</label>
                  <input
                    type="text"
                    name="aadhar"
                    value={formData?.aadhar || ""}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Pan Card No.</label>
                  <input
                    type="text"
                    name="panCard"
                    value={formData?.panCard || ""}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Aapar Id</label>
                  <input
                    type="text"
                    name="aaparId"
                    value={formData?.aaparId|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>sssm.F.Id</label>
                  <input
                    type="text"
                    name="sssmFid"
                    value={formData?.sssmFid|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>sssm.C.Id</label>
                  <input
                    type="text"
                    name="sssmCid"
                    value={formData?.sssmCid|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
              </div>
            </div>
            {/* Parent Information */}
            <div className={styles.card}>
              <h2 className={styles.title}>Parent Information</h2>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData?.fatherName || ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Father's Occupation</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData?.fatherOccupation || ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Father's Education</label>
                  <input
                    type="text"
                    name="fatherEducation"
                    value={formData?.fatherEducation || ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData?.motherName || ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Mother's Occupation</label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData?.motherOccupation|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Guardian Contact</label>
                  <input
                    type="text"
                    name="fatherMobile"
                    value={formData?.fatherMobile|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Mother's Education</label>
                  <input
                    type="text"
                    name="motherEducation"
                    value={formData?.motherEducation|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Home Contact</label>
                  <input
                    type="text"
                    name="homeContact"
                    value={formData?.homeContact|| ""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
              </div>
            </div>


            {/* Academic Information */}
            <div className={styles.card}>
              <h2 className={styles.title}>Academic Information</h2>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Previous School</label>
                  <input
                    type="text"
                    value={""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Academic Year</label>
                  <input
                    type="text"
                    value={""}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Admission Date</label>
                  <input
                    type="date"
                    value={ ""
                    }
                    readOnly={!isEditing}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                </div>
              </div>
            </div>
            
            {/* Fee Details */}
            <div className={styles.card}>
              <h2 className={styles.title}>Fee Details</h2>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Total amount</label>
                  <input
                    type="text"
                    value={formData?.fee?.[0].totalFee}
                    readOnly={true}
                    // onChange={(e) =>
                    //   handleChange(e)
                    // }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Paid Amount</label>
                  <input
                    type="text"
                    value= {formData?.fee?.[0].paidFee}
                    readOnly={true}
                    // onChange={(e) =>
                    //   handleChange(e)
                    // }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Pending Amount</label>
                  <input
                    type="text"
                    value={formData?.fee?.[0].pendingFee}
                    readOnly={true}
                    // onChange={(e) =>
                    //   handleChange(e)
                    // }
                  />
                </div>
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
