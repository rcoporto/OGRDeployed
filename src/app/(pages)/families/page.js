import Families from '@/app/screens/Families';
import React from 'react';

function page() {
  return (
    <div>
      {/* Pass isAdmin={true} to simulate admin */}
      <Families isAdmin={true} />
    </div>
  );
}

export default page;
