import React,{useState,useEffect} from "react"; 
import Enrollments from '@/components/enrollments/enrollments'
import Navigation from '@/components/navigation/Navigation' 
import {useAuth} from "@/contexts/AuthContext";
import Spinner from "@/components/spinner/spinner";
import styles from "./enrollments.module.scss";

const EnrollmentsMain = () => {
    
      const { user ,hasPermission} = useAuth();
      const [access, setAccess] = useState(null); 
    
      useEffect(() => {
        if (!user) return;  
        const allowedRoles = ["principal", "superAdmin","administration"];
        setAccess(hasPermission(allowedRoles));
      }, [user]);
    
      if (access === null) {
        return <Spinner/>;  
      }
  return (
    <div>
        <Navigation text='Enrollments'/>
        {access?<Enrollments/>:<div className={styles.message}>
            <h2>access denied</h2>
            <h4>please contact your schools principle for the access.</h4>
          </div>}

    </div>
  )
}

export default EnrollmentsMain