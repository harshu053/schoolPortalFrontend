import React, { use, useState } from "react";
import styles from "./sideBar.module.scss";
import {
  Home,
  Users,
  Folder,
  Calendar,
  FileText,
  PieChart,
  Settings,
} from "react-feather";
import { Router,useRouter } from "next/router";

const Sidebar = () => {
  const [component, setComponent] = useState("Dashboard");
  const router=useRouter();

  const handleNavigation = (componentName) => {
    setComponent(componentName);
    router.push(`/${componentName.toLowerCase()}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <div
          onClick={() => handleNavigation("Dashboard")}
          className={`${styles.link} ${
            component === "Dashboard" ? styles.active : ""
          }`}
        >
          <Home className={styles.icon} />
          <span>Dashboard</span>
        </div>

        <div
          onClick={() => handleNavigation("Enrollments")}
          className={`${styles.link} ${
            component === "Enrollments" ? styles.active : ""
          }`}
        >
          <Users className={styles.icon} />
          <span>Enrollments</span>
        </div>

        <div
          onClick={() => handleNavigation("Students")}
          className={`${styles.link} ${
            component === "Students" ? styles.active : ""
          }`}
        >
          <Users className={styles.icon} />
          <span>Students</span>
        </div>
        <div
          onClick={() => handleNavigation("Teachers")}
          className={`${styles.link} ${
            component === "Teachers" ? styles.active : ""
          }`}
        >
          <Folder className={styles.icon} />
          <span>Teachers</span>
        </div>
        <div
          onClick={() => handleNavigation("Fee-Sturtures")}
          className={`${styles.link} ${
            component === "Fee-Sturtures" ? styles.active : ""
          }`}
        >
          <Folder className={styles.icon} />
          <span>Fee Sturtures</span>
        </div>
        <div
          onClick={() => handleNavigation("Calendar")}
          className={`${styles.link} ${
            component === "Calendar" ? styles.active : ""
          }`}
        >
          <Calendar className={styles.icon} />
          <span>Calendar</span>
        </div>
        {/* <div className={styles.link}>
          <FileText className={styles.icon} />
          <span>Documents</span>
        </div> */}
        <div
          onClick={() => handleNavigation("Payrolls")}
          className={`${styles.link} ${
            component === "Payrolls" ? styles.active : ""
          }`}
        >
          <PieChart className={styles.icon} />
          <span>Payrolls</span>
        </div>
      </div>

      {/* <div className={styles.section}>
        <p className={styles.heading}>Your teams</p>
        {["Heroicons", "Tailwind Labs", "Workcation"].map((team) => (
          <div key={team} className={styles.team}>
            <span className={styles.teamInitial}>{team.charAt(0)}</span>
            <span>{team}</span>
          </div>
        ))}
      </div> */}

      <div className={styles.section}>
        <div className={styles.link}>
          <Settings className={styles.icon} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
