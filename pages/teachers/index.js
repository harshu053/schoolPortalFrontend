import Navigation from "@/components/navigation/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Spinner from "@/components/spinner/spinner";
import Teacher from "@/components/teacher/teacher";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import styles from "./teacher.module.scss";

const Teachers = () => {
  const { user,hasPermission } = useAuth(); 
  const [access, setAccess] = useState(null); 
  useEffect(() => {
    if (!user) return; 
    const allowedRoles = ["principal", "superAdmin","admin"];
    // setAccess(allowedRoles.includes(user.role));
    setAccess(hasPermission(allowedRoles));
  }, [user]);

  if (access === null) {
    return <Spinner/>;  
  }

  return (
    <ProtectedRoute>
      <div>
        <Navigation text="Teachers Management" />
        {access ? <Teacher /> : <div className={styles.message}>
            <h2>access denied</h2>
            <h4>please contact your schools principle for the access.</h4>
          </div>}
      </div>
    </ProtectedRoute>
  );
};

export default Teachers;
