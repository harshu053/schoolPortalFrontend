import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext"; 
import ProtectedRoute from '../components/ProtectedRoute';

export default function TeacherDashboard() {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
             <div>redirected to teacher page.</div>
        </ProtectedRoute>
    );
}
