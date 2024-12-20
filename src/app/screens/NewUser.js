"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';

// For firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed

function NewUser() {
  const [submitted, setSubmitted] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    registry: false,
    research: false,
    identity: '',
    status: 'Pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reference to the 'newUser' collection
      const registryRef = collection(db, 'newUser');

      await addDoc(registryRef, {
        userType,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        registry: formData.registry,
        research: formData.research,
        identity: formData.identity,
        status: formData.status, // Add status field here
      });


      //alert('Form submitted successfully!');
      setSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting the form.');
    }
  };

  const handleReload = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      contact: '',
      registry: false,
      research: false,
      identity: '',
      status: 'Pending', // Reset status
    });
    setUserType('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Handle checkboxes and other input types appropriately
    }));
  };

  return (
    <>
      {/* Container div for entire page */}
      <div class="flex flex-col min-h-screen bg-[#F8F8FF] bg-top bg-contain">
        <title>Register Now</title>
        <Navbar />

        <Image
          src="/wavelines2.png"
          alt="Wave Lines"
          height={400}
          width={1800}
          className='opacity-20 top-0 absolute z-0'
        />

        {/* Container div for form + heading */}
        <div class="my-12 mx-20 text-center z-20">
          <h1 class="mb-6 text-3xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-4xl lg:text-5xl">Register <span class="text-bluegreen-1">Now</span></h1>

          {!submitted && (
            <p class="mb-10 text-lg font-normal font-lora text-gray-60 lg:text-xl">Fill out the form to request access to the registry.</p>
          )}

          {/* Container div for form */}
          <div class="w-screen max-w-md p-4 bg-white border justify-self-center border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            {!submitted ? (
              <form action="#" onSubmit={handleSubmit}>
                <div class="relative mb-6">
                  <label htmlFor="userType" class="block mb-2 text-left text-sm font-medium text-gray-900">I am a <span class="text-pink-50">*</span></label>
                  <select
                    id="userType"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Researcher">Researcher</option>
                  </select>
                </div>

                <div class="relative mb-6">
                  <label htmlFor="userType" class="block mb-2 text-left text-sm font-medium text-gray-900">I am requesting for <span class="text-pink-50">*</span></label>

                  <ul class="items-center text-justify w-full text-sm text-bluegreen-90 bg-white border border-gray-20 rounded-lg sm:flex">
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                      <div class="flex items-center ps-3">
                        <input type="checkbox" id="registry" name="registry" checked={formData.registry} onChange={handleChange} class="w-4 h-4 text-bluegreen-60 bg-gray-100 border-gray-300 rounded focus:ring-bluegreen-1 focus:ring-2" />
                        <label htmlFor="registry" class="w-full py-3 ms-2 text-sm font-lora text-bluegreen-90">Registry Access</label>
                      </div>
                    </li>
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                      <div class="flex items-center ps-3">
                        <input type="checkbox" id="research" name="research" checked={formData.research} onChange={handleChange} class="w-4 h-4 text-bluegreen-60 bg-gray-100 border-gray-300 rounded focus:ring-bluegreen-1 focus:ring-2" />
                        <label htmlFor="research" class="w-full py-3 ms-2 text-sm font-lora text-bluegreen-90">Research</label>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="relative">
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required />
                  <label htmlFor="name" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Name <span class="text-pink-50">*</span></label>
                </div>
                <p id="name_helper" class="mt-2 mb-6 text-justify text-xs text-gray-500">Format: LN, FN MN (e.g. Doe, Jane Smith)</p>

                <div class="relative mb-6">
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required />
                  <label htmlFor="email" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Email <span class="text-pink-50">*</span></label>
                </div>

                <div class="relative">
                  <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required />
                  <label htmlFor="contact" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Contact Number <span class="text-pink-50">*</span></label>
                </div>
                <p id="contact_helper" class="mt-2 mb-6 text-justify text-xs text-gray-500">Format: 09XX-XXX-XXXX</p>

                <div class="relative mb-6">
                  <input type="url" id="identity" name="identity" value={formData.identity} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required />
                  <label htmlFor="identity" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Link for Proof of Identity <span class="text-pink-50">*</span></label>
                </div>

                <button type="submit" class="text-white bg-pink-20 hover:bg-pink-50 focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">Submit</button>
              </form>

            ) : (
              <div>
                <div class="bg-cover bg-no-repeat bg-[url('../../public/oph1.png')] bg-blend-screen rounded-3xl p-12 md:p-24 mb-16">

                </div>
                <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10"></hr>
                <h5 class="text-xl text-pink-50 mb-5">Successfully Submitted!</h5>
                <p class="mb-16 text-sm font-normal font-lora text-gray-60 lg:text-base">Please wait for confirmation. You will receive an email with further details.</p>
                <button onClick={handleReload} class="text-white bg-bluegreen-90 hover:bg-bluegreen-80 focus:ring-4 focus:ring-bluegreen-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                  Register another user
                </button>
              </div>
            )}

            {/* End of container div for form */}
          </div>

          {/* End of container div for form + heading */}
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fill-opacity="1" d="M0,96L48,90.7C96,85,192,75,288,101.3C384,128,480,192,576,218.7C672,245,768,235,864,208C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path></svg>

        {/* End of container div for entire page */}
      </div>
    </>
  );
}

export default NewUser;