// components/UpcomingEvents.js
import React from "react";
import styles from "./UpcomingEvents.module.scss";

const UpcomingEvents = ({ events }) => {
  return (
    <div className={styles.container}>
      <h2>📅 Upcoming Events</h2>
      <div className={styles.eventList}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <div className={styles.date}>{event.date}</div>
            <div className={styles.details}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
