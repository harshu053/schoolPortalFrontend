import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navigation from "../../components/Navigation";
import Sidebar from "@/components/sidebar/sideBar";
import styles from "./dashboard.module.css"; // CSS module
import ProfileCard from "@/components/profilecard/profileCard";
import { apibaseUrl } from "@/utils/utils";
import TeacherDetail from "@/components/teacherdetail/teacherDetail";

export default function SchoolDashboard() {
  const { user } = useAuth();
  console.log("User in dashboard:", user);

  const totoalStudents = user?.students?.length || "--";
  const totalTeachers = user?.teachers?.length || "--";

  const handleEdit = async (id, cardType) => {

    const schoolId = user?.schoolId; 

    console.log(`Edit ${cardType} with ID:`, id);

    try {
      let response =
        cardType === "teacherCard"
          ? await fetch(
              `${apibaseUrl}teacher/allteachers/${schoolId}?employeeId=${id}`
            )
          : await fetch(
              `${apibaseUrl}students/allstudents/${schoolId}?studentId=${id}`
            );
      const userData = await response.json();
      console.log("Fetched student data:", userData);

      // Now you can proceed to open edit modal or whatever next
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleDelete = (id, cardType) => {
    console.log(`Delete ${cardType} with ID:`, id);
  };

  return (
    <ProtectedRoute>
      {/* Navigation at the very top, spanning full width */}
      <Navigation schoolName={user?.schoolName} />

      {/* Below Navigation: sidebar + main layout */}
      <div className={styles.dashboardContainer}>
        <Sidebar />

        <div className={styles.mainContent}>
          <main className={styles.dashboardMain}> 

            {/* <div className={styles.cardGrid}>
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
            </div> */}
{/* 
            <div className={styles.studentsSection}>
              Students Section
              <div className={styles.cardGrid}>
                {user?.students?.map((student, index) => (
                  <ProfileCard
                    key={index}
                    user={student}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    cardTtype="studentCard"
                  />
                ))}
              </div>
            </div>

            <div className={styles.studentsSection}>
              Teachers Section
              <div className={styles.cardGrid}>
                {user?.teachers?.map((teacher, index) => (
                  <ProfileCard
                    key={index}
                    user={teacher}
                    cardTtype="teacherCard"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div> */}

            <div><TeacherDetail teacher={user?.teachers?.[0]}/></div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// // pages/school/dashboard.js

// import { useAuth } from '../../contexts/AuthContext';
// import Navigation from '../../components/Navigation';
// import ProtectedRoute from '../../components/ProtectedRoute';
// import styles from './dashboard.module.css';
// import Sidebar from '@/components/sidebar/sideBar';

// export default function SchoolDashboard() {
//     const { user } = useAuth();

//     return (
//         <ProtectedRoute>
//             <div className={styles.dashboard}>
//                 <Navigation />

//                 <main className={styles.main}>
//                     <div className={styles.container}>
//                         <Sidebar/>
//                         <div className={styles.card}>
//                             <div className={styles.cardBody}>
//                                 <h1 className={styles.dashboardTitle}> Dashboard</h1>

//                                 <div className={styles.stats}>
//                                     <div className={`${styles.statBox} ${styles.blue}`}>
//                                         <div className={styles.statContent}>
//                                             <div className={styles.statIcon}>👨‍🎓</div>
//                                             <div>
//                                                 <p className={styles.label}>Total Students</p>
//                                                 <p className={styles.value}>--</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className={`${styles.statBox} ${styles.green}`}>
//                                         <div className={styles.statContent}>
//                                             <div className={styles.statIcon}>👩‍🏫</div>
//                                             <div>
//                                                 <p className={styles.label}>Total Teachers</p>
//                                                 <p className={styles.value}>--</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className={`${styles.statBox} ${styles.yellow}`}>
//                                         <div className={styles.statContent}>
//                                             <div className={styles.statIcon}>📅</div>
//                                             <div>
//                                                 <p className={styles.label}>Today's Attendance</p>
//                                                 <p className={styles.value}>--</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </ProtectedRoute>
//     );
// }
