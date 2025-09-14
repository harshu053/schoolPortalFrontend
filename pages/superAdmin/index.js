import Navigation from '@/components/navigation/Navigation'
import React from 'react'
import styles from "./superAdmin.module.scss";
import ProtectedRoute from '@/components/ProtectedRoute';
import SuperAdmin from '@/components/superAdmin';

const SuperAdminMain = () => {
  return (
    <ProtectedRoute>
    <div>
        <Navigation text="Admin Dashboard"/>
         <SuperAdmin/>
    </div>
    </ProtectedRoute>
  )
}

export default SuperAdminMain