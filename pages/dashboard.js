import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/navigation/Navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import styles from "../styles/Dashboard.module.scss";
import SchoolDashboard from "@/components/school/dashboard";
import SuperAdmin from "./superAdmin";
import Spinner from "@/components/spinner/spinner";
import { Router,useRouter } from "next/router";

export default function DashboardPage() {
  const { user,schoolDeatils } = useAuth();
  const router=useRouter();


  return (
    <ProtectedRoute>
      <div className={styles.container}>  
        <Navigation text={user?.role === "admin"? user?.name: schoolDeatils?.schoolName || "LITTLE ANGELS SCHOOL"} />
        <div className={styles.content}> 
          <SchoolDashboard  />
        </div>
      </div>
    </ProtectedRoute>
  );
}
