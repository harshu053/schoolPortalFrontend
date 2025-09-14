import Navigation from '@/components/navigation/Navigation'
import Spinner from '@/components/spinner/spinner';
import TeacherDetail from '@/components/teacher/teacherDetail';
import { useAcademicYear } from '@/contexts/academicYearContext';
import { useAuth } from '@/contexts/AuthContext'
import { getTeachersByIdService } from '@/services/teacherServices';
import { apibaseUrl } from '@/utils/utils';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const TeacherMain = () => {
  const [teacherDetails, setTeacherDetails] = useState({});
  const { user } = useAuth();
  const {academicYearId}=useAcademicYear();
  const params = useParams();
  const employeId = params?.parms?.[0];  
  const schoolId = user?.schoolId;

  useEffect(() => {
    if (!schoolId || !employeId || !academicYearId) return; 
    
    const fetchTeacherDetails = async () => {
      const payload={academicYearId,schoolId, employeeId: employeId};
      const response = await getTeachersByIdService(payload);  
      setTeacherDetails(response.data);  
    };
    fetchTeacherDetails();
  }, [employeId, schoolId,academicYearId]);
  
  return (
    <div>
      <Navigation text='Teacher Details' />
      <div>{teacherDetails &&<TeacherDetail teacher={teacherDetails}/>} </div>
    </div>
  )
}

export default TeacherMain;
