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
import { useAcademicYear } from "@/contexts/academicYearContext";
import { useEffect,useMemo,useState } from "react";
import { getAllStudentsService } from "@/services/studentsServices";
import { getAllTeachers } from "@/services/teacherServices";


export default function SchoolDashboard() { 
  const { user ,schoolDeatils } = useAuth();  
  const { academicYearId,academicYear, years, switchYear,isDesktop }=useAcademicYear();
  const [students, setStudents]=useState([]);
  const [teachers, setTeachers]=useState([]);

   
  useEffect(()=>{
    if(!user?.schoolId || !academicYearId)return;
    const payload={schoolId:user?.schoolId,academicYearId};
    const fetchStudents=async()=>{
      const data=await getAllStudentsService(payload); 
      setStudents(data);
    };
    const fetchTeachers=async()=>{
      const data=await getAllTeachers(payload); 
      setTeachers(data.data);
    };
    fetchStudents();
    fetchTeachers();
  },[user?.schoolId, academicYearId]);

  const totalStudents =useMemo(()=>students?.length || 0,[students]);
  const totalTeacher=useMemo(()=>teachers?.length || 0,[ teachers ]);
  
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
  console.log("isDesktop:", isDesktop);

  return (
    <ProtectedRoute>
      <div className={styles.dashboardContainer}>
        {isDesktop && <Sidebar />}
        <div className={styles.mainContent}>
          <main className={styles.dashboardMain}>
            <div className={styles.cardGrid}>
              <div className={`${styles.dashboardCard} ${styles.blue}`}>
                <div className={styles.icon}>👨‍🎓</div>
                <div>
                  <p className={styles.cardLabel}>Total Students</p>
                  <p className={styles.cardValue}>{totalStudents}</p>
                </div>
              </div>
              <div className={`${styles.dashboardCard} ${styles.green}`}>
                <div className={styles.icon}>👩‍🏫</div>
                <div>
                  <p className={styles.cardLabel}>Total Teachers</p>
                  <p className={styles.cardValue}>{totalTeacher}</p>
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
                <DoughnutChart data={{students,teachers}} />
              </div>
            </div>


            <div className={styles.barChartContainer}>
              <ClassWiseBarChart />
            </div>

          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
