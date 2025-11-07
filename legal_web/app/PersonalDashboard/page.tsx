"use client"
import PersonalDashboard from '@/components/Personal_dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

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