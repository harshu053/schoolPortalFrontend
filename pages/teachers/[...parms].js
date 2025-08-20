import Navigation from '@/components/navigation/Navigation'
import Spinner from '@/components/spinner/spinner';
import TeacherDetail from '@/components/teacher/teacherDetail';
import { useAuth } from '@/contexts/AuthContext'
import { apibaseUrl } from '@/utils/utils';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const TeacherMain = () => {
  const [teacherDetails, setTeacherDetails] = useState({});
  const { user } = useAuth();
  const params = useParams();
  const employeId = params?.parms?.[0]; // Ensure correct param access
  const schoolId = user?.schoolId;

  useEffect(() => {
    if (!schoolId || !employeId) return; // Wait until both are defined

    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch(`${apibaseUrl}teacher/${schoolId}?employeeId=${employeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch teacher details');
        }
        const data = await response.json();
        setTeacherDetails(data.data); 
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    fetchTeacherDetails();
  }, [employeId, schoolId]);
  
  useEffect(() => {
    console.log("Teacher details in effect:", teacherDetails);
  }, [teacherDetails]); 

  return (
    <div>
      <Navigation text='Teacher Details' />
      <div>{teacherDetails &&<TeacherDetail teacher={teacherDetails}/>} </div>
    </div>
  )
}

export default TeacherMain;
