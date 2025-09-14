import { apibaseUrl } from "@/utils/utils";

export const addTeacherService=async(payload)=>{  
  const {academicYearId,data}=payload;
    const response=await fetch(`${apibaseUrl}teacher/addteacher?academicYearId=${academicYearId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }); 
    if(!response.ok){
        throw new Error("Failed to add teacher");
    }
    const result=await response.json(); 
    return result;
}

export const updateTeacherService=async(payload)=>{
  const {academicYearId,schoolId,employeeId,data}=payload;
  const response=await fetch(`${apibaseUrl}teacher/update/${schoolId}?employeeId=${employeeId}&academicYearId=${academicYearId}`,{
        method:"PUT",
        headers:{            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    if(!response.ok){
        throw new Error("Failed to update student");
    }
    const result=await response.json();
    return result;
}

export const getTeachersByIdService=async(payload)=>{
  // http://localhost:5000/api/teacher/id/SCH691962?employeeId=EMPID19850615
   
   try {
    const {academicYearId,schoolId, employeeId}=payload;
    if (!schoolId || !employeeId ||!academicYearId) return "Ids are required";
    const response = await  fetch(`${apibaseUrl}teacher/id/${schoolId}?employeeId=${employeeId}&academicYearId=${academicYearId}`);
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};

export const getAllTeachers=async(payload)=>{
// http://localhost:5000/api/teacher/SCH691962 

  try {
    const {academicYearId,schoolId}=payload;
    if (!schoolId) return "school Id is required";
    const response = await fetch(`${apibaseUrl}teacher/${schoolId}?academicYearId=${academicYearId}`);
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};

export const handleFileUpload = async (file) => {
    const formDataImg = new FormData();
    formDataImg.append("file", file);  
    try {
      const res = await fetch(`${apibaseUrl}files/upload`, {
        method: "POST",
        body:  formDataImg,
      });
      const data = await res.json();
      if (data.imageUrl) {
        return data.imageUrl;
      }
    } catch (err) {
      // Optionally show error to user
      console.error("Error uploading image:", err);
    }
    return "";
};

export const searchTeachersService=async(payload)=>{
   try {
    const {schoolId, searchQuery,academicYearId} = payload
    if (!schoolId || !searchQuery) return "school or searchQuery is not present";
    const response = await  fetch(`${apibaseUrl}teacher/search/${schoolId}?query=${searchQuery}&academicYearId=${academicYearId}`);
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
}

