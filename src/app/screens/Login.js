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
import { useEffect } from 'react';
import Image from 'next/image';

function Login() {
  const { login } = useAuth(); // Custom login function from authContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Next.js navigation
  // const { message } = router.query; // Get the message from the query parameters
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get('message');
    setMessage(messageParam);
  }, []);

  useEffect(() => {
    if (message === "no_access") {
      alert("You do not have access to this page. Please log in or contact support.");
    }
  }, [message]);

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
    <div>
      <div className={styles.page}>
         <title>Login</title>
          <Navbar />

          {/* <Image
              src="/oph.png" 
              alt="Wave Lines" 
              height={725} 
              width={725}
              className='opacity-30 top-2 left-16 absolute z-0'
          /> */}

          <div class="my-12 mx-14 text-center justify-items-center z-10 grid md:grid-cols-2 gap-2">

            {/* <div>
            <Image
              src="/oph.png" 
              alt="Wave Lines" 
              height={625} 
              width={625}
              className='opacity-70 top-20 left-28 absolute z-0'
          />
            </div> */}

            <div class="mt-20">
              <h1 class="text-center mb-6 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-5xl lg:text-6xl">Login</h1>
              <div class="w-screen max-w-md p-4 bg-white border justify-self-center border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                
                  <form class="space-y-6" action="#" onSubmit={handleLogin}>
                    {/* <div class="relative">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                      <label htmlFor="name" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                      Email <span class="text-pink-50">*</span></label>
                    </div>

                    <div class="relative">
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                      <label htmlFor="email" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                      Password <span class="text-pink-50">*</span></label>
                    </div> */}

                    <div class="relative">
                      <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                      <label htmlFor="email" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                      Email <span class="text-pink-50">*</span></label>
                    </div>
                    
                    <div class="relative">
                      <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                      <label htmlFor="password" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                      Password <span class="text-pink-50">*</span></label>
                    </div>

                    <button type="submit" class="text-white bg-pink-20 hover:bg-pink-50 focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">Login</button>

                  </form>
              </div>
    
            </div>

            <div>
            <Image
              src="/oph.png" 
              alt="Wave Lines" 
              height={600} 
              width={600}
              className='left-28 z-0'
          />
            </div>

        </div>

        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fill-opacity="1" d="M0,96L48,128C96,160,192,224,288,250.7C384,277,480,267,576,229.3C672,192,768,128,864,112C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path></svg> */}

        {/* <footer className={styles.footer}>
        <p className='font-lora'>© {new Date().getFullYear()} National Ocular Genetic Registry</p>
        </footer> */}
      </div>

    </div>
    // <>
    //   <Navbar />
    //   <div className={styles.container}>
    //     <title>Login</title>
    //     <h1 className={styles.title}>Login</h1>
    //     <form className={styles.form} onSubmit={handleLogin}>
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className={styles.input}
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className={styles.input}
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //       <button type="submit" className={styles.button}>Login</button>
    //     </form>
    //   </div>
    // </>
  );
}

export default Login;
