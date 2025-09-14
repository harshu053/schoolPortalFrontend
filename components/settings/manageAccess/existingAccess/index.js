import { useState, useEffect } from "react"; 
import { useAuth } from "@/contexts/AuthContext";
import styles from "./existing.module.scss";
import { deleteUserService, getAllUser, userUpdateService } from "@/services/schoolServices";
import { useAcademicYear } from "@/contexts/academicYearContext";
import { getAllTeachers } from "@/services/teacherServices";
import { getAllStudentsService } from "@/services/studentsServices"; 

export default function ExistingRolesPanel() {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const { academicYearId, academicYear, years, switchYear,addAcademicYear }=useAcademicYear();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers]=useState([]);
  const [students, setStudents]=useState([]);

  useEffect(() => {
    if (!schoolId) return;
    const fetchUsers = async () => { 
      const data = await getAllUser(schoolId);
      setUsers(data.data);
      setLoading(false);
    };
    fetchUsers();
  }, [schoolId]);

   

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

  const updateRoles = async (payload) => {
    const { schoolId, userId, newRole } = payload;
    await userUpdateService(payload);
    setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
  };

  const handleRoleChange = async (userId, newRole) => {
    const payload = { schoolId, userId, newRole };
    updateRoles(payload);
  };

  const handleRemove = async (userId) => {
    const payload={userId,schoolId};
    const removeAccess=await deleteUserService(payload); 
    setUsers(users.filter(u => u._id !== userId));
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.panel}> 
        <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`${styles.role} ${styles[u.role]}`}>
                  {u.role}
                </span>
              </td>
              <td>
                <select
                  className={styles.select}
                  value={u.role}
                  onChange={e => handleRoleChange(u._id, e.target.value)}
                >
                  <option value="teacher">Teacher</option>
                  <option value="administration">Administration</option>
                  {u.role=="superAdmin" && <option value="principal">Principal</option>} 
                  <option value="principal">student</option>
                  <option value="principal">staff</option> 
                </select>
              </td>
              <td>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(u._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}
