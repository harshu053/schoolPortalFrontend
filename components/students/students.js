import React, { useEffect, useState } from "react";
import StudentCard from "../students/studentCard";
import styles from "../students/students.module.scss";
import { informationTypeList } from "@/constants/app.constants";
import Icon from "../icon/icon";
import { useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apibaseUrl } from "@/utils/utils";
import { Router,useRouter } from "next/router";  

const StudentsMain = ({ studentData }) => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState("All Students");
  const [data, setData] = useState(studentData);
  const [showBtn, setShowBtn] = useState(false);
  const [showClassList, setShowClassList] = useState(false);
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedClassData, setSelectedClassData] = useState(
    data?.filter((student) => student.class === selectedClass)
  );
  const inputRef = useRef();
  const router=useRouter();

  const handleMoreDetails = (student) => {
      router.push(`/students/${student.studentId}`);
  };

  const handleSearch = (searchText) => {
    if (searchText.length == 0) setData(studentData);
    const filterdData = fetch(
      `${apibaseUrl}students/search?searchQuery=${searchText}&schoolId=${user?.schoolId}`
    );
    filterdData
      .then((response) => response.json())
      .then((data) => {  
        setData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleInformationSection = (value) => {
    setActiveButton(value);
    if (value === "Class Wise Students") {
      setShowClassList(true);
    } else {
      setShowClassList(false);
    }
  };

  useEffect(() => {
  if (activeButton === "Class Wise Students") { 
    const filterData = data?.filter(
      (student) => student.class == selectedClass
    );
    setSelectedClassData(filterData); 
  }
}, [selectedClass, data, activeButton]);


  return (
    <div className={styles.container}>

      <div className={styles.topRow}>
        <div className={styles.informationType}>
          {informationTypeList.map((value) => (
            <button
              onClick={() => handleInformationSection(value)}
              className={`${styles.buttons} ${activeButton === value ? styles.active : ""} text-button`}
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
              {[...new Set(data?.map((student) => student.class))].map(
                (className) => (
                  <option key={className} value={className}>
                    class {className}th
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
      </div>

       

      <div className={styles.studentsContainer}>
        {/* Show all students if 'All Students' is selected */}
        {activeButton === "All Students" &&
          (data?.length === 0 ? (
            <div>No students found.</div>
          ) : (
            data?.map((student) => (
              <StudentCard
                key={student._id || student.name}
                student={student}
                onDetails={handleMoreDetails}
              />
            ))
          ))}

        {/* Show students of selected class if 'Class Wise' is selected and a class is chosen */}
        {activeButton === "Class Wise Students" &&
          selectedClass &&
          (selectedClassData?.length === 0 ? (
            <div>No students found in class {selectedClass}th.</div>
          ) : (
            selectedClassData?.map((student) => (
              <StudentCard
                key={student._id || student.name}
                student={student}
                onDetails={handleMoreDetails}
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default StudentsMain;
