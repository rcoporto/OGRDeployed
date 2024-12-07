// // // pages/_app.js
// // import '../styles/globals.css'; // Ensure you import your global CSS file
// // import Head from 'next/head';

// // function MyApp({ Component, pageProps }) {
// //   return (
// //     <>
// //       <Head>
// //         <link
// //           rel="stylesheet"
// //           href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
// //         />
// //       </Head>
// //       <Component {...pageProps} />
// //     </>
// //   );
// // }

// // export default MyApp;

// //src\app\(pages)\_app.js

// // // src/app/(pages)/_app.js
// // import { AuthProvider } from '../context/authContext';
// // import ProtectedRoute from '../components/ProtectedRoute';
// // import { useRouter } from 'next/router';

// // const protectedRoutes = ['/registry', '/dashboard', '/profile', '/research'];

// // function MyApp({ Component, pageProps }) {
// //   const router = useRouter();
// //   const isProtectedRoute = protectedRoutes.includes(router.pathname);

// //   return (
// //     <AuthProvider>
// //       {isProtectedRoute ? (
// //         <ProtectedRoute>
// //           <Component {...pageProps} />
// //         </ProtectedRoute>
// //       ) : (
// //         <Component {...pageProps} />
// //       )}
// //     </AuthProvider>
// //   );
// // }

// // export default MyApp;

// // src/app/(pages)/_app.js
// import { AuthProvider } from '../context/authContext';
// import ProtectedRoute from '../components/ProtectedRoute';
// import { useRouter } from 'next/router';

// const protectedRoutes = ['/registry', '/dashboard', '/profile', '/research'];

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();
//   const isProtectedRoute = protectedRoutes.includes(router.pathname);

//   console.log("Current route:", router.pathname);
//   console.log("Is this route protected?", isProtectedRoute);

//   return (
//     <AuthProvider>
//       {isProtectedRoute ? (
//         <ProtectedRoute>
//           <Component {...pageProps} />
//         </ProtectedRoute>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </AuthProvider>
//   );
// }

// export default MyApp;

import { AuthProvider } from '../app/context/authContext';
import ProtectedRoute from '../app/components/ProtectedRoute';
import { useRouter } from 'next/router';

const protectedRoutes = ['/registry', '/dashboard', '/profile', '/research'];

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

