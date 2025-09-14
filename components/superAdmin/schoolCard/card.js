import React from 'react';
import styles from  "./card.module.scss";

const SchoolCard = ({schoolData}) => {
  return (
    <div className={styles.container}>
        <div className={styles.schoolname}>School Name: {schoolData?.schoolName}</div>
        <div className={styles.name}>Owner Name: {schoolData?.adminInfo?.principalName}</div>
        <div className={styles.email}>Owner Email: {schoolData?.adminInfo?.schoolEmail}</div>
        <div className={styles.number}>Owner Contact: {schoolData?.adminInfo?.schoolPhone}</div>
    </div>
  )
}

export default SchoolCard