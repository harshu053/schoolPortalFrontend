import React, { useEffect, useState } from "react";
import styles from "./classFee.module.scss";
import {
  addFeesByClassWise,
  deleteFeesStruture,
  getFeesByClasswise,
  updateFeesByClassWise,
} from "@/services/feesSevices";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/icon/icon";
import { useAcademicYear } from "@/contexts/academicYearContext";

const ClassWiseFeeForm = () => {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const {academicYearId}=useAcademicYear();

  const [numClasses, setNumClasses] = useState(null);
  const [newFeeStructure, setNewFeeStructure] = useState(false);
  const [classes, setClasses] = useState([]);
  const [feeStructure, setFeeStructure] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Fee Structure from DB
  useEffect(() => {
    if (!schoolId) return;
    const fetchData = async () => {
      const data = await getFeesByClasswise(schoolId);
      setFeeStructure(data?.classWiseFees);
    };
    fetchData();
  }, [schoolId]);

 
  const handleNumClassesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumClasses(value);
    setClasses(
      Array(value).fill({
        className: styles.tableInput,
        fees: styles.tableInput,
      })
    );
  };

  const handleChange = (index, field, value) => {
    const updated = [...classes];
    updated[index] = { ...updated[index], [field]: value };
    setClasses(updated);
  };

  const handleEditChange = (index, field, value) => { 
    const updated = [...feeStructure];
    updated[index] = { ...updated[index], [field]: value };
    setFeeStructure(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (schoolId && academicYearId) {
      const payload = { schoolId, classes,academicYearId }; 
      const res = await addFeesByClassWise(payload);
      setNewFeeStructure(false);
      setFeeStructure(classes);
    }
  };

  const handleUpdate = async () => {
    if (schoolId) {
      const payload = { schoolId, classes: feeStructure };
      const res = await updateFeesByClassWise(payload); 
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (schoolId) {
      const data = await deleteFeesStruture(schoolId); 
      setNewFeeStructure(true);
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* EXISTING FEE STRUCTURE */}
      {!newFeeStructure &&
        (feeStructure?.length === 0 ? (
          <div>No Fee Structure Found.</div>
        ) : (
          <div className={styles.exitFeeContainer}>
            <div className={styles.actionContainer}>
              <div className={styles.heading}>Class-wise Fees Structure</div>
              <div className={styles.buttonContainer}>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)}>
                    <Icon iconName="IcEdit" /> Edit Fee Structure
                  </button>
                ) : (
                  <button onClick={() => handleUpdate()}>Save Changes</button>
                )}

                <button onClick={() => setNewFeeStructure(true)}>
                  <Icon iconName="IcAdd" />
                  Create New Structure
                </button>

                <button onClick={() => handleDelete()}>
                  <Icon iconName="IcTrash" />
                  Delete Fee Structure
                </button>
              </div>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th> School Fees (₹)</th>
                    <th> Transport Fees (₹)</th>
                    <th> Hostel Fees (₹)</th>
                    <th> Total Fees (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure?.map((fee, idx) => (
                    <tr key={idx}>
                      <td>{fee.className}</td>
                      <td className={styles.amount}>
                        ₹
                        <input
                          className={
                            isEditing ? styles.enableEdit : styles.tableInput
                          }
                          type="number"
                          value={fee?.schoolFee}
                          readOnly={!isEditing}
                          onChange={(e) =>
                            handleEditChange(
                              idx,
                              "schoolFee",
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className={styles.amount}>
                        ₹
                        <input
                          className={
                            isEditing ? styles.enableEdit : styles.tableInput
                          }
                          type="number"
                          value={fee?.transportFee}
                          readOnly={!isEditing}
                          onChange={(e) =>
                            handleEditChange(
                              idx,
                              "transportFee",
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className={styles.amount}>
                        ₹
                        <input
                          className={
                            isEditing ? styles.enableEdit : styles.tableInput
                          }
                          type="number"
                          value={fee?.hostelFee}
                          readOnly={!isEditing}
                          onChange={(e) =>
                            handleEditChange(
                              idx,
                              "hostelFee",
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className={styles.amount}>
                        <div>₹{fee?.totalFee}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {/* NEW FEE STRUCTURE CREATION */}
      {newFeeStructure && (
        <div className={styles.newFeeContainer}>
          <div className={styles.row}>
            <div className={styles.heading}>Create Fee Structure</div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => setNewFeeStructure(false)}
                className={styles.saveFeeStructureBtn}
              >
                Existing Fee Structure
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label>Total Classes in School:</label>
              <input
                type="number"
                value={numClasses}
                onChange={handleNumClassesChange}
              />
            </div>

            {Array.from({ length: numClasses || 0 }, (_, i) => (
              <div
                key={i}
                className={`${styles.fieldGroup} ${styles.classRow}`}
              >
                <input
                  type="text"
                  placeholder={`Class ${i + 1} Name`}
                  value={classes[i]?.className || styles.tableInput}
                  onChange={(e) => handleChange(i, "className", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="School Fee"
                  value={classes[i]?.schoolFee || styles.tableInput}
                  onChange={(e) =>
                    handleChange(i, "schoolFee", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  placeholder="Hostel Fee"
                  value={classes[i]?.hostelFee || styles.tableInput}
                  onChange={(e) =>
                    handleChange(i, "hostelFee", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  placeholder="Transport Fees"
                  value={classes[i]?.transportFee || styles.tableInput}
                  onChange={(e) =>
                    handleChange(i, "transportFee", Number(e.target.value))
                  }
                />
              </div>
            ))}

            <button type="submit" className={styles.saveFeeStructureBtn}>
                Save Fee Structure
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassWiseFeeForm;
 
