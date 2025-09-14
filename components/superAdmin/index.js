import React, { useEffect, useState } from "react";
import styles from "./superAdmin.module.scss";
import { getAllSchools } from "@/services/schoolServices";
import SchoolCard from "./schoolCard/card";

const SuperAdmin = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAllSchools = async () => {
      const schools = await getAllSchools(); 
      setData(schools);
    };
    fetchAllSchools();
  }, []);
  return (
    // <div><SchoolCard schoolData={data?.[0]}/></div>
    <div className={styles.container}>
      {data?.map((school, index) => (
        <SchoolCard key={index} schoolData={school} />
      ))}
    </div>
  );
};

export default SuperAdmin;
