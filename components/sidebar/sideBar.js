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

const Sidebar = () => {
  const [component, setComponent] = useState("Dashboard");
  const router = useRouter();

  // const handleNavigation = (componentName) => {
  //   setComponent(componentName);
  //   // router.push(`/${componentName.toLowerCase()}`);
  // };

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
          <Home className={styles.icon} />
          <span>Dashboard</span>
        </div>
        </Link>
        
        <Link href="/enrollments">
        <div
          // onClick={() => handleNavigation("Enrollments")}
          className={`${styles.link} ${
            component === "Enrollments" ? styles.active : ""
          }`}
        >
          <Users className={styles.icon} />
          <span>Enrollments</span>
        </div>
        </Link>
        
        <Link href="/students"> 
        <div
          onClick={() => setComponent("Students")}
          className={`${styles.link} ${
            component === "Students" ? styles.active : ""
          }`}
        >
          <Users className={styles.icon} />
          <span>Students</span>
        </div>
        </Link>

        <Link href={`/${"teachers"}`}>
        <div
          onClick={() => setComponent("Teachers")}
          className={`${styles.link} ${
            component === "Teachers" ? styles.active : ""
          }`}
        >
          <Folder className={styles.icon} />
          <span>Teachers</span>
        </div>
        </Link>

        <Link href={`/${"fee-details"}`}>
        <div
          onClick={() => setComponent("Fee-Details")}
          className={`${styles.link} ${
            component === "Fee-Details" ? styles.active : ""
          }`}
        >
          <Folder className={styles.icon} />
          <span>Fee Details</span>
        </div>
        </Link>

        <Link href={`/${"calendar"}`}> 
        <div
          onClick={() => setComponent("Calendar")}
          className={`${styles.link} ${
            component === "Calendar" ? styles.active : ""
          }`}
        >
          <Calendar className={styles.icon} />
          <span>Calendar</span>
        </div>
        </Link>
        {/* <div className={styles.link}>
          <FileText className={styles.icon} />
          <span>Documents</span>
        </div> */}

        <Link href={`/${"payrolls"}`}>  
        <div
          onClick={() => setComponent("Payrolls")}
          className={`${styles.link} ${
            component === "Payrolls" ? styles.active : ""
          }`}
        >
          <PieChart className={styles.icon} />
          <span>Payrolls</span>
        </div>
        </Link>
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


      <Link href={`/${"settings"}`}>
      <div className={styles.section}>
        <div
          onClick={() => setComponent("settings")}
          className={`${styles.link} ${
            component === "settings" ? styles.active : ""
          }`}
        >
          <Settings className={styles.icon} />
          <span>Settings</span>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Sidebar;
