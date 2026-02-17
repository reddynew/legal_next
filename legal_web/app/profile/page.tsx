import React from 'react'
import Profile from '@/components/Profile'

import ProtectedRoute from '@/components/ProtectedRoute'

function page() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  )
}

export default page