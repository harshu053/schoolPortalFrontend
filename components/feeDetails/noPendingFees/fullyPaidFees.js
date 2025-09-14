import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getFullyPaidStudents } from "@/services/feesSevices";
import Icon from "@/components/icon/icon";
import styles from "./fullyPaidFees.module.scss";
import Spinner from "@/components/spinner/spinner";
import { useAcademicYear } from "@/contexts/academicYearContext";

const FullyPaidFees = ({ searchQuery,selectedClass }) => {
  const { user } = useAuth();
  const {academicYearId}=useAcademicYear();
  const schoolId = user?.schoolId;
  const [fullyPaidStudents, setFullyPaidStudents] = useState([]);
  const [filterdData, setFilterdData]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!schoolId || !academicYearId) return;
    setIsLoading(true);
    const payload = { schoolId, searchQuery, academicYearId };
    const fetchFullyPaidFeeStudents = async () => {
      const data = await getFullyPaidStudents(payload);
      setFullyPaidStudents(data);
      setFilterdData(data);
      setIsLoading(false);
    };
    fetchFullyPaidFeeStudents();
  }, [schoolId, searchQuery,academicYearId]);

  
    useEffect(() => {
      if (selectedClass === "Select All") { 
        setFilterdData(fullyPaidStudents);
      } else {
        const data = fullyPaidStudents?.filter(
          (student) => student.className === selectedClass
        );
        setFilterdData(data);
      }
      setIsLoading(false);
    }, [schoolId, selectedClass]);

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.heading}>Pending Students Fees</h2> */}
      <div className={styles.tableContainer}>
        {!isLoading ? (
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
              {filterdData?.length > 0 ? (
                filterdData?.map((student, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{student.studentName}</td>
                    <td>{student.className}</td>
                    <td>{student.fee?.[0]?.totalFee || 0}</td>
                    <td>{student.fee?.[0]?.paidFee || 0}</td>
                    <td className={styles.pending}>
                      {student.fee?.[0]?.pendingFee}
                    </td>
                    <td>{student.fee?.[0]?.status || 0}</td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(student)}
                        disabled
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
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default FullyPaidFees;
