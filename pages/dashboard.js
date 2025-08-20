import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/navigation/Navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import styles from "../styles/Dashboard.module.scss";
import SchoolDashboard from "@/components/school/dashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Navigation text={user?.schoolName} />

        <div className={styles.content}>
          {(user?.userRole === "schoolAdmin" || user?.role === "principal") && (
            <SchoolDashboard />
          )}

          {user?.userRole === "teacher" && <div>teacher </div>}
        </div>
      </div>
    </ProtectedRoute>
  );
}
