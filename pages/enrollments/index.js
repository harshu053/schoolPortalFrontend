import Enrollments from '@/components/enrollments/enrollments'
import Navigation from '@/components/navigation/Navigation'
import React from 'react'

const EnrollmentsMain = () => {
  return (
    <div>
        <Navigation text='Enrollments'/>
        <Enrollments/>

    </div>
  )
}

export default EnrollmentsMain