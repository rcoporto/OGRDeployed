// // pages/_app.js
// import '../styles/globals.css'; // Ensure you import your global CSS file
// import Head from 'next/head';

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Head>
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
//         />
//       </Head>
//       <Component {...pageProps} />
//     </>
//   );
// }

// export default MyApp;

// src/pages/_app.js

import { AuthProvider } from '../context/authContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';
import { useAuth } from '../components/context/authContext';

const protectedRoutes = ['/registry', '/dashboard', '/profile', '/research']; // Add '/registry' to protected routes

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      {isProtectedRoute ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}

export default MyApp;
