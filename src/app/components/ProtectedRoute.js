import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';

function ProtectedRoute({ children }) {

  const { user, loading } = useAuth();
  const router = useRouter();
  const isRegistryPage = router.pathname === '/registry';

  useEffect(() => {
    console.log("ProtectedRoute: Checking user authorization.");
    console.log("Current user:", user);
    console.log("Loading status:", loading);

    if (!loading) {
      if (!user) {
        console.log("User is not logged in. Redirecting to login...");
        router.push('/login');
      } else if (isRegistryPage && !user.registry) {
        console.log("User lacks registry access. Redirecting to unauthorized page...");
        router.push('/unauthorized');
      }
    }
  }, [user, loading, router, isRegistryPage]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}

export default ProtectedRoute;
