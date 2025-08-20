import Navigation from "@/components/navigation/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Teacher from "@/components/teacher/teacher";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const Teachers = () => {
    const user = useAuth(); 
    const teacherData = user?.user?.teachers || [];
  return (
    <ProtectedRoute>
      <div>
        <Navigation text="Teachers Managment"/>
        <Teacher teacherdata={teacherData}/>
      </div>
    </ProtectedRoute>
  );
};

export default Teachers;
