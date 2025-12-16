import React, { use, useState } from "react";
import styles from "./sideBar.module.scss";
import Link from "next/link";
import {
  Home,
  Users,
  Folder,
  Calendar,
  FileText,
  PieChart,
  Settings,
} from "react-feather";
import { Router, useRouter } from "next/router";
import Icon from "../icon/icon";

const Sidebar = () => {
  const [component, setComponent] = useState("Dashboard");
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <Link href={`/${"dashboard"}`}>
        <div
          onClick={() => handleNavigation("Dashboard")}
          className={`${styles.link} ${
            component === "Dashboard" ? styles.active : ""
          }`}
        >
          {/* <Home className={styles.icon} /> */}
          <Icon iconName={"IcHome"} className={styles.icon} />
          <span className={styles.label}>Dashboard</span>
        </div>
        </Link>
        
        <Link href="/enrollments">
        <div
          // onClick={() => handleNavigation("Enrollments")}
          className={`${styles.link} ${
            component === "Enrollments" ? styles.active : ""
          }`}
        >
          <Icon iconName={"IcAdd"} className={styles.icon} />
          <span className={styles.label}>Enrollments</span>
        </div>
        </Link>
        
        <Link href="/students"> 
        <div
          onClick={() => setComponent("Students")}
          className={`${styles.link} ${
            component === "Students" ? styles.active : ""
          }`}
        >
          <Icon iconName={"IcStudent"} className={styles.icon} />
          <span className={styles.label}>Students</span>
        </div>
        </Link>

        <Link href={`/${"teachers"}`}>
        <div
          onClick={() => setComponent("Teachers")}
          className={`${styles.link} ${
            component === "Teachers" ? styles.active : ""
          }`}
        >
           
           <Icon iconName={"IcTeacher"} className={styles.icon} />
          <span className={styles.label}>Teachers</span>
        </div>
        </Link>

        <Link href={`/${"fee-details"}`}>
        <div
          onClick={() => setComponent("Fee-Details")}
          className={`${styles.link} ${
            component === "Fee-Details" ? styles.active : ""
          }`}
        >
           <Icon iconName={"IcRupee"} className={styles.icon} />
          <span className={styles.label}>Fee Details</span>
        </div>
        </Link>

        <Link href={`/${"calendar"}`}> 
        <div
          onClick={() => setComponent("Calendar")}
          className={`${styles.link} ${
            component === "Calendar" ? styles.active : ""
          }`}
        >
           <Icon iconName={"IcHome"} className={styles.icon} />
          <span className={styles.label}>Calendar</span>
        </div>
        </Link>

        <Link href={`/${"payrolls"}`}>  
        <div
          onClick={() => setComponent("Payrolls")}
          className={`${styles.link} ${
            component === "Payrolls" ? styles.active : ""
          }`}
        >
           <Icon iconName={"IcPayroll"} className={styles.icon} />
          <span className={styles.label}>Payrolls</span>
        </div>
        </Link>
      </div>
      <Link href={`/${"settings"}`}>
      <div className={styles.section}>
        <div
          onClick={() => setComponent("settings")}
          className={`${styles.link} ${
            component === "settings" ? styles.active : ""
          }`}
        >
           <Icon iconName={"IcSetting"} className={styles.icon} />
          <span className={styles.label}>Settings</span>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Sidebar;
