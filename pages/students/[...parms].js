import Navigation from '@/components/navigation/Navigation';
import { useAuth } from '@/contexts/AuthContext'
import React from 'react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { apibaseUrl } from '@/utils/utils';
import StudentDetails from '@/components/students/studentdetails';

const StudentDeatils = () => {
  const { user } = useAuth();
  const params = useParams();
  const studentId = params?.parms?.[0]; 
  const schoolId = user?.schoolId;
  const [studentData, setStudentData] = useState({});
 

  useEffect(()=>{
    if (!schoolId || !studentId) return; 

    const fetchStudentsDetails= async () => {
      try {
        const response = await fetch(`${apibaseUrl}students/${schoolId}?studentId=${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const data = await response.json();
        setStudentData(data); 
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    }
    fetchStudentsDetails();
  },[schoolId, studentId]);
 
 
  return (
    <div>
      <Navigation  text='Student Detail'/>
      { studentData && <div><StudentDetails student={studentData}/></div>}
    </div>
  )
}

export default StudentDeatils