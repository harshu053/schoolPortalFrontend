
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllStudentsService } from "@/services/studentsServices";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademicYear } from "@/contexts/academicYearContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ClassWiseBarChart = () => {
  const [studentsData, setStudentsData] = useState([]);
  const { user } = useAuth();
  const {academicYearId}=useAcademicYear();

  useEffect(() => {
    if (!user?.schoolId ||!academicYearId) return;
    const fetchData = async () => {
      const payload={academicYearId,schoolId:user?.schoolId};
      const response = await getAllStudentsService(payload);
      setStudentsData(response);
    };
    fetchData();
  }, [user?.schoolId,academicYearId]);

  // Helper: suffix (1st, 2nd, 3rd, etc.)
  const getSuffix = (num) => {
    if (num === 1) return "st";
    if (num === 2) return "nd";
    if (num === 3) return "rd";
    return "th";
  };

  // Count students per class
  const classCounts = {};
  studentsData.length>0 && studentsData?.forEach((item) => {
    const classNum = parseInt(item.className, 10);
    if (!isNaN(classNum)) {
      classCounts[classNum] = (classCounts[classNum] || 0) + 1;
    }
  });

  // Sort class numbers
  const sortedClasses = Object.keys(classCounts)
    .map(Number)
    .sort((a, b) => a - b);

  // Labels and Data
  const labels = sortedClasses.map((num) => `Class ${num}${getSuffix(num)}`);
  const counts = sortedClasses.map((num) => classCounts[num]);

  const data = {
    labels,
    datasets: [
      {
        label: "Students",
        data: counts,
        backgroundColor: "#36A2EB",
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 9, weight: "bold" },
        },
      },
      y: {
        grid: { display: false },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Class-wise Student Count</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClassWiseBarChart;
