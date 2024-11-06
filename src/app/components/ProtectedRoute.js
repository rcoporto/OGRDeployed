// // src/components/ProtectedRoute.js

// import { useAuth } from '../context/authContext';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login'); // Redirect to login if not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading || !user) return null; // Optionally show a loading spinner

//   return children;
// }


// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const isResearchPage = router.pathname === '/research';

  useEffect(() => {
    alert(JSON.stringify(user, null, 2));
    if (!loading) {
      if (!user) {
        // If not logged in, redirect to login
        router.push('/login');
      } else if (isResearchPage && !user.research) {
        // If trying to access the research page without permission
        router.push('/unauthorized'); // Redirect to an unauthorized page or home page
      }
    }
  }, [user, loading, router, isResearchPage]);

  // If still loading, show a loading state
  if (loading || !user) return <p>Loading...</p>;

  // Render the children if authenticated and permitted
  return <>{children}</>;
}

export default ProtectedRoute;
