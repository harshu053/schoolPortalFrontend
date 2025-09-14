import React, { useEffect, useState } from "react";
import styles from "./pendingFees.module.scss";
import Icon from "@/components/icon/icon";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { searchStudentsService } from "@/services/studentsServices";
import { getPendingFeeStudents } from "@/services/feesSevices";
import Spinner from "../../spinner/spinner";
import { useAcademicYear } from "@/contexts/academicYearContext";

const PendingFees = ({ selectedClass, onEdit, searchQuery }) => {
  const [pendingFeesStudent, setPendingFeesStudent] = useState([]);
  const [filterData, setFilterdData] = useState([]);
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const [isLoading, setIsLoading] = useState(true);
  const {academicYearId}=useAcademicYear();

  useEffect(() => {
    if (!schoolId || !academicYearId) return;
    const fetchPendingFeeStudents = async () => {
      const payload = { schoolId, searchQuery,academicYearId };
      const data = await getPendingFeeStudents(payload);
      setPendingFeesStudent(data);
      setFilterdData(data);
      setIsLoading(false);
    };
    fetchPendingFeeStudents();
  }, [schoolId, searchQuery,academicYearId]);

  useEffect(() => {
    if (selectedClass == "Select All") { 
      setFilterdData(pendingFeesStudent);
    } else {
      const data = pendingFeesStudent?.filter(
        (student) => student.className === selectedClass
      ); 
      setFilterdData(data);
    }
    setIsLoading(false);
  }, [schoolId, selectedClass, pendingFeesStudent]);

  const handleEdit = (data) => {
    onEdit(data);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for student:", id);
    // TODO: call delete API
  };

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.heading}>Pending Students Fees</h2> */}
      {!isLoading ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Class</th>
                <th>Total Fee (₹)</th>
                <th>Paid Fee (₹)</th>
                <th>Pending Fee (₹)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* <div className={styles.tableBody}> */}
            <tbody>
              {filterData?.length > 0 ? (
                filterData.map((student, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{student.studentName}</td>
                    <td>{student.className}</td>
                    <td>{student.fee?.[0]?.totalFee || 0}</td>
                    <td>{student.fee?.[0]?.feePaid || 0}</td>
                    <td className={styles.pending}>
                      {student.fee?.[0]?.pendingFee}
                    </td>
                    <td>{student.fee?.[0]?.status || 0}</td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(student)}
                        // disabled={activeButton === "Fully Paid Students"}
                      >
                        <Icon iconName="IcEdit" />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(student._id)}
                      >
                        <Icon iconName="IcTrash" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
            {/* </div> */}
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PendingFees;
