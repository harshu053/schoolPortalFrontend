import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute"; 
import styles from "../../components/students/students.module.scss";
import Navigation from "@/components/navigation/Navigation";
import StudentsMain from "@/components/students/students";

const Students = () => {
  const { user } = useAuth();
  const students = user?.students || [];

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Navigation text='Students Managment'/>
        <StudentsMain studentData={students}/>
      </div>
    </ProtectedRoute>
  );
};

export default Students;
