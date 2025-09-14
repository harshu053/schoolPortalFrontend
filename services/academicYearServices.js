import { apibaseUrl } from "@/utils/utils";
// http://localhost:5000/api/academic-years/SCH036482 get all academic years of school
// http://localhost:5000/api/academic-years/current get current active academic year of school

export const fetchAcademicYears = async (schoolId) => {
  try {
    if (!schoolId) return "school Id is required";
    const res = await fetch(`${apibaseUrl}academic-years/${schoolId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching academic years:", error);
    throw error;
  }
};

export const switchActiveAcademicYear = async (payload) => {
  try {
    const { schoolId} = payload; 
    const res = await fetch(`${apibaseUrl}academic-years/${schoolId}/activate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updated = await res.json();
    return updated;
  }catch (error) {
    console.error("Error switching academic year:", error);
    throw error;
  }
};

export const createAcademicYear = async (payload) => {
  try {
    const { schoolId, year } = payload;
    if (!schoolId || !year) return "schoolId and year are required";
    const res = await fetch(`${apibaseUrl}academic-years/${schoolId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year }),
    });
    const newYear = await res.json();
    return newYear;
  } catch (error) {
    console.error("Error creating academic year:", error);
    throw error;
  }
}
