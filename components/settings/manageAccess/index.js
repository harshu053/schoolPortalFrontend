import { useState, useEffect } from "react"; 
import { useAuth } from "@/contexts/AuthContext";
import styles from "./manageAccess.module.scss";
import { getAllUser, userUpdateService } from "@/services/schoolServices";
import { useAcademicYear } from "@/contexts/academicYearContext";
import { getAllTeachers } from "@/services/teacherServices";
import { getAllStudentsService } from "@/services/studentsServices";
import ManageAccess from "./provideAccess/provideAccess";
import ExistingRolesPanel from "./existingAccess";

export default function ManageRolesPanel({actionType}) {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const { academicYearId, academicYear, years, switchYear,addAcademicYear }=useAcademicYear();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers]=useState([]);
  const [students, setStudents]=useState([]);

   
  useEffect(()=>{
    if(!schoolId || !academicYearId)return;
    const payload={schoolId,academicYearId};
    const fetchTeachers=async()=>{
      const data= await getAllTeachers(payload);
      setTeachers(data.data); 
    };
    const fetchStudents=async()=>{
      const data=await getAllStudentsService(payload);
      setStudents(data); 
    };
    fetchStudents();
    fetchTeachers();
  },[schoolId,academicYearId]);

  return (
    <div className={styles.panel}> 
      {  
        actionType=="Existing Access" &&<ExistingRolesPanel/>
      }

      {
        actionType=="Provide Access" && <ManageAccess students={students} teachers={teachers}/>  
      }
    </div>
  );
}
