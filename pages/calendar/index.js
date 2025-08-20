import CalendarPage from '@/components/calendar/calendar'
import Navigation from '@/components/navigation/Navigation'
import React from 'react'

const CalendarMain = () => {
  return (
      <div>
        <Navigation text="School Calendar"/>
        <CalendarPage/>
      </div>
  )
}

export default CalendarMain