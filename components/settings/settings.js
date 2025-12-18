import { useState } from "react";
import styles from "./settings.module.scss";
import { settingsTypeList, manageAccessList } from "@/constants/app.constants";
import { useAuth } from "@/contexts/AuthContext";
import { createAcademicYear } from "@/services/academicYearServices";
import { useAcademicYear } from "@/contexts/academicYearContext";
import Icon from "../icon/icon";
import ManageRolesPanel from "./manageAccess";

export default function SettingsPage() {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const { isDesktop, years, switchYear, addAcademicYear } =
    useAcademicYear();
  const [activeButton, setActiveButton] = useState("Manage Access");
  const [childButton, setChildButton] = useState("Existing Access");
  const [year, setYear] = useState(null);
  const [newAcademicYear, setNewAcademicYear] = useState(null);

  const handleNewAcademicYear = async (e) => {
    if (!schoolId || !year) return;
    const payload = { schoolId, year };
    const response = await createAcademicYear(payload);
    setNewAcademicYear(response);
  };


  return (
    <div className={styles.settingsContainer}>
      {isDesktop ? (<div className={styles.topRow}>
        <div className={styles.informationType}>
          {settingsTypeList?.map((value) => (
            <button
              onClick={() => setActiveButton(value)}
              className={`${styles.buttons} ${activeButton === value ? styles.active : ""
                } text-button`}
            >
              {value}
            </button>
          ))}
        </div>

        {activeButton == "Manage Access" &&
          <div className={styles.informationType}>
            {manageAccessList?.map((value) => (
              <button
                onClick={() => setChildButton(value)}
                className={`${styles.buttons} ${childButton === value ? styles.active : ""
                  } text-button`}
              >
                {value}
              </button>
            ))}
          </div>}
      </div>)
        :
        (<div className={styles.inputGroup}>
          <label>Select Entity</label>
          <select
            value={activeButton}
            onChange={(e) => setActiveButton(e.target.value)}
          >
            {
              settingsTypeList.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))
            }
          </select>
        </div>)}

        {activeButton == "Manage Access" &&!isDesktop &&<div className={styles.inputGroup}>
          <label>Access Types</label>
          <select
            value={childButton}
            onChange={(e) => setChildButton(e.target.value)}
          >
            {
              manageAccessList.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))
            }
          </select>
        </div>}

      {/* Panels */}
      <div className={styles.panel}>
        {activeButton === "Manage Access" && (
          <ManageRolesPanel actionType={childButton} />
        )}

        {activeButton === "Academic Year" && (
          <div>
            <div className={styles.heading}>Create Academic Year</div>
            <form className={styles.form}>
              <label className={styles.label}>
                Enter Year (e.g. 2025-26):
                <input
                  type="text"
                  placeholder="YYYY-YY"
                  onChange={(e) => setYear(e.target.value)}
                />
              </label>
              <button
                onClick={(e) => handleNewAcademicYear(e)}
                className={styles.primaryBtn}
              >
                Create Academic Year
              </button>
            </form>
            <div className={styles.tableContainer}>
              {/* <div className={styles.heading}>total Academic Year</div> */}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Year</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {/* <div className={styles.tableBody}> */}
                <tbody>
                  {years?.length > 0 ? (
                    years?.map((student, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{student?.year}</td>
                        <td>{student?.isActive ? "Active" : "Inactive"}</td>
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
          </div>
        )}

        {activeButton === "Migrate Data" && (
          <div>
            <div className={styles.heading}>Migrate Data</div>
            <p>
              Once a new academic year is created, you can migrate students and
              teachers into the new year. Previous year’s data will remain
              unchanged.
            </p>
            <button className={styles.primaryBtn}>Migrate Students</button>
            <button className={styles.primaryBtn}>Migrate Teachers</button>
          </div>
        )}
      </div>
    </div>
  );
}
