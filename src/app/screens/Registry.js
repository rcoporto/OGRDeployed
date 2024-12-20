"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useAuth } from '../context/authContext'; // Ensure this is imported correctly
import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

// For firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed

const Registry = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    birthdate: '',
    age: '',
    region: '',
    chiefComplaint: '',
    durationBlurring: '',
    familyMemberDisease: '',
    siblingsDiseaseCount: '',
    ergDate: '',
    ergResult: '',
    diagnosis: '',
    variants: [],
    rightEye: '',
    leftEye: '',
    corneaRight: '',
    corneaLeft: '',
    retinaRight: '',
    retinaLeft: '',
    geneticTestingDate: '',
    address: '',
    registryNumber: ''
  });

  // For login/access checking
  const user = useAuth(); // Destructure logout directly
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const [hasRegistryAccess, setHasRegistryAccess] = useState(false); // Track registry access
  const router = useRouter();

  useEffect(() => {
    try {
      if (user && user.user.registry === true) {
        setIsAuthenticated(true);
        setHasRegistryAccess(true);
      } else {
        setIsAuthenticated(false);
        setHasRegistryAccess(false);
        //alert("You are not authorized!");
        //router.push('/login?message=no_access'); // Redirect to login page if unauthenticated
        router.push('/invalid')
      }
    }
    catch {
      setIsAuthenticated(false);
      setHasRegistryAccess(false);
      //alert("You are not authorized!");
      //router.push('/login?message=no_access'); // Redirect to login page if unauthenticated
      router.push('/invalid')
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For variants, update the state correctly
    if (name === 'variants') {
      setFormData(prevData => ({
        ...prevData,
        variants: [value]  // For single selection
      }));
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Calculate age based on birthdate
    if (name === 'birthdate') {
      const birthDate = new Date(value);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      setFormData(prevData => ({
        ...prevData,
        birthdate: value,
        age: age
      }));
    }

    // Set variants based on the diagnosis
    if (name === 'diagnosis') {
      const selectedDiagnosis = value;
      let variants = [];
      if (selectedDiagnosis === 'Retinitis Pigmentosa') {
        variants = ['RLPB1', 'RP1', 'RHO', 'RPE65'];
      } else if (selectedDiagnosis === 'Stargardt Disease') {
        variants = ['STGD2', 'STGD3', 'STGD4'];
      } else if (selectedDiagnosis === 'Cone Rod Dystrophy') {
        variants = ['CNGA3', 'ABCA4'];
      }
      setFormData(prevData => ({
        ...prevData,
        diagnosis: value,
        variants: variants
      }));
    }
  };

  // Generate a unique registry number
  useEffect(() => {
    if (formData.geneticTestingDate) {
      const year = new Date(formData.geneticTestingDate).getFullYear();
      const randomNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
      const registryNumber = `${year}-${randomNumber}`;
      setFormData(prevData => ({
        ...prevData,
        registryNumber: registryNumber
      }));

      // Here, you would check the database to ensure uniqueness.
      // For simplicity, this code only generates the registry number.
    }
  }, [formData.geneticTestingDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reference to the 'registries' collection
      const registryRef = collection(db, 'registries');

      // Add a new document with formData
      await addDoc(registryRef, formData);

      alert('Form submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <>
      {/* Container div for entire page */}
      <div class="flex flex-col min-h-0.5 bg-[#F8F8FF] bg-top bg-contain">
        <title>Registry</title>
        <Navbar />

        <div class="my-12 mx-20 text-center z-10">
          <h1 class="text-center mb-6 text-3xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-4xl lg:text-5xl">Registry</h1>
        </div>

        {/* Container div for entire form */}
        <div class="mb-10 text-center justify-items-center z-10">

          <div class="w-fit p-4 bg-white border justify-self-center border-gray-200 rounded-lg shadow sm:p-8 md:p-12">
            <form class="grid md:grid-cols-2 gap-10 divide-x-2" action="#" onSubmit={handleSubmit}>

              {/* Container div for form (first column) */}
              <div>
                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Registry Number</label>
                    <input
                      type="text"
                      name="registryNumber"
                      value={formData.registryNumber}
                      class="block px-2.5 pb-2.5 pt-2.5 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      readOnly
                    />
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    />
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Demographics</span></h6>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 mb-2 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  />
                </div>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 mb-2 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  />
                </div>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 mb-2 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  />
                </div>

                <div class="z-10 grid md:grid-cols-3 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Sex</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Birthdate</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    />
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Age</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      readOnly
                    />
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Address</span></h6>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    wrap="hard"
                    rows={2}
                    cols={50}
                    class="block px-2.5 pb-2.5 pt-4 mb-2 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  />
                </div>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Region</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  >
                    <option value="">Select</option>
                    <option value="NCR">NCR</option>
                    <option value="Region I">Region I</option>
                    <option value="Region II">Region II</option>
                    <option value="Region III">Region III</option>
                    <option value="Region IV-A">Region IV-A</option>
                    <option value="MIMAROPA">MIMAROPA</option>
                    <option value="Region V">Region V</option>
                    <option value="Region VI">Region VI</option>
                    <option value="Region VII">Region VII</option>
                    <option value="Region VIII">Region VIII</option>
                    <option value="Region IX">Region IX</option>
                    <option value="Region X">Region X</option>
                    <option value="Region XI">Region XI</option>
                    <option value="Region XII">Region XII</option>
                    <option value="Region XIII">Region XIII</option>
                    <option value="Region CAR">CAR</option>
                    <option value="BARMM">BARMM</option>
                  </select>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Clinical History</span></h6>

                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Chief Complaint</label>
                    <select
                      name="chiefComplaint"
                      value={formData.chiefComplaint}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="None">None</option>
                      <option value="Left">Left Eye</option>
                      <option value="Right">Right Eye</option>
                      <option value="Both">Both Eyes</option>
                    </select>
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Duration of Blurring</label>
                    <select
                      name="durationBlurring"
                      value={formData.durationBlurring}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="< 6 months">Less than 6 months</option>
                      <option value="> 12 months">More than 12 months</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="4 years">4 years</option>
                      <option value="5 years">5 years</option>
                      <option value="> 10 years">More than 10 years</option>
                    </select>
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Family History</span></h6>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Member of the family with the same disease or history of blindness or blurring of vision</label>
                  <select
                    name="familyMemberDisease"
                    value={formData.familyMemberDisease}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 mb-2 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Grandfather">Grandfather</option>
                    <option value="Grandmother">Grandmother</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Uncle">Uncle</option>
                    <option value="Aunt">Aunt</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">How many siblings have the same disease or history of blindness or blurring of vision</label>
                  <select
                    name="siblingsDiseaseCount"
                    value={formData.siblingsDiseaseCount}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="None">None</option>
                  </select>
                </div>

                {/* End of container div for form (first column) */}
              </div>


              {/* Container div for form (second column) */}
              <div class="pl-8">
                <h6 class="mb-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Diagnostics</span></h6>

                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">ERG Date</label>
                    <input
                      type="date"
                      name="ergDate"
                      value={formData.ergDate}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    />
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">ERG Result</label>
                    <input
                      type="date"
                      name="ergResult"
                      value={formData.ergResult}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    />
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Diagnosis</span></h6>

                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Diagnosis</label>
                    <select
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
                      <option value="Stargardt Disease">Stargardt Disease</option>
                      <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
                    </select>
                  </div>

                  {Array.isArray(formData.variants) && formData.variants.length > 0 && (
                    <div class="relative">
                      <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Variants</label>
                      <select
                        name="variants"
                        value={formData.variants}
                        onChange={handleChange}
                        class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                        required
                      >
                        <option value="">Select</option>
                        {formData.variants.map((variant, index) => (
                          <option key={index} value={variant}>
                            {variant}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Best Corrected Visual Acuity</span></h6>

                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Right Eye</label>
                    <select
                      name="rightEye"
                      value={formData.rightEye}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="1.0">1.0</option>
                      <option value="0.9">0.9</option>
                      <option value="0.8">0.8</option>
                      <option value="0.7">0.7</option>
                      <option value="0.6">0.6</option>
                      <option value="0.5">0.5</option>
                      <option value="0.4">0.4</option>
                      <option value="0.3">0.3</option>
                      <option value="0.2">0.2</option>
                      <option value="0.1">0.1</option>
                      <option value="Counting Fingers">Counting Fingers</option>
                      <option value="Hand Movement">Hand Movement</option>
                    </select>
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Left Eye</label>
                    <select
                      name="leftEye"
                      value={formData.leftEye}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="1.0">1.0</option>
                      <option value="0.9">0.9</option>
                      <option value="0.8">0.8</option>
                      <option value="0.7">0.7</option>
                      <option value="0.6">0.6</option>
                      <option value="0.5">0.5</option>
                      <option value="0.4">0.4</option>
                      <option value="0.3">0.3</option>
                      <option value="0.2">0.2</option>
                      <option value="0.1">0.1</option>
                      <option value="Counting Fingers">Counting Fingers</option>
                      <option value="Hand Movement">Hand Movement</option>
                    </select>
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Cornea</span></h6>

                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Right Eye</label>
                    <select
                      name="corneaRight"
                      value={formData.corneaRight}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Clear">Clear</option>
                      <option value="Mild Opacity">Mild Opacity</option>
                      <option value="Moderate Opacity">Moderate Opacity</option>
                      <option value="Severe Opacity">Severe Opacity</option>
                    </select>
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Left Eye</label>
                    <select
                      name="corneaLeft"
                      value={formData.corneaLeft}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Clear">Clear</option>
                      <option value="Mild Opacity">Mild Opacity</option>
                      <option value="Moderate Opacity">Moderate Opacity</option>
                      <option value="Severe Opacity">Severe Opacity</option>
                    </select>
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Retina</span></h6>

                <div class="z-10 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Right Eye</label>
                    <select
                      name="retinaRight"
                      value={formData.retinaRight}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Normal">Normal</option>
                      <option value="RPE Degeneration">RPE Degeneration</option>
                      <option value="Choroidal Degeneration">Choroidal Degeneration</option>
                      <option value="RPE and Choroidal Degeneration">RPE and Choroidal Degeneration</option>
                    </select>
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Left Eye</label>
                    <select
                      name="retinaLeft"
                      value={formData.retinaLeft}
                      onChange={handleChange}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Normal">Normal</option>
                      <option value="RPE Degeneration">RPE Degeneration</option>
                      <option value="Choroidal Degeneration">Choroidal Degeneration</option>
                      <option value="RPE and Choroidal Degeneration">RPE and Choroidal Degeneration</option>
                    </select>
                  </div>
                </div>

                <h6 class="my-6 text-lg font-extrabold text-gray-900 md:text-xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-bluegreen-60 from-bluegreen-75">Genetic Testing</span></h6>

                <div class="relative">
                  <label class="block mb-2 text-left text-sm font-medium text-bluegreen-90">Date Performed</label>
                  <input
                    type="date"
                    name="geneticTestingDate"
                    value={formData.geneticTestingDate}
                    onChange={handleChange}
                    class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                    required
                  />
                </div>

                {/* <Image
                  src="/ophtha.png"
                  alt="Ophthalmologist"
                  height={450}
                  width={450}
                  className='z-10 mt-12 justify-self-center'
                /> */}

                <div class="mt-20 text-center z-10">
                  <button type="submit" class="text-white bg-pink-20 hover:bg-pink-50 focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-lg px-8 py-4 text-center justify-items-center w-max">Submit</button>
                </div>

                {/* End of container div for form (second column) */}
              </div>
            </form>
          </div>

          {/* End of container div for entire form */}
        </div>

        {/* End of container div for entire page */}
      </div>
    </>
  );
};

export default Registry;



