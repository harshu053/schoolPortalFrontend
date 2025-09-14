import React, { useState } from "react";
import styles from "./calendar.module.scss";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Example: Add event handler
  const handleAddEvent = (date, eventText) => {
    setEvents([...events, { date, eventText }]);
  };

  // Example: Render calendar grid (simple month view)
  const renderCalendar = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 31; i++) {
      days.push(
        <div
          key={i}
          className={
            styles.day +
            (i === today.getDate() ? ' ' + styles.today : '')
          }
          onClick={() => setSelectedDate(new Date(today.getFullYear(), today.getMonth(), i))}
        >
          {i}
        </div>
      );
    }
    return <div className={styles.grid}>{days}</div>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>School Calendar</div>
      {renderCalendar()}
      <div className={styles.eventSection}>
        <h2>Events</h2>
        <ul>
          {events
            .filter(e => e.date.getDate() === selectedDate.getDate())
            .map((e, idx) => (
              <li key={idx}>{e.eventText}</li>
            ))}
        </ul>
        <button
          onClick={() => handleAddEvent(selectedDate, `Event for ${selectedDate.toDateString()}`)}
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;
