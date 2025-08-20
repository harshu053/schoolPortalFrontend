import React, { useEffect, useState , useRef} from "react";
import TeacherCard from "./teacherCard";
import styles from "./teacher.module.scss";
import { teacherInformationTypeList } from "@/constants/app.constants";
import Icon from "../icon/icon";
import { useRouter } from "next/router";


const Teacher = ({ teacherdata }) => {
  const [activeButton, setActiveButton] = useState("All Teachers");
  const [data, setData] = useState(teacherdata);
  const [showBtn, setShowBtn] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [selectedDepartemnt, setSelectedDepartemnt] = useState('Mathematics');

  const inputRef = useRef();
  const router=useRouter();

  const handleInformationSection = (value) => {
    setActiveButton(value);
    if (value === "Department Wise") {
      setShowDepartment(true);
    } else {
      setShowDepartment(false);
    }
  };

  const handleMoreDeatils=(employeeId, schoolId)=>{
    router.push(`/teachers/${employeeId}`);
  }

  return (

    <div className={styles.teacherContainer}>
       
      <div className={styles.topRow}>
        <div className={styles.informationType}>
          {teacherInformationTypeList.map((value) => (
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

        {showDepartment && (
          <div className={styles.classDropdown}>
            <select
              value={selectedDepartemnt || ""}
              onChange={(e) => setSelectedDepartemnt(e.target.value)}
              className={styles.dropdownSelect}
            >
              <option value="" disabled>
                Select Departemnt
              </option>
              {[...new Set(data.map((teacher) =>  teacher.departemnt))].map(
                (departemnt) => (
                  <option key={departemnt} value={departemnt}>
                     {departemnt}
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
              className={styles.clearbtn}
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

      <div className={styles.teacherCard}>
      {teacherdata.map((teacher, index) => (
        <TeacherCard key={index} teacher={teacher} onDetails={handleMoreDeatils} />
      ))}
      </div>
    </div>
  );
};

export default Teacher;
