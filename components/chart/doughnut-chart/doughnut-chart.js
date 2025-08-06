import styles from "./doughnut-chart.module.scss";
import { useState,useEffect, use } from 'react'; 
import { Doughnut } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function DoughnutChart({data}) { 
     
    const [values,setValues]=useState({students:0, teachers:0, staffs:0});
    console.log("Data in DoughnutChart:", data);

    useEffect(()=>{
        setValues({
            students: data?.students?.length || 0,
            teachers: data?.teachers?.length || 0,
            staffs: data?.staffs?.length || 0
        });
    },[data, data?.students, data?.teachers]); 

    const [dataCopy, setDataCopy] =useState({
        labels: ["Students", "Teachers", "Staffs"],
        datasets: [
            {
                data: [0,  0, 0],
                backgroundColor: [
                    "#1ECCB0",
                    "#FC6770",
                    "#FBD187",
                     
                ],
                hoverBackgroundColor: ["#1ECCB0", "#FC6770","#FBD187"]
            }
        ] 
    });

    useEffect(() => {
        setDataCopy({
            labels: ["Students", "Teachers", "Staffs"],
            datasets: [
                {
                    data: [values?.students, values?.teachers, values?.staffs  ],
                    backgroundColor: [
                        "#1ECCB0",
                        "#FC6770",
                        "#FBD187",
                    ],
                    hoverBackgroundColor: ["#1ECCB0", "#FC6770","#FBD187"]
                }
            ]
        });
    }, [values]);
     
    const ChartConfig = {
        responsive: true,
        plugins: {
          legend: false,
        },

    };

  

    return (
        <div className={styles['container']}>
            <div className={`${styles['container__heading']} text-body-s-bold `}>
                Current Staff & Student Count
            </div>
             
            <div className={styles['container__chart']}><Doughnut data={dataCopy} options={ChartConfig}/></div>
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
    )
}
