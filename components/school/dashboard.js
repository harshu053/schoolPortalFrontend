import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../ProtectedRoute";
import Sidebar from "@/components/sidebar/sideBar";
import styles from "./dashboard.module.scss"; // CSS module
import ProfileCard from "@/components/profilecard/profileCard";
import { apibaseUrl } from "@/utils/utils";
import TeacherDetail from "@/components/teacher/teacherDetail";
import DoughnutChart from "@/components/chart/doughnut-chart/doughnut-chart";
import ClassWiseBarChart from "../chart/barChart/barChart";
import UpcomingEvents from "../event/upcomingEvent";
import { Container } from "@mui/material";

export default function SchoolDashboard() {
  const { user } = useAuth(); 

  const totoalStudents = user?.students?.length || "--";
  const totalTeachers = user?.teachers?.length || "--";


  const events = [
    {
      title: "Science Exhibition",
      date: "2025-08-12",
      description:
        "Students will present science models and experiments in the main hall.",
    },
    {
      title: "Parent-Teacher Meeting",
      date: "2025-08-18",
      description:
        "Discussion about student performance and upcoming syllabus.",
    },
    {
      title: "Annual Sports Day",
      date: "2025-09-05",
      description: "Track and field events, group sports, and award ceremony.",
    },
    {
      title: "Teacher’s Day Celebration",
      date: "2025-09-05",
      description: "Cultural performances and appreciation for all teachers.",
    },
    {
      title: "First Term Examination",
      date: "2025-09-15",
      description:
        "Exams will begin for all classes. Detailed schedule to be shared soon.",
    },
  ];

  return (
    <ProtectedRoute>
      <div className={styles.dashboardContainer}>
        <Sidebar />

        <div className={styles.mainContent}>
          <main className={styles.dashboardMain}>
            <div className={styles.cardGrid}>
              <div className={`${styles.dashboardCard} ${styles.blue}`}>
                <div className={styles.icon}>👨‍🎓</div>
                <div>
                  <p className={styles.cardLabel}>Total Students</p>
                  <p className={styles.cardValue}>{totoalStudents}</p>
                </div>
              </div>

              <div className={`${styles.dashboardCard} ${styles.green}`}>
                <div className={styles.icon}>👩‍🏫</div>
                <div>
                  <p className={styles.cardLabel}>Total Teachers</p>
                  <p className={styles.cardValue}>{totalTeachers}</p>
                </div>
              </div>

              <div className={`${styles.dashboardCard} ${styles.yellow}`}>
                <div className={styles.icon}>📅</div>
                <div>
                  <p className={styles.cardLabel}>Today's Attendance</p>
                  <p className={styles.cardValue}>--</p>
                </div>
              </div>
            </div>

            {/* <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <TeacherDetail teacher={user?.teachers?.[0]} />
            </div> */}

            <div className={styles.event_distibution_Container}>
              <div className={styles.eventContainer}>
                <UpcomingEvents events={events} />
              </div>
              <div className={styles.doughnutConatiner}>
                <DoughnutChart data={user} />
              </div>
            </div>

            <div className={styles.barChartContainer}>
              <ClassWiseBarChart studentsData={user?.students} />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
