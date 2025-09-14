import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import styles from "../../components/students/students.module.scss";
import Navigation from "@/components/navigation/Navigation";
import StudentsMain from "@/components/students/students";
import Spinner from "@/components/spinner/spinner";
import styled from "./student.module.scss";

const Students = () => {
  const { user ,hasPermission} = useAuth();
  const [access, setAccess] = useState(null); // null = still checking

  useEffect(() => {
    if (!user) return; // wait until user is loaded
    const allowedRoles = ["principal", "superAdmin", "teacher", "admin"];
    setAccess(hasPermission(allowedRoles));
  }, [user]);

  if (access === null) {
    return <Spinner/>; // prevent flicker
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Navigation text="Students Managment" />
        {access ? <StudentsMain /> : <div className={styled.message}>
            <h2>access denied</h2>
            <h4>please contact your schools principle for the access.</h4>
          </div>}
      </div>
    </ProtectedRoute>
  );
};

export default Students;
