"use client";
import 'flowbite';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import { useAuth } from '../context/authContext'; // Custom auth context for Firestore login
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
      //alert("account is valid");
      router.push('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <>
      {/* Container div for entire page */}
      <div class="flex flex-col min-h-screen bg-[#F8F8FF] bg-top bg-contain">
        <title>Login</title>
        <Navbar />

        <div class="my-12 mx-14 text-center justify-items-center z-10 grid md:grid-cols-2 gap-2">

          {/* Container div for form + heading */}
          <div class="mt-20">
            <h1 class="text-center mb-6 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-5xl lg:text-6xl">Login</h1>

            {/* Container div for form */}
            <div class="w-screen max-w-md p-4 bg-white border justify-self-center border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              <form class="space-y-6" action="#" onSubmit={handleLogin}>
                <div class="relative">
                  <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required />
                  <label htmlFor="email" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Email <span class="text-pink-50">*</span></label>
                </div>

                <div class="relative">
                  <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required />
                  <label htmlFor="password" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Password <span class="text-pink-50">*</span></label>
                </div>

                <button type="submit" class="text-white bg-pink-20 hover:bg-pink-50 focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">Login</button>
              </form>

              {/* End of container div for form */}
            </div>

            {/* End of container div for form + heading */}
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

        {/* End of container div for entire page */}
      </div>
    </>
  );
}

export default Login;
