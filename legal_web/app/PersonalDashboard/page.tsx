"use client"
import PersonalDashboard from '@/components/Personal_dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

function page() {
  return (
    <div>
        <ProtectedRoute>
            <PersonalDashboard/>
        </ProtectedRoute>
    </div>
  )
}

export default page