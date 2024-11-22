"use client";
import Families from '@/app/screens/Families';
import React from 'react';
import { useAuth } from '../../context/authContext';

function page() {
  const { user } = useAuth(); // Destructure user from the context

  // Determine admin status based on userType
  const isAdmin = user?.userType === 'Admin';

  return (
    <div>
      {/* Pass isAdmin={true} to simulate admin */}
      <Families isAdmin={isAdmin} />
    </div>
  );
}

export default page;