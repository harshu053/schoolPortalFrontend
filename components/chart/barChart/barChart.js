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
import styles from "./barChart.module.scss";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ClassWiseBarChart = ({ studentsData }) => {
  console.log("Students Data in ClassWiseBarChart:", studentsData);
  const labels = studentsData.map((item) => `Class ${item.class}`);
  const removeDuplicateLabels = [...new Set(labels)];

  const sortedLabels = removeDuplicateLabels.sort((a, b) => {
  const numA = parseInt(a.split(" ")[1], 10);
  const numB = parseInt(b.split(" ")[1], 10);
  return numA - numB;
  });

  console.log("Unique Labels:", removeDuplicateLabels);

  const countOfAllStudentClassWise = new Map();
  studentsData.forEach((item) => {
    if (countOfAllStudentClassWise.has(item.class)) {
      countOfAllStudentClassWise.set(
        item.class,
        countOfAllStudentClassWise.get(item.class) + 1
      );
    } else {
      countOfAllStudentClassWise.set(item.class, 1);
    }
  });
  const arr = new Array(12);
  countOfAllStudentClassWise.forEach((value, key) => {
    arr[key - 1] = value;
  });
  console.log("arr", arr);
  console.log("countOfAllStudentClassWise", countOfAllStudentClassWise);

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Students",
        backgroundColor: "#36A2EB",
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  });

  useEffect(() => {
    setData({
      labels:  sortedLabels,
      datasets: [
        {
          label: "Students",
          // data: studentsData.map((item) => item.totalStudents || 0),
          data:  arr,
          backgroundColor: "#36A2EB",
          borderRadius: 6,
          barThickness: 40,
        },
      ],
    });
  }, [studentsData]);

  const options = {
    responsive:  true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 9,
            weight: "bold",  
          },
        },
      },
      y: {
         grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
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
