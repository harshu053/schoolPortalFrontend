import { apibaseUrl } from "@/utils/utils";
// http://localhost:5000/api/students/SCH691962?studentId=STUID20080915  get studenet by id
// http://localhost:5000/api/students/SCH691962  get all student.

export const getAllStudentsService = async (payload) => {
   
  try {
    const {academicYearId,schoolId}=payload
    if (!schoolId || !academicYearId) return "schoolId or academicYearId is required";
    const response = await fetch(`${apibaseUrl}students/${schoolId}?academicYearId=${academicYearId}`);
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentByIdService = async (payload) => {
   
   try {
    const {academicYearId,schoolId,studentId}=payload;
    if (!schoolId || !studentId || !academicYearId) return "Ids are required";
    const response = await  fetch(`${apibaseUrl}students/id/${schoolId}?studentId=${studentId}&academicYearId=${academicYearId}`);
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const addStudentService = async (payload) => {
  const {academicYearId,data}=payload;
  const response = await fetch(`${apibaseUrl}students/addstudent?academicYearId=${academicYearId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }); 
  if (!response.ok) {
    throw new Error("Failed to add student");
  }
  const result = await response.json(); 
  return result;
};

export const updateStudentService = async (payload) => {
  const {academicYearId,schoolId, studentId, data}=payload;
  const response = await fetch(
    `${apibaseUrl}students/update/${schoolId}?studentId=${studentId}&academicYearId=${academicYearId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update student");
  }
  const result = await response.json();
  return result;
};

export const searchStudentsService = async (payload) => {
   
  try {
   const { schoolId, searchQuery,academicYearId}= payload;
   if (!schoolId || !searchQuery || !academicYearId) return "Ids are required";
    const response = await fetch(
     `${apibaseUrl}students/search?searchQuery=${searchQuery}&schoolId=${schoolId}&academicYearId=${academicYearId}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}