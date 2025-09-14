import styles from "./doughnut-chart.module.scss";
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ data }) {
  
  const [values, setValues] = useState({ students: 0, teachers: 0, staffs: 0 });
  const [totalCount, setTotalCount] = useState(0);
  const [dataCopy, setDataCopy] = useState({
    labels: ["Students", "Teachers", "Staffs"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#1ECCB0", "#FC6770", "#FBD187"],
        hoverBackgroundColor: ["#1ECCB0", "#FC6770", "#FBD187"]
      }
    ]
  });

  useEffect(() => {
    setValues({
      students: data?.students?.length || 0,
      teachers: data?.teachers?.length || 0,
      staffs: data?.staffs?.length || 0
    });
  }, [data]);

  useEffect(() => {
    setDataCopy({
      labels: ["Students", "Teachers", "Staffs"],
      datasets: [
        {
          data: [values.students, values.teachers, values.staffs || 10],
          backgroundColor: ["#3535f3", "#FC6770", "#facc15"],
          hoverBackgroundColor: ["#3535f3", "#FC6770", "#facc15"]
        }
      ]
    });
    setTotalCount(values.students + values.teachers + values.staffs);
  }, [values]);

  useEffect(()=>{
    centerTextPlugin;
  },[totalCount])

  // Custom plugin to draw text in the center
  // const centerTextPlugin = {
  //   id: 'centerText',
  //   beforeDraw: (chart) => {
  //     const { width, height } = chart;
  //     const ctx = chart.ctx;
  //     ctx.restore();

  //     // First line - label
  //     ctx.font = `bold ${(height / 250).toFixed(2)}em sans-serif`;
  //     ctx.fillStyle = "#000";
  //     ctx.textBaseline = "middle";
  //     const labelText = "Total Count";
  //     const labelX = Math.round((width - ctx.measureText(labelText).width) / 2);
  //     const labelY = height / 2 - 10;
  //     ctx.fillText(labelText, labelX, labelY);

  //     // Second line - value
  //     ctx.font = `bold ${(height / 300).toFixed(2)}em sans-serif`;
  //     const valueText = totalCount.toString();
  //     const valueX = Math.round((width - ctx.measureText(valueText).width) / 2);
  //     const valueY = height / 2 + 12;
  //     ctx.fillText(valueText, valueX, valueY);

  //     ctx.save();
  //   }
  // };

  // const ChartConfig = {
  //   responsive: true,
  //   plugins: {
  //     legend: false,
  //   },
  // };

  // Custom plugin to draw text in the center
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width, height } = chart;
    const ctx = chart.ctx;
    ctx.restore();

    // First line - label
    ctx.font = `bold ${(height / 250).toFixed(2)}em sans-serif`;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    const labelText = "Total Count";
    const labelX = Math.round((width - ctx.measureText(labelText).width) / 2);
    const labelY = height / 2 - 10;
    ctx.fillText(labelText, labelX, labelY);

    // Second line - value (now always latest totalCount)
    ctx.font = `bold ${(height / 300).toFixed(2)}em sans-serif`;
    const valueText = chart.config.options.totalCount?.toString() ?? "0";
    const valueX = Math.round((width - ctx.measureText(valueText).width) / 2);
    const valueY = height / 2 + 12;
    ctx.fillText(valueText, valueX, valueY);

    ctx.save();
  }
};

const ChartConfig = {
  responsive: true,
  plugins: {
    legend: false,
  },
   
  totalCount,
};


  return (
    <div className={styles['container']}>
      <div className={`${styles['container__heading']} text-body-s-bold`}>
        Current Staff & Student Count
      </div>
      <div className={styles['container__chart']}>
        <Doughnut data={dataCopy} options={ChartConfig} plugins={[centerTextPlugin]} />
      </div>
      <div className={styles['container__sentiment-percent']}>
        <div>
          <div className={`${styles['container__neutraldataInPercent']} text-body-xs`}>{values.students}</div>
          <div className={`text-body-xs`}>Students</div>
        </div>
        <div>
          <div className={`${styles['container__positivedataInPercent']} text-body-xs`}>{values.teachers}</div>
          <div className={`text-body-xs`}>Teachers</div>
        </div>
        <div>
          <div className={`${styles['container__negativedataInPercent']} text-body-xs`}>{values.staffs}</div>
          <div className={`text-body-xs`}>Staffs</div>
        </div>
      </div>
    </div>
  );
}
