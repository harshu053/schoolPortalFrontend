import Navigation from '@/components/navigation/Navigation';
import { useAuth } from '@/contexts/AuthContext'
import React from 'react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { apibaseUrl } from '@/utils/utils';
import StudentDetails from '@/components/students/studentdetails';
import { getStudentByIdService } from '@/services/studentsServices';
import { useAcademicYear } from '@/contexts/academicYearContext';

const StudentDeatils = () => {
  const { user } = useAuth();
  const {academicYearId}=useAcademicYear();
  const params = useParams();
  const studentId = params?.parms?.[0]; 
  const schoolId = user?.schoolId;
  const [studentData, setStudentData] = useState({});
 

  useEffect(()=>{
    if (!schoolId || !studentId || !academicYearId) return; 

    const fetchStudentsDetails= async () => { 
      const payload={academicYearId,schoolId,studentId};
      const response = await getStudentByIdService(payload); 
      setStudentData(response); 
    }
    fetchStudentsDetails();
  },[schoolId, studentId,academicYearId]);
 
 
  return (
    <div>
      <Navigation  text='Student Detail'/>
      { studentData && <div><StudentDetails student={studentData}/></div>}
    </div>
  )
}

export default StudentDeatils