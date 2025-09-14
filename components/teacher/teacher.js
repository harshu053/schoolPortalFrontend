import React, { useEffect, useState, useRef } from "react";
import TeacherCard from "./teacherCard";
import styles from "./teacher.module.scss";
import { teacherInformationTypeList } from "@/constants/app.constants";
import Icon from "../icon/icon";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { getAllTeachers, searchTeachersService } from "@/services/teacherServices";
import { useAcademicYear } from "@/contexts/academicYearContext";

const Teacher = () => { 
  const { user } = useAuth();
  const {academicYearId}=useAcademicYear();
  const schoolId = user?.schoolId;
  const [activeButton, setActiveButton] = useState("All Teachers");
  const [data, setData] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [selecteddepartment, setSelecteddepartment] = useState("Mathematics");
  const [selecteddepartmentData, setSelecteddepartmentData] =useState([]);
  const [teacherdata,setTeacherdata]=useState();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if(!schoolId || !academicYearId)return
    const fetchTeachers = async () => {
      const payload={academicYearId,schoolId};
      const data = await getAllTeachers(payload);
      setData(data.data);
      setTeacherdata(data.data);
    };
    fetchTeachers(); 
  }, [schoolId,academicYearId]);

 

  const handleInformationSection = (value) => {
    setActiveButton(value);
    if (value === "Department Wise") {
      setShowDepartment(true);
    } else {
      setShowDepartment(false);
    }
  };

  const handleSearch=async(query)=>{
     if (!query || query.trim() === "") {
      setData(teacherdata);
      return;
    }
    query=query.trim();
     if(!schoolId || !query || !academicYearId)return;
     const payload={schoolId, searchQuery:query,academicYearId}
     const response=await searchTeachersService(payload); 
     setData(response.data);
  }

  const handleChange = (e) => {
    setShowBtn(true)
    setSearchQuery(e.target.value);
  }

  const handleMoreDeatils = (employeeId, schoolId) => {
    router.push(`/teachers/${employeeId}`);
  };

  useEffect(() => { 
    if (activeButton === "Department Wise") {
      const filterData = data?.filter(
        (teacher) => teacher.department == selecteddepartment
      );
      setSelecteddepartmentData(filterData);
    }
  }, [selecteddepartment, data, activeButton]);

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
              value={selecteddepartment || ""}
              onChange={(e) => setSelecteddepartment(e.target.value)}
              className={styles.dropdownSelect}
            >
              <option value="" disabled>
                Select department
              </option>
              {[...new Set(data?.map((teacher) => teacher.department))].map(
                (department) => (
                  <option key={department} value={department}>
                    {department}
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
            onChange={handleChange}
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

      {activeButton === "All Teachers" && (
        <div className={styles.teacherCard}>
          {!data || data?.length === 0 ? (
            <div className={styles.message}>No Teachers found.</div>
          ) : (
            data?.map((teacher, index) => (
              <TeacherCard
                key={index}
                teacher={teacher}
                onDetails={handleMoreDeatils}
              />
            ))
          )}
        </div>
      )}

      {activeButton == "Department Wise" && selecteddepartment && (
        <div className={styles.teacherCard}>
          {!selecteddepartmentData || selecteddepartmentData?.length === 0 ? (
            <div className={styles.message}>No Teachers found.</div>
          ) : (
            selecteddepartmentData?.map((teacher, index) => (
              <TeacherCard
                key={index}
                teacher={teacher}
                onDetails={handleMoreDeatils}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Teacher;
