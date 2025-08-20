import { apibaseUrl } from "@/utils/utils";

export const addTeacherService=async(data)=>{ 
    const response=await fetch(`${apibaseUrl}teacher/addteacher`,{
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

export const updateTeacherService=async(schoolId,employeeId,data)=>{

  const response=await fetch(`${apibaseUrl}teacher/update/${schoolId}?employeeId=${employeeId}`,{
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