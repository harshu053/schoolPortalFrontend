import { apibaseUrl } from "@/utils/utils";

export const addStudentService=async(data)=>{
    console.log("addStudentService called with data:", data);
    // http://localhost:5000/api/students/addstudent
    console.log(data);
    const response=await fetch(`${apibaseUrl}students/addstudent`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    console.log("response",response);
    if(!response.ok){
        throw new Error("Failed to add student");
    }
    const result=await response.json();
    console.log("result",result);
    return result;

}

export const updateStudentService=async(schoolId,studentId,data)=>{ 
    const response=await fetch(`${apibaseUrl}students/update/${schoolId}?studentId=${studentId}`,{
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
