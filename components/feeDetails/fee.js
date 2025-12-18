import React, { useEffect, useState, useRef } from "react";
import styles from "./fee.module.scss";
import { feesDetailsTabs } from "@/constants/app.constants";
import Icon from "@/components/icon/icon";
import { Router, useRouter } from "next/router";
import ClassWiseFeeForm from "./feeform/classFeeForm";
import PendingFees from "./pendingFees/pendingFees";
import { useAuth } from "@/contexts/AuthContext";
import { getAllStudentsService, searchStudentsService } from "@/services/studentsServices";
import FeeSubmission from "./feeSubmission/feeSubmission";
import TransactionsHistory from "./transactionHistory/transactionsHistory";
import { searchFeeTransactions } from "@/services/feesSevices";
import FullyPaidFees from "./noPendingFees/fullyPaidFees";
import { useAcademicYear} from "@/contexts/academicYearContext";

const FeesMainConatiner = () => {
  const [activeButton, setActiveButton] = useState("Fee Submission"); 
  const [data, setData] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [showClassList, setShowClassList] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Select All");
  const [selectedClassData, setSelectedClassData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const inputRef = useRef();
  const router = useRouter();
  const { user } = useAuth();
  const { academicYearId,isDesktop } = useAcademicYear();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInformationSection = (value) => {
    setActiveButton(value);
    if (value === "Fee Structure") {
      setShowClassList(false);
    } else {
      setShowClassList(true);
    }
  };

  const handleFeeSubmissionCall = (studentData) => {
    setSelectedStudent(studentData);
    setActiveButton("Fee Submission");
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  useEffect(() => {
    if (!user?.schoolId || !academicYearId) return;
    const fetchStudentData = async () => {
      const payload = { schoolId: user?.schoolId, academicYearId };
      const data = await getAllStudentsService(payload);
      setData(data);
    }
    fetchStudentData();
  }, [user?.schoolId, academicYearId]) 


  return (
    <div className={styles.mainConatiner}>
      {isDesktop?(<div className={styles.topRow}>
        <div className={styles.informationType}>
          {feesDetailsTabs.map((value) => (
            <button
              onClick={() => handleInformationSection(value)}
              className={`${styles.buttons} ${activeButton === value ? styles.active : ""
                } text-button`}
            >
              {value}
            </button>
          ))}
        </div>

        {((activeButton == "Pending Fees" || activeButton == "Payment History" || activeButton == "Fully Paid Students") && showClassList) && (
          <div className={styles.classDropdown}>
            <select
              value={selectedClass || ""}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={styles.dropdownSelect}
            >
              <option value="Select All">
                Select All
              </option>
              {[...new Set(data?.map((student) => student.className))].map(
                (className) => (
                  <option key={className} value={className}>
                    class {className}
                  </option>
                )
              )}
            </select>

            <div className={styles.arrowIcon}>
              <Icon iconName="IcChevronDown" />
            </div>
          </div>
        )}

        {(activeButton == "Pending Fees" || activeButton == "Payment History" || activeButton == "Fully Paid Students") && <div className={styles.search}>
          <div className={styles.icon}>
            <Icon iconName="IcSearch" />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search Name or Class"
            className={`${styles.text} text-body-s`}
            onChange={() => setShowBtn(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(event.target.value);
                setShowBtn(false);
              }
            }}
            onFocus={(event) => {
              event.target.placeholder = ""; // Clear placeholder on focus
            }}
            onBlur={(event) => {
              event.target.placeholder = "Search Name or Class";
            }}
          />

          {showBtn && (
            <button
              type="button"
              className={`${styles.clearbtn}`}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                  setShowBtn(false);
                }
              }}
            >
              <Icon iconName="IcCloseRemove" />
            </button>
          )}
        </div>}
      </div>):

      (<div className={styles.inputGroup}>
        <label>Select Entity</label>
        <select
          value={activeButton}
          onChange={(e) => handleInformationSection(e.target.value)}
        >
          {
            feesDetailsTabs.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))
          }
        </select>
      </div>)}

      {
        activeButton == "Fee Structure" &&
        <div>
          <ClassWiseFeeForm />
        </div>
      }

      {
        activeButton == "Pending Fees" &&
        <div><PendingFees selectedClass={selectedClass} onEdit={handleFeeSubmissionCall} searchQuery={searchQuery} /></div>
      }

      {
        activeButton == "Fully Paid Students" && <FullyPaidFees selectedClass={selectedClass} searchQuery={searchQuery} />
      }
      {
        activeButton == "Fee Submission" &&
        <div><FeeSubmission studentData={data} selectedStudent={selectedStudent} /></div>
      }
      {
        activeButton == "Payment History" &&
        <div><TransactionsHistory selectedClass={selectedClass} searchQuery={searchQuery} /></div>
      }
    </div>
  );
};

export default FeesMainConatiner;
