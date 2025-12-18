import React, { useEffect, useState } from "react";
import StudentCard from "../students/studentCard";
import styles from "../students/students.module.scss";
import { informationTypeList } from "@/constants/app.constants";
import Icon from "../icon/icon";
import { useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apibaseUrl } from "@/utils/utils";
import { Router, useRouter } from "next/router";
import {
  getAllStudentsService,
  searchStudentsService,
} from "@/services/studentsServices";
import AdmitCard from "./admitcard/admitCard";
import { useAcademicYear } from "@/contexts/academicYearContext";
import { useReactToPrint } from "react-to-print";

const StudentsMain = () => {
  const { user } = useAuth();
  const { academicYearId,isDesktop } = useAcademicYear();
  const schoolId = user?.schoolId;
  const [activeButton, setActiveButton] = useState("All Students");
  const [data, setData] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [showClassList, setShowClassList] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassData, setSelectedClassData] = useState([]);
  const [studentData, setStudentData] = useState();
  const inputRef = useRef();
  const printRef = useRef();
  const router = useRouter();

  const handleMoreDetails = (student) => {
    router.push(`/students/${student.studentId}`);
  };

  const handleSearch = (searchText) => {
    if (!searchText || searchText.trim() === "") {
      setData(studentData);
      return;
    }
    const getsearchData = async () => {
      const payload = { schoolId, searchQuery: searchText, academicYearId };
      const response = await searchStudentsService(payload);
      setData(response);
    };
    getsearchData();
  };

  const handleInformationSection = (value) => {
    setActiveButton(value);
    if (value === "All Students") {
      setShowClassList(false);
    } else {
      setShowClassList(true);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "AdmitCards",
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 10mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `,
  });

  useEffect(() => {
    if (!schoolId || !academicYearId) return;
    const fetchStudents = async () => {
      const payload = { academicYearId, schoolId };
      const data = await getAllStudentsService(payload);
      setData(data);
      setStudentData(data);
    };
    fetchStudents();
  }, [schoolId, academicYearId]);

  useEffect(() => { 
    if (
      activeButton === "Class Wise Students" ||
      activeButton === "generate Admit Cards"
    ) {
      const filterData = data?.filter(
        (student) => student.className == selectedClass
      ); 
      setSelectedClassData(filterData);
    }
  }, [selectedClass, data, activeButton]);

  return (
    <div className={styles.container}>
      {isDesktop?(<div className={styles.topRow}>
        <div className={styles.informationType}>
          {informationTypeList.map((value) => (
            <button
              onClick={() => handleInformationSection(value)}
              className={`${styles.buttons} ${
                activeButton === value ? styles.active : ""
              } text-button`}
            >
              {value}
            </button>
          ))}
        </div>

        {showClassList && (
          <div className={styles.classDropdown}>
            <select
              value={selectedClass || ""}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={styles.dropdownSelect}
            >
              <option value="" disabled>
                Select Class
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

        <div className={styles.search}>
          <div className={styles.icon}>
            <Icon iconName="IcSearch" />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
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
              event.target.placeholder = "Search";
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
        </div>
      </div>):

      (<div className={styles.inputGroup}>
            <label>Select Action</label>
            <select
              value={activeButton}
              onChange={(e) => handleInformationSection(e.target.value)}
            >
              {
                informationTypeList.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))
              }
            </select>
      </div>)}

      {showClassList && (
          <div className={styles.inputGroup}>
            <label>Select Class</label>
            <select
              value={selectedClass || ""}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={styles.dropdownSelect}
            >
              <option value="" disabled>
                Select Class
              </option>
              {[...new Set(data?.map((student) => student.className))].map(
                (className) => (
                  <option key={className} value={className}>
                    class {className}
                  </option>
                )
              )}
            </select>

            {/* <div className={styles.arrowIcon}>
              <Icon iconName="IcChevronDown" />
            </div> */}
          </div>
        )}

      <div className={styles.Container}>
        {/* Show all students if 'All Students' is selected */}
        <div className={styles.studentsContainer}>
          {activeButton === "All Students" &&
            (data?.length === 0 ? (
              <div className={styles.message}>No students found.</div>
            ) : (
              data &&
              data?.map((student) => (
                <StudentCard
                  key={student._id || student.name}
                  student={student}
                  onDetails={handleMoreDetails}
                />
              ))
            ))}
        </div>

        {/* Show students of selected class if 'Class Wise' is selected and a class is chosen */}
        <div className={styles.studentsContainer}>
          {activeButton === "Class Wise Students" &&
            (selectedClass && selectedClassData ? (
              selectedClassData?.length === 0 ? (
                <div className={styles.message}>
                  No students found in class {selectedClass}.
                </div>
              ) : (
                selectedClassData?.map((student) => (
                  <StudentCard
                    key={student._id || student.name}
                    student={student}
                    onDetails={handleMoreDetails}
                  />
                ))
              )
            ) : (
              <div className={styles.message}>
                Please select class to see data.
              </div>
            ))}
        </div>

        {/* show admit card of all the student by selecting class */}
        <div className={styles.admitCardSection}>
          {activeButton == "generate Admit Cards" &&
            (selectedClass && selectedClassData ? (
              selectedClassData.length > 0 ? (
                <>
                  <div className={styles.printBtncontianer}>
                    <button className={styles.printBtn} onClick={handlePrint}>
                      Print Admit Cards
                    </button>
                  </div>
                  <div ref={printRef} className={styles.printContainer}>
                    {selectedClassData?.map((student, index) => (
                      <div key={index} className={styles.cardWrapper}>
                        <AdmitCard student={student} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.message}>
                  selected class has no students
                </div>
              )
            ) : (
              <div className={styles.message}>
                Please select class to generate admit card.
              </div>
            ))}
        </div>

        {/* Generate Grade Cards of all the selected students */}
        {activeButton === "generate Grade Cards" && (
          <div className={styles.gradeCardSection}>Working in progress</div>
        )}
      </div>
    </div>
  );
};

export default StudentsMain;
