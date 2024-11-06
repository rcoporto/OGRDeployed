// import React from 'react';
// import styles from './Login.module.css';
// import Navbar from '../components/Navbar';

// function Login() {
//   return (
//     <>
//     <Navbar />
//     <div className={styles.container}>
//       <title>Login</title>
//       <h1 className={styles.title}>Login</h1>
//       <form className={styles.form}>
//         <input type="text" placeholder="Username" className={styles.input} />
//         <input type="password" placeholder="Password" className={styles.input} />
//         <button type="submit" className={styles.button}>Login</button>
//       </form>
//     </div>
//     </>
//   );
// }

// export default Login;

// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Next.js router
// import { signInWithEmailAndPassword } from 'firebase/auth';
//  import { useAuth } from '../context/authContext';
// // import { auth } from '../../../firebase/firebase'; // Firebase configuration
// import styles from './Login.module.css';
// import Navbar from '../components/Navbar';

// function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter(); // Next.js navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       //await signInWithEmailAndPassword(auth, email, password);
//       await login(email, password);
//       router.push('/dashboard'); // Redirect to dashboard after successful login
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("Failed to log in. Please check your credentials.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.container}>
//         <title>Login</title>
//         <h1 className={styles.title}>Login</h1>
//         <form className={styles.form} onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             className={styles.input}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className={styles.input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className={styles.button}>Login</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Login;

// src/app/screens/Login.js

// "use client";

// import React, { useState } from 'react';
// import { useAuth } from '../context/authContext';
// import styles from './Login.module.css';

// function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       // Redirect or display success message after login
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Login</h1>
//       <form onSubmit={handleLogin} className={styles.form}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>Login</button>
//         {error && <p className={styles.error}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default Login;

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import { useAuth } from '../context/authContext'; // Custom auth context for Firestore login
import styles from './Login.module.css';
import Navbar from '../components/Navbar';

function Login() {
  const { login } = useAuth(); // Custom login function from authContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Next.js navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call custom login to authenticate against Firestore
      alert("account is valid");
      router.push('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <title>Login</title>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
