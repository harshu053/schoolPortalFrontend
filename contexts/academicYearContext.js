import { createContext, useContext, useEffect, useState } from "react";
import {
  createAcademicYear,
  fetchAcademicYears,
  switchActiveAcademicYear,
} from "@/services/academicYearServices";
import { useAuth } from "./AuthContext";

const AcademicYearContext = createContext();

export const AcademicYearProvider = ({ children }) => {
  const { user } = useAuth();
  const schoolId = user?.schoolId;

  const [academicYearId, setAcademicYearId] = useState(null);
  const [academicYear, setAcademicYear] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (!schoolId) return;
    const fetchYears = async () => {
      try {
        const response = await fetchAcademicYears(schoolId);
        setYears(response);
        const active = response.find((y) => y.isActive);
        if (active) {
          setAcademicYearId(active._id);
          setAcademicYear(active);
        }
      } catch (error) {
        console.error("Error fetching academic years:", error);
      }
    };
    fetchYears();
  }, [schoolId]);

  const switchYear = async (yearId) => {
    if (!schoolId || !yearId) return;
    try {
      const payload = { schoolId, yearId }; 
      const response = await switchActiveAcademicYear(payload);
      setAcademicYear(response);
      setAcademicYearId(response._id);
      // ✅ also refresh years list so UI updates correctly
      const updatedYears = await fetchAcademicYears(schoolId);
      setYears(updatedYears);
    } catch (error) {
      console.error("Error switching academic year:", error);
    }
  };

  const addAcademicYear = async (year) => {
    if (!schoolId || !year) return;
    const payload = { schoolId, year };
    const newYear = await createAcademicYear(payload);
    // replace old list with updated one (since only 1 is active now)
    setYears((prev) => {
      return [...prev.map((y) => ({ ...y, isActive: false })), newYear];
    });
    setAcademicYear(newYear); // set new year as active in context
  };

  return (
    <AcademicYearContext.Provider
      value={{ academicYearId, academicYear, years, switchYear,addAcademicYear }}
    >
      {children}
    </AcademicYearContext.Provider>
  );
};

export const useAcademicYear = () => useContext(AcademicYearContext);
